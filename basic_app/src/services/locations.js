import { getIsAdmin, getLoggedInUserId } from '../Utils'

export function getLocations(userId) {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/locations_by_user/` + userId,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
}

export function getLocation(id) {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/location/` + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.json())
}

export function updateLocation(id, item) {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/location/` + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item })
    }).then(data => data.json())
}

export function addLocation(item) {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/location`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item })
    }).then(data => data.json())
}

export function deleteLocation(id) {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/location/` + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.json())
}