const fetchAllConvos = () => {
    return (dispatch) => {
        return fetch('http://localhost:3000/convos', {
            method: "GET",
            headers: {
            //   "Authorization": `${localStorage.getItem('jwt')}`,
              "Accept": "application/json"
            }
        })
        .then(res => res.json())
        .then(convos => {
            dispatch({ type: "SET_ALL_CONVOS", convos})
        })
    }
}

export default fetchAllConvos