const fetchAllItems = () => {
    return (dispatch) => {
        return fetch('http://localhost:3000/items', {
            method: "GET",
            headers: {
              "Authorization": `${localStorage.getItem('jwt')}`,
              "Accept": "application/json"
            }
        })
        .then(res => res.json())
        .then(items => {
            dispatch({ type: "SET_ALL_ITEMS", items: items})
        })
    }
}

export default fetchAllItems