export function getRents() {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/rents`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => data.json())
}

export function getRentsByLeaseStatus(id) {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/rents_by_lease_status/` + id,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => data.json())
}

export function getRent(id) {
  console.log(id);
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/rent/` + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(data => data.json())
}

export function updateRent(id, item) {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/rent/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  }).then(data => data.json())
}


export function addRent(item) {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/rents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  })
    .then(data => data.json())
}

export function updateList(item) {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  })
    .then(data => data.json())
}    