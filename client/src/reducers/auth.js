let userState;

if(window.localStorage.getItem('auth')) {
    userState = JSON.parse(window.localStorage.getItem('auth'));
} else {
  userState = null;

}



export const authReducer = (state =  userState, action) => {
    switch(action.type) {
      case "LOGGED_IN":
        return {...state, ...action.payload} 
      case "LOGGED_OUT":
        return action.payload;
      default:
        return state;
    }
  }

