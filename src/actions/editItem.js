const editItem = (e, state, id, history) => {
    e.preventDefault();
    const {title, description, category, image} = state

    const formData = new FormData()
    formData.append('item[title]', title)
    formData.append('item[description]', description)
    formData.append('item[category]', category)
    image && formData.append('item[image]', image)

    return (dispatch) => {
        return fetch(`http://localhost:3000/items/${id}`, {
        method: 'PATCH',
        headers: {
            "Authorization": `${localStorage.getItem('jwt')}`},
        body: formData
        })
        .then(resp => resp.json())
        .then(data => {
            const {item, imageUrl} = data
            const itemObj = {...item, imageUrl}
            dispatch({type: 'SET_SELECTED_ITEM', item: itemObj})
            dispatch({type: 'EDIT_ITEM', item: itemObj})
            history.push('/profile')
        })
    }   
}

export default editItem;