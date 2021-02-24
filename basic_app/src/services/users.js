export function getList() {
  //console.log('getList()');
  return fetch('http://localhost:8080/users',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
}

export function getListByCompany(id) {
  //console.log('getList()');
  return fetch('http://localhost:8080/users_by_company/' + id,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
}

export function getUser(id) {
  //console.log(id);
  return fetch('http://localhost:8080/users/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(data => data.json())
}

export function updateUser(id, item) {
  return fetch('http://localhost:8080/users/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  }).then(data => data.json())
}


export function addUser(item) {
  console.log(item);
  return fetch('http://localhost:8080/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  }).then(data => data.json())
}