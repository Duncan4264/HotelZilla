// Import dependencys
import { Route } from 'react-router-dom';

import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/loading';

/*
 *  Method to create a private route component
 * Parameters: Deconstruct rest parameter
 */
const PrivateRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />
    })}
    {...args}
  />
);

export default PrivateRoute;
