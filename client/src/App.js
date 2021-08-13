import Home from './booking/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import TopMenuNav from './components/TopMenuNav';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './user/Dashboard';
import DashboardSeller from './user/DashboardSeller';
import NewHotel from './hotel/NewHotel';
import StripeCallback from './stripe/StrileCallback';
import {useHistory} from "react-router-dom"
function App() {
  return (
    <BrowserRouter>
    <TopMenuNav/>
    <ToastContainer position="top-center"/>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/register" component={Register}/>
    <PrivateRoute  exact path="/dashboard" component={Dashboard}/>
    <PrivateRoute exact path ="/dashboard/seller" component={DashboardSeller}/>
    <PrivateRoute exact path ="/hotels/new" component={NewHotel}/>
    <PrivateRoute exeact path ="/stripe/callback" component={StripeCallback}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
