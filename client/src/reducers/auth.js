export const authReducer = (state = {name: "Cyrus", role: "Seller"}, action) => {
    switch(action.type) {
      case "LOGGED_IN":
        return {...state, ...action.payload} 
      case "LOGGED_OUT":
        return action.payload;
      default:
        return state;
    }
  }

