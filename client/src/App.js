import Home from './booking/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import TopMenuNav from './components/TopMenuNav';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer } from 'react-toastify';
function App() {
  return (
    <BrowserRouter>
    <TopMenuNav/>
    <ToastContainer position="top-center"/>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/register" component={Register}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
