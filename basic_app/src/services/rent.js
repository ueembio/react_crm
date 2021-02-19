export function getRents() {
  //console.log('getList()');
  return fetch('http://localhost:8080/rents',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => data.json())
}

export function getRentsByLeaseStatus(id) {
  return fetch('http://localhost:8080/rents_by_lease_status/' + id,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => data.json())
}

export function getRent(id) {
  console.log(id);
  return fetch('http://localhost:8080/rent/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(data => data.json())
}

export function updateRent(id, item) {
  return fetch('http://localhost:8080/rent/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  }).then(data => data.json())
}


export function addRent(item) {
  return fetch('http://localhost:8080/rents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  })
    .then(data => data.json())
}

export function updateList(item) {
  return fetch('http://localhost:8080/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  })
    .then(data => data.json())
}    