import {Button} from 'primereact/button';
import 'primereact/resources/themes/saga-orange/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Routes from './routes';

function App() {
  return (
    <div>
      <Routes/>
      <Button label="Save"></Button>
    </div>
  );
}

export default App;
