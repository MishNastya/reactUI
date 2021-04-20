const headers = {
    'Content-Type':'application/json'
}


export function sendPostRequest(url, body, method){
   return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers
   }).then(response => {
       if(response.ok) {
            return response.json();
       }
       return response.json().then(error => {
           const e = new Error('Что-то пошло не так')
           e.data = error
           throw e
       })
   })
}

export function sendRequest(url){
    return fetch(url, {
        method: 'GET',
        headers: headers
   }).then(response => {
       console.log('(response', response);
       if(response.ok) {
           return response.json();
       }
       // return response.json().then(error => {
       //     const e = new Error('Что-то пошло не так')
       //     e.data = error
       //     throw e
       // })
   }).catch(error =>{ console.log('error', error);});
}

export const execGET = (url, body) => {
    return fetch(url, {
        mode:'no-cors',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
};
