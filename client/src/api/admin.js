import { basePath, apiVersion } from "./config";

export function signInApi(data) {
  const url = `${basePath}/${apiVersion}/signIn`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      //console.log(result);

      return result;
    })
    .catch(err => {
      return err.message;
    });
}

export function userAddApi(data){
  const url = `${basePath}/${apiVersion}/userAdd`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
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

export function getUsersApi(token){
  const url = `${basePath}/${apiVersion}/getUsers`;
  
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

export function getUserApi(token, adminId){
  const url = `${basePath}/${apiVersion}/getUser/${adminId}`;
  
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

export function updateAdminApi(token, admin, adminId){
  const url = `${basePath}/${apiVersion}/updateAdmin/${adminId}`;
  
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(admin)
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

export function updateAdminPasswordApi(token, admin, adminId){
  const url = `${basePath}/${apiVersion}/updateAdminPassword/${adminId}`;
  
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(admin)
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

export function uploadAvatarApi(token, avatar, userId){
  const url = `${basePath}/${apiVersion}/uploadAvatar/${userId}`;

  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);

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



export function getAvatarApi(avatarName){
  const url = `${basePath}/${apiVersion}/getAvatar/${avatarName}`;

  return fetch(url)
    .then(response => {
      return response.url;
    })
    .catch(err => {
      return err.message;
    });
}

export function deleteUserApi(token, userId) {
  const url = `${basePath}/${apiVersion}/deleteUser/${userId}`;

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



