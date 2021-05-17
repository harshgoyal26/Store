import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants"

const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const itemExists = state.cartItems.find((x) => x.product === item.product)
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === itemExists.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      const { id } = action.payload
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== id),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload }
    default:
      return state
  }
}

export { cartReducer }
