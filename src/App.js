import './App.css';
import EnhancedTable from './Components/Boards/EnhancedTable';
import { BrowserRouter, Switch } from 'react-router-dom'
import { HomeView } from './Components/Views/Home/home.view';
import { RouteCDB } from './libs/route.component';
import { Logout } from './Components/Views/Login/Logout';

function App() {

  return (
    // <div>
    //   <EnhancedTable />
    // </div>
    <BrowserRouter>
      <div className="App">
        <Switch>
          <RouteCDB exact path="/" component={HomeView}/>
          <RouteCDB path="/logout" component={Logout}/>
          <RouteCDB path="/computers" component={EnhancedTable}/>
          <RouteCDB path="/" component={HomeView}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
