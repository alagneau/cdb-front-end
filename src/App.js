import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {/* La page à afficher par défaut */}
        </Route>
        <Route path="/page">
          {/* Une page */}
        </Route>
        {/* A garder en dernier, permet de redirigier vers Home en cas de aucun lien trouvé */}
        <Route path="/">
          {/* La page à afficher par défaut */}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
