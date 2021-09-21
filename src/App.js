import { Route,BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Appbar from './components/Appbar';
import Content from './components/Content';
import CustomerView from './components/CustomerView';
import NewProduct from './components/NewProduct';

function App() {
  return (
    <Router>

    <div className="App">
      <Appbar />
      
      <Switch>
        <Route exact path = '/newproduct' component={NewProduct} />
        <Route exact path = '/' component={Content} />
        <Route exact path = '/customer' component={CustomerView} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
