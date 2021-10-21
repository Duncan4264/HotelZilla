// Import dependencys 
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

/*
*  Method to create a private route component 
* Parameters: Deconstruct rest parameter
*/
const PrivateRoute = ({...rest}) => {
    const { auth } = useSelector((state) => ({...state}));

    return auth && auth.token ? <Route {...rest} /> : <Redirect to="/login" />;
};


export default PrivateRoute;