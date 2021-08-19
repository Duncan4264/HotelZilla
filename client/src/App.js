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
import EditHotel from './hotel/EditHotel';
import {useHistory} from "react-router-dom"
import ViewHotel from './hotel/ViewHotel';
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
    <PrivateRoute exact path ="/hotel/:hotelId" component={ViewHotel}/>
    <PrivateRoute exeact path ="/stripe/callback" component={StripeCallback}/>
    <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
