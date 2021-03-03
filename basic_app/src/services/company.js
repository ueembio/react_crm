export function getCompanies() {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/company`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => data.json())
}

export function getCompany(id) {
  console.log(id);
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/company/` + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(data => data.json())
}

export function updateCompany(id, item) {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/company/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  }).then(data => data.json())
}


export function addCompany(item) {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/company`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  }).then(data => data.json())
}

export function updateList(item) {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/company`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  })
    .then(data => data.json())
}    