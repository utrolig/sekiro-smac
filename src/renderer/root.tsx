import React, { Fragment } from "react";
import { GlobalStyles } from "./components/global-styles";
import { PageContainer, InnerContent, PageContent } from "./components/page";
import sekiroLogo from "./assets/sekiro-logo.png";
import { AppLogo, AppLogoContainer, AppLogoTitle } from "./components/app-logo";
import { Settings } from "./pages";
import { createMemoryHistory } from "history";
import { Router, Switch, Route, Redirect } from "react-router";
import { Savegames } from "./pages/savegames";
import { Tabs, TabLink } from "./components/tabs";

export const history = createMemoryHistory();

export class Root extends React.Component {
  public render() {
    return (
      <Fragment>
        <GlobalStyles />
        <PageContainer>
          <AppLogoContainer>
            <AppLogo src={sekiroLogo} />
            <AppLogoTitle>Savegame Manager</AppLogoTitle>
          </AppLogoContainer>
          <Router history={history}>
            <InnerContent>
              <Tabs>
                <TabLink exact to="/">
                  Savegames
                </TabLink>
                <TabLink to="/settings">Settings</TabLink>
              </Tabs>
              <PageContent>
                <Switch>
                  <Route path="/" exact component={Savegames} />
                  <Route path="/settings" component={Settings} />
                  <Redirect to="/" />
                </Switch>
              </PageContent>
            </InnerContent>
          </Router>
        </PageContainer>
      </Fragment>
    );
  }
}
