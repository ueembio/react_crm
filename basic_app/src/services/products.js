export function getList() {
    return fetch('http://localhost:8080/products')
      .then(data => data.json())
  }

  export function getProduct(id) {
    console.log(id);
    return fetch('http://localhost:8080/products/'+id)
      .then(data => data.json())
  }


export function setList(item) {   
    return fetch('http://localhost:8080/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },    
      body: JSON.stringify({item})
    })
      .then(data => data.json())
   }
   
export function updateList(item) {   
return fetch('http://localhost:8080/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },    
  body: JSON.stringify({item})
})
  .then(data => data.json())
}    