import { basePath, apiVersion } from "./config";

export function publicationAddApi(token, data) {
  const url = `${basePath}/${apiVersion}/publicationAdd`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function getPublicationsApi(token) {
  const url = `${basePath}/${apiVersion}/getPublications`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function getPublicationsVisitorApi() {
  const url = `${basePath}/${apiVersion}/getPublicationsVisitor`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function getPublicationVisitorApi(publicationId) {
  const url = `${basePath}/${apiVersion}/getPublicationVisitor/${publicationId}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function getPrincipalPublicationVisitorApi() {
  const url = `${basePath}/${apiVersion}/getPrincipalPublicationVisitor`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function getSecondaryPublicationsVisitorApi() {
  const url = `${basePath}/${apiVersion}/getSecondaryPublicationsVisitor`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function getMostViewedPublicationBySectionVisitorApi(section) {
  const url = `${basePath}/${apiVersion}/getPublicationsVisitor`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return getLastPublicationBySection(result, section)
    })
    .catch((err) => {
      return err.message;
    });
}

function getLastPublicationBySection(result, section) {
  const result2 = result.publications.filter(
    (publications) => (publications.section==section && publications.visibility=="1")
  );
  return (result2[result2.length-1]);
}
export function getPublicationsSectionVisitorApi(section) {
  const url = `${basePath}/${apiVersion}/getPublicationsVisitor`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return getPublicationsBySection(result, section);
    })
    .catch((err) => {
      return err.message;
    });
}

function getPublicationsBySection(result, section) {
  const publicationsSection = result.publications.filter(
    (publications) => (publications.section==section && publications.visibility=="1")
  );
  var publicationsSectionfifo = [];
  for(let i=publicationsSection.length-1; i>=0; i--){
      publicationsSectionfifo.push(publicationsSection[i]);
  }
  return publicationsSectionfifo;
}

export function getPublicationsMostviewedSectionVisitorApi(section) {
  const url = `${basePath}/${apiVersion}/getPublicationsVisitor`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return getPublicationsMostviewedBySection(result, section);
    })
    .catch((err) => {
      return err.message;
    });
}

function getPublicationsMostviewedBySection(result, section) {
  const publicationsSection = result.publications.filter(
    (publications) => (publications.section==section && publications.visibility=="1")
  );
  var threeMostviewedPublications = [];
  var aux = publicationsSection[0];
  var deleteIndex = 0;
  for(let j=1; j<=3; j++){
    deleteIndex=0;
    for(let i=0; i<publicationsSection.length; i++){
      for(let k=0; k<publicationsSection.length; k++){
        if(publicationsSection[k].views>publicationsSection[i].views){
          aux = publicationsSection[k];
          //console.log(aux);
          deleteIndex=k;
        } 
      }
    }
    threeMostviewedPublications.push(aux);
    publicationsSection[deleteIndex].views=-1000; 
  }
  //console.log(threeMostviewedPublications)
  return threeMostviewedPublications;
}

export function deletePublicationApi(token, publicationId) {
  const url = `${basePath}/${apiVersion}/deletePublication/${publicationId}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err.message;
    });
}

export function updatePublicationApi(token, publication, publicationId) {
  const url = `${basePath}/${apiVersion}/updatePublication/${publicationId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(publication),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function uploadImageApi(token, image, publicationId) {
  const url = `${basePath}/${apiVersion}/uploadImage/${publicationId}`;

  const formData = new FormData();
  formData.append("image", image, image.name);

  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function getImageApi(imageName) {
  const url = `${basePath}/${apiVersion}/getImage/${imageName}`;

  return fetch(url)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
}

export function addViewToPublicationApi(publication, publicationId) {
    const url = `${basePath}/${apiVersion}/addViewToPublication/${publicationId}`;
    
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(publication)
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err.message;
      });
}

export function setPublicPublicationApi(publication, publicationId) {
  const url = `${basePath}/${apiVersion}/setPublicPublication/${publicationId}`;
  
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(publication)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}

                                              


