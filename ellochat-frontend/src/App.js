import Routes from './routes';
import Login from './pages/Login';
import Register from './pages/Register';
import Recover from './pages/Recover';
import Home from './pages/Home';
import './global.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/recover" component={Recover}/>
        <Route path="/home" component={Home}/>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
