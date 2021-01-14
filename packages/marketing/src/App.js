// classical react app (kind of)

import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

// each app use JSS which uses the same prefix by default,
// this prevent name clashes
const generateClassName = createGenerateClassName({
  productionPrefix: "ma",
});

// classic react app
export default ({ history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        {/* Router used is the base one, and an history object is passed, */}
        {/* so we have a memory router or a browser router (isolation or hosted mode) */}
        <Router history={history}>
          <Switch>
            <Route exact path="/pricing" component={Pricing} />
            <Route path="/" component={Landing} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
