import {BrowserRouter, Route} from 'react-router-dom'
import 'primereact/resources/themes/saga-orange/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Routes from './routes';
import Login from './pages/Login';
import './global.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/login" component={Login}/>
    </BrowserRouter>
  );
}

export default App;
