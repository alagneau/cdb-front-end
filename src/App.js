import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom'
import { HomeView } from './Components/Views/Home/home.view';
import { RouteCDB } from './libs/route.component';
import UserView from './Components/Views/User/user-view'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <RouteCDB exact path="/" component={HomeView}/>
          <RouteCDB path="/home" component={HomeView}/>
          <RouteCDB path="/user" component={UserView}/>
          <RouteCDB path="/" component={HomeView}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
