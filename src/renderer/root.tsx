import React, { Fragment } from "react";
import { GlobalStyles } from "./components/global-styles";
import { PageContainer } from "./components/page";
import sekiroLogo from "./assets/sekiro-logo.png";
import { AppLogo } from "./components/app-logo";
import { Button } from "./components/button";
import { Path } from "./components/path";
import { PathContainer } from "./components/path-container";
import { remote } from "electron";

export type RootState = {
  sekiroSaveGameFolder: string | null;
  saveGamesFolder: string | null;
};

export class Root extends React.Component<{}, RootState> {
  public state: RootState = {
    saveGamesFolder: null,
    sekiroSaveGameFolder: null
  };

  public render() {
    const { saveGamesFolder, sekiroSaveGameFolder } = this.state;
    return (
      <Fragment>
        <GlobalStyles />
        <PageContainer>
          <AppLogo src={sekiroLogo} />
          <PathContainer title="Sekiro savegame folder">
            <Path
              placeholder="Path to Sekiro Save folder not set."
              path={sekiroSaveGameFolder}
            />
            <Button onClick={this.browseForSekiroSaveGameFolder}>Browse</Button>
          </PathContainer>
          <PathContainer title="Folder to save game files">
            <Path
              placeholder="Game files save folder not set"
              path={saveGamesFolder}
            />
            <Button onClick={this.browseForSaveFolder}>Browse</Button>
          </PathContainer>
        </PageContainer>
      </Fragment>
    );
  }

  private browseForFolder = () => {
    const path = remote.dialog.showOpenDialog({
      properties: ["openDirectory"]
    });

    if (!path) {
      return null;
    }

    return path[0];
  };

  private browseForSaveFolder = () => {
    const saveGamesFolder = this.browseForFolder();
    this.setState({ saveGamesFolder });
  };

  private browseForSekiroSaveGameFolder = () => {
    const sekiroSaveGameFolder = this.browseForFolder();
    this.setState({ sekiroSaveGameFolder });
  };
}
