// import dependencys 
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
import StripeCallback from './stripe/StripeCallback';
import EditHotel from './hotel/EditHotel';
import ViewHotel from './hotel/ViewHotel';
import StripeCancel from './stripe/StripeCancel';
import SearchResult from './hotel/SearchResults';
import ReadProfile from './profile/ReadProfile';
import CreateProfile from './profile/CreateProfile';
import EditProfile from './profile/EditProfile';
import CreateReview from './review/CreateReview';
import readReviews from './review/ReadReviews';
import "bootswatch/dist/lux/bootstrap.min.css";
import "antd/dist/antd";



import StripeSuccess from './stripe/StripeSuccess';
import Footer from './components/Footer';
import AdminDashboard from './admin/AdminDashboard';

// Main function to handle app rendering and routing
function App() {
    
  return (
    <body>
    <div className="page-container">
    <BrowserRouter>
    <TopMenuNav/>
    <div className="content-wrap">
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
    <PrivateRoute exact path="/stripe/cancel" component={StripeCancel} />
    <PrivateRoute eact path="/search-result/" component={SearchResult}/>
    <PrivateRoute exact path="/stripe/success/:hotelId" component={StripeSuccess}/>
    <PrivateRoute exact path="/user/:userId" component={ReadProfile}/>
    <PrivateRoute exact path="/profile/create/:userId" component={CreateProfile} />
    <PrivateRoute exact path="/profile/edit/:userId" component={EditProfile} />
    <PrivateRoute exact path="/review/create/:hotelId" component={CreateReview} />
    <PrivateRoute exact path="/user/reviews/:userId" component={readReviews} />
    <PrivateRoute exact path="/admin/" component={AdminDashboard}/>
    </Switch>
    </div>
    <div className="footer">
    <Footer/>
    </div>
    </BrowserRouter>
    </div>
    </body>
  );
}

export default App;
