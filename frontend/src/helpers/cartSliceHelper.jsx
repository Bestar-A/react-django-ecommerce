const updateState = (state) => {
    localStorage.setItem('cart', JSON.stringify(state))

    return state;
}

export default updateState;