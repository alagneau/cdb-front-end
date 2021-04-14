import './App.css';
import { LoginView } from './Components/Views/Login/login.view';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {/* La page à afficher par défaut */}
          </Route>
          <Route path="/page">
            {/* Une page */}
          </Route>
          {/* A garder en dernier, permet de redirigier vers Home en cas de aucun lien trouvé */}
          <Route path="/login">
              <LoginView/>
          </Route>
          <Route path="/">
            {/* La page à afficher par défaut */}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
