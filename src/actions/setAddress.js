const setAddress = (e, stateInfo, history, user) => {
    e.preventDefault();

    const {street, city, zip, state} = stateInfo
    const address = street + ', ' + city + ', ' + state + ', ' + zip
    
    const route = user.location ? '/profile' : '/home'
    const url = user.location ? `http://localhost:3000/locations/${user.location.id}`  : 'http://localhost:3000/locations'
    const methodType = user.location ? 'PATCH' : 'POST'
    return (dispatch) => {
        return  fetch(url,{
            method: methodType,
            headers: {
                "Authorization": `${localStorage.getItem('jwt')}`,
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                address,
                user_id: user.id
            })
        })
        .then(resp => resp.json())
        .then(location => {
            dispatch({type: 'SET_LOCATION', location})
            history.push(route)
        })
    }
}

export default setAddress
