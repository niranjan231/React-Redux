import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    cart: [],
    totalPrice: 0,
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addToCard: (state, action) => {
            // this code for add only one time add cart
            const existingItem = state.cart.find((item) => item.id === action.payload.id);
            if (!existingItem) {
                // this for add card
                state.cart.push({ ...action.payload, quantity: 1 });
                // Update the total price
                state.totalPrice += action.payload.price;
            }
        },
        clearData: (state) => {
            state.cart = [];
            state.totalPrice = 0; // Reset the total price
        },
        removeCart: (state, action) => {
            state.cart = state.cart.filter(x => x.id != action.payload.id)
            state.totalPrice -= action.payload.price;
        },
        ICounter: (state, action) => {
            const item2 = state.cart.find((item) => item.id === action.payload.id);
            if (item2) {
                item2.quantity += 1;
                state.totalPrice += item2.price;
            }
        },
        DecrementCounter: (state, action) => {
            const item3 = state.cart.find((item4) => item4.id === action.payload.id)
            if (item3) {
                if (item3.quantity > 1) {
                    item3.quantity -= 1;
                    state.totalPrice -= item3.price
                }
            }
        }
    },
});

export const { addToCard, clearData, removeCart, ICounter, DecrementCounter } = counterSlice.actions;
export default counterSlice.reducer;
