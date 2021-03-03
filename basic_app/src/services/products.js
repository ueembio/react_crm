export function getList() {
  //console.log('getList()');
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/products`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
}

export function getAvailableProducts() {
  //console.log('getList()');
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/get_available_products`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
}

export function getProduct(id) {
  //console.log(id);
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/products/` + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(data => data.json())
}

export function updateProduct(id, item) {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/products/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  })
    .then(data => data.json())
}


export function addProduct(item) {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  }).then(data => data.json())
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

export function getProductData(id) {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/product_data/` + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(data => data.json())
}