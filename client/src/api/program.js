import { basePath, apiVersion } from "./config";

export function programAddApi(token, data){
    const url = `${basePath}/${apiVersion}/programAdd`;
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
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

  export function getProgramsApi(token){
    const url = `${basePath}/${apiVersion}/getPrograms`;
    
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
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

  export function getProgramsVisitorApi(){
    const url = `${basePath}/${apiVersion}/getProgramsVisitor`;
    
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
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

  export function getProgramVisitorApi(programId){
    const url = `${basePath}/${apiVersion}/getProgramVisitor/${programId}`;
    
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
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

  export function getProgramsSectionVisitorApi(section){
    const url = `${basePath}/${apiVersion}/getProgramsVisitor`;
    
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };
    
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return getProgramBySection(result, section);
      })
      .catch(err => {
        return err.message;
      });
  }

  export function deleteProgramApi(token, programId) {
    const url = `${basePath}/${apiVersion}/deleteProgram/${programId}`;
  
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result.message;
      })
      .catch(err => {
        return err.message;
      });
  }

  export function updateProgramApi(token, program, programId){
    const url = `${basePath}/${apiVersion}/updateProgram/${programId}`;
    
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(program)
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

  
export function uploadImageApi(token, image, programId){
  const url = `${basePath}/${apiVersion}/uploadImageProgram/${programId}`;

  const formData = new FormData();
  formData.append("image", image, image.name);

  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token
    }
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

export function getImageApi(imageName){
  const url = `${basePath}/${apiVersion}/getImage/${imageName}`;

  return fetch(url)
    .then(response => {
      return response.url;
    })
    .catch(err => {
      return err.message;
    });
}

  function getProgramBySection(result, section){
    const result2 = result.programs.filter(programs => programs.section==section);
    return result2;
  }
  
