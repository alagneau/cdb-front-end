import logo from './logo.svg';
import './App.css';
import { Computer } from './Components/Models/computer.model';
import { LoginView } from './Components/Views/Login/login.view';

function App() {
  let comp = new Computer();
  comp.name = "Cyril"

  return (
    <div className="App">
      <LoginView/>
    </div>
  );
}

export default App;
