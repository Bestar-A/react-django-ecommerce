import { createSlice } from "@reduxjs/toolkit";
import updateState from "../../helpers/cartSliceHelper";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :
            {cartItems: [], shippingAddress: {}}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            const existItem = state.cartItems.find(x => x._id === item._id)
            if(existItem) {
                state.cartItems = state.cartItems.map(x => x._id === existItem._id ? item : x)
            } else {
                state.cartItems = [...state.cartItems, item]
            }
            
            return updateState(state)
        },
        addShippingInfo: (state, action) => {
            state.shippingAddress = action.payload
            return updateState(state)
        }
    }
})

export const { addToCart, addShippingInfo } = cartSlice.actions

export default cartSlice.reducer