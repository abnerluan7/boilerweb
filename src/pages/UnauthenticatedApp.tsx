import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
const Login = React.lazy(() => import("../containers/auth/Login/Login"));
const SignUp = React.lazy(() => import("../containers/auth/SignUp/SignUp"));
const Recovery = React.lazy(() => import("../containers/auth/Recovery/Recovery"));
const Reset = React.lazy(() => import("../containers/auth/Reset/Reset"));

function UnauthenticatedApp() {
  return (
    <React.Suspense fallback={<div></div>}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/recovery" component={Recovery} />
        <Route path="/reset/:tokenReset" component={Reset} />
        <Redirect exact from="*" to="/login" />
      </Switch>
    </React.Suspense>
  );
}

export default UnauthenticatedApp;
