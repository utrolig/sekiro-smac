import React, { Fragment } from "react";
import { GlobalStyles } from "./components/global-styles";
import { PageContainer } from "./components/page";
import sekiroLogo from "./assets/sekiro-logo.png";
import { AppLogo } from "./components/app-logo";
import { Settings } from "./pages";
import { createMemoryHistory } from "history";
import { Router, Switch, Route, Redirect } from "react-router";
import { Home } from "./pages/home";

export const history = createMemoryHistory();

export class Root extends React.Component {
  public render() {
    return (
      <Fragment>
        <GlobalStyles />
        <PageContainer>
          <AppLogo src={sekiroLogo} />
          <Router history={history}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/settings" component={Settings} />
              <Redirect to="/" />
            </Switch>
          </Router>
        </PageContainer>
      </Fragment>
    );
  }
}
