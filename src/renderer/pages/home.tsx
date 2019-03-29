import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Button } from "../components/button";

type HomeComponentProps = RouteComponentProps<{}>;

class HomeComponent extends React.Component<HomeComponentProps> {
  public render() {
    return (
      <div>
        Hello from Home!<Button onClick={this.openSettings}>Settings</Button>
      </div>
    );
  }

  private openSettings = () => {
    this.props.history.push("/settings");
  };
}

export const Home = withRouter(HomeComponent);
