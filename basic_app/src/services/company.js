export function getCompanies() {
    return fetch('http://localhost:8080/company')
      .then(data => data.json())
  }

  export function getCompany(id) {
    console.log(id);
    return fetch('http://localhost:8080/company/'+id)
      .then(data => data.json())
  }

  export function updateCompany(id,item) {
    return fetch('http://localhost:8080/company/'+id, {
      method: 'PUT',
      headers: {
       'Content-Type': 'application/json'
      },    
      body: JSON.stringify({item})
})
  .then(data => data.json())
  }


export function setList(item) {   
    return fetch('http://localhost:8080/company', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },    
      body: JSON.stringify({item})
    })
      .then(data => data.json())
   }
   
export function updateList(item) {   
return fetch('http://localhost:8080/company', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },    
  body: JSON.stringify({item})
})
  .then(data => data.json())
}    