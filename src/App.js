import { Layout } from "./App_styled";
import Left from "./component/Left/Left";
import Right from "./component/Right/Right";
import Router from "./config/Router";
import api from "./config/Axios"

function App() {
  window.$http = api;
  
  return (
    <Router />
  );
}

export default App;
