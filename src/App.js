import Router from "./config/Router";
import api from "./config/Axios"

function App() {
  window.$http = api;
  
  return (
    <Router />
  );
}

export default App;