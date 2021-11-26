import { Route } from "react-router-dom";
import Login from '../page/Login/login';
import Home from '../page/Home/home';

const Router = () => {
  return (
    <>
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} />
    </>
  );
}

export default Router;
