import { getIsAdmin, getLoggedInUserId } from '../Utils'

export function getList() {
  //console.log('getList()');
  var isAdmin = getIsAdmin();
  if (isAdmin == 1) {
    console.log('(isAdmin === 1)');
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/products`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(data => data.json())
  }
  else {
    var id = getLoggedInUserId();
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/products_by_user/` + id,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(data => data.json())
  }
}

export function getDashboardCounts(startDate, endDate) {
  var isAdmin = getIsAdmin();
  if (isAdmin == 1) {
    console.log('(isAdmin === 1)');
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/get_dashboard_counts/${startDate}/${endDate}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(data => data.json())
  }
  else {
    var id = getLoggedInUserId();
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/get_dashboard_counts_by_user/${id}/${startDate}/${endDate}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(data => data.json())
  }
}

export function getListByLocation(userId, locationId) {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/products_by_user_by_location/` + userId + '/' + locationId,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => data.json())
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

export function updateProductSetRule(id, item) {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/update_product_set_rule/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  }).then(data => data.json())
}

export function updateProductSetLocation(id, item) {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/update_product_set_location/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item })
  }).then(data => data.json())
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

export function getProductDataByDate(id, startDate, endDate) {
  console.log('getProductDataByDate');
  console.log(startDate);
  console.log(endDate);
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/product_data/` + id + `/${startDate}/${endDate}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(data => data.json())
}

export function getProductAlertsByDate(id, startDate, endDate) {
  console.log('getProductAlertsByDate');
  console.log(startDate);
  console.log(endDate);
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/product_alerts/` + id + `/${startDate}/${endDate}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(data => data.json())
}

export function getAlertsByDate(startDate, endDate) {
  console.log('getAlertsByDate');
  var isAdmin = getIsAdmin();
  if (isAdmin == 1) {
    console.log('(isAdmin === 1)');
    console.log(startDate);
    console.log(endDate);
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/alerts/${startDate}/${endDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => data.json());
  }
  else {
    var id = getLoggedInUserId();
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/alerts_by_user/${id}/${startDate}/${endDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => data.json());
  }
}

export function updateAlertSetMarkAsRead(id) {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/update_alert_mark_as_read/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(data => data.json())
}