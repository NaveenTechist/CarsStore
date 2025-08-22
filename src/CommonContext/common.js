import React from 'react';
const CommonContext =  React.createContext({
    cartList: [],
    addCartListItem: () => {},
    deleteCartListItem: () => {},
})
export default CommonContext