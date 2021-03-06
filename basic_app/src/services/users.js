import { getLoggedInUserId } from '../Utils'

export function getList(isAdmin) {
  if (isAdmin) {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => data.json())
  }
  else {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/users/` + getLoggedInUserId(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => data.json())
  }

}

export function getListByCompany(id) {
  //console.log('getList()');
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/users_by_company/` + id,
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
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/users/` + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(data => data.json())
}

export function updateUser(id, item) {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/users/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  }).then(data => data.json())
}


export function addUser(item) {
  console.log(item);
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  }).then(data => data.json())
}