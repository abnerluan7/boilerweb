import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
const Login = React.lazy(() => import("../containers/Login/Login"));
const SignUp = React.lazy(() => import("../containers/SignUp/SignUp"));

function UnauthenticatedApp() {
  return (
    <React.Suspense fallback={<div></div>}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Redirect exact from="*" to="/login" />
      </Switch>
    </React.Suspense>
  );
}

export default UnauthenticatedApp;
