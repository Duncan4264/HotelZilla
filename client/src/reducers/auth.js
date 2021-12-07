// create user state variable
let userState;

// see if the browser storage has cookie
if (window.localStorage.getItem('auth')) {
  // load the auth token parse
  userState = JSON.parse(window.localStorage.getItem('auth'));
} else {
  // else set variable null
  userState = null;
}

/*
 * Method authReducer to reduce auth process to login or logout
 * Parameters: State is equal to user state, action object
 */
export const authReducer = (state = userState, action) => {
  // Swithc action type, if logged in set state and action payload
  switch (action.type) {
    case 'LOGGED_IN':
      return { ...state, ...action.payload };
    case 'LOGGED_OUT':
      // returon action payload
      return action.payload;
    default:
      // default return state
      return state;
  }
};
