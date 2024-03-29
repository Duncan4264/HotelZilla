// import dependencys
import Home from './booking/Home';
import Login from './auth/Login';
import { useSelector } from 'react-redux';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TopMenuNav from './components/TopMenuNav';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
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
import ViewLocalHotel from './hotel/ViewLocalHotel';
import 'bootswatch/dist/lux/bootstrap.min.css';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import PageNotFound from './components/PageNotFound';

import StripeSuccess from './stripe/StripeSuccess';
import Footer from './components/Footer';
import Admin from './user/Admin';

// Main function to handle app rendering and routing
function App() {
  // deconsturct auth from state
  const { auth } = useSelector((state) => ({ ...state }));
  return auth !== null && auth.isSuspended ? (
    <div>Your account has been suspended</div>
  ) : (
    <div className="App">
      <div className="page-container">
        <BrowserRouter>
          <div className="content-wrap">
            <ToastContainer position="top-center" />

            <Auth0ProviderWithHistory>
              <TopMenuNav />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />

                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/dashboard/seller"
                  component={DashboardSeller}
                />
                <PrivateRoute exact path="/hotels/new" component={NewHotel} />
                <PrivateRoute
                  exact
                  path="/hotel/:hotelId"
                  component={ViewHotel}
                />
                <PrivateRoute
                  exeact
                  path="/stripe/callback"
                  component={StripeCallback}
                />
                <PrivateRoute
                  exact
                  path="/hotel/edit/:hotelId"
                  component={EditHotel}
                />
                <PrivateRoute
                  exact
                  path="/stripe/cancel"
                  component={StripeCancel}
                />
                <PrivateRoute
                  eact
                  path="/search-result/"
                  component={SearchResult}
                />
                <PrivateRoute
                  exact
                  path="/stripe/success/:hotelId"
                  component={StripeSuccess}
                />
                <PrivateRoute
                  exact
                  path="/user/:userId"
                  component={ReadProfile}
                />
                <PrivateRoute
                  exact
                  path="/profile/create/:userId"
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path="/profile/edit/:userId"
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path="/review/create/:hotelId"
                  component={CreateReview}
                />
                <PrivateRoute
                  exact
                  path="/user/reviews/:userId"
                  component={readReviews}
                />
                <PrivateRoute
                  exact
                  path="/local/hotel/:hotelId"
                  component={ViewLocalHotel}
                />
                <PrivateRoute exact path="/admin" component={Admin} />
                <Route component={PageNotFound} />
              </Switch>
            </Auth0ProviderWithHistory>
          </div>
          <div className="footer">
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
