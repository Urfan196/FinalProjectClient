const deleteItem = (e, item, history) => {
    e.preventDefault();

    return (dispatch) => {
        fetch(`http://localhost:3000/items/${item.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `${localStorage.getItem('jwt')}`,
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(() => {
            dispatch({type: 'DELETE_ITEM', item})
            history.push('/profile')
        })
    }
}

export default deleteItem;