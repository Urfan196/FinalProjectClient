 const fetchNearLocations = (e, user, dist = '10') => {
    e && e.preventDefault()

    const distance = parseInt(dist)

    const {latitude, longitude} = user.location
    const coords = [latitude, longitude]

    return (dispatch) => {
        return fetch('http://localhost:3000/near-locations', {
            method: "POST",
            headers: {
              "Authorization": `${localStorage.getItem('jwt')}`,
              "Accept": "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify({
                distance,
                coords
            })
        })
        .then(res => res.json())
        .then(locations => {          
            dispatch({ type: 'SET_NEAR_LOCATION', locations })
        })
    }
 }
 
 export default fetchNearLocations