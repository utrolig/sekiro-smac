import React, { Fragment } from "react";
import { PathContainer } from "../components/path-container";
import { Path } from "../components/path";
import { Button } from "../components/button";
import { ipcRenderer, remote } from "electron";
import { actions } from "../../main/events";
import { withRouter, RouteComponentProps } from "react-router";

export type SettingsState = {
  gameDirectory: string | null;
  saveDirectory: string | null;
};

export type SettingsComponentProps = RouteComponentProps<{}>;

class SettingsComponent extends React.Component<
  SettingsComponentProps,
  SettingsState
> {
  public state: SettingsState = {
    saveDirectory: null,
    gameDirectory: null
  };

  public componentDidMount() {
    this.bindEvents();
  }

  public componentWillUnmount() {
    this.unbindEvents();
  }

  public render() {
    const { saveDirectory, gameDirectory } = this.state;
    return (
      <Fragment>
        <Button onClick={this.goHome}>Back</Button>
        <PathContainer
          title="Sekiro folder"
          subtitle="Path to Sekiro appdata folder."
        >
          <Path placeholder="Not set." path={gameDirectory} />
          <Button onClick={this.browseForSekiroSaveGameFolder}>Browse</Button>
        </PathContainer>
        <PathContainer
          title="Save folder"
          subtitle="Folder where the save-manager will store all your save files."
        >
          <Path placeholder="Not set." path={saveDirectory} />
          <Button onClick={this.browseForSaveFolder}>Browse</Button>
        </PathContainer>
      </Fragment>
    );
  }

  private goHome = () => {
    this.props.history.push("/");
  };

  private bindEvents = () => {
    ipcRenderer.on(
      actions.setGameDirectory.success,
      this.onSetGameDirectorySuccess
    );
    ipcRenderer.on(
      actions.setSaveDirectory.success,
      this.onSetSaveDirectorySuccess
    );
    ipcRenderer.on(
      actions.getGameDirectory.success,
      this.onSetGameDirectorySuccess
    );
    ipcRenderer.on(
      actions.getSaveDirectory.success,
      this.onSetSaveDirectorySuccess
    );

    ipcRenderer.send(actions.getGameDirectory.action);
    ipcRenderer.send(actions.getSaveDirectory.action);
  };

  private unbindEvents = () => {
    ipcRenderer.removeListener(
      actions.setGameDirectory.success,
      this.onSetGameDirectorySuccess
    );
    ipcRenderer.removeListener(
      actions.setSaveDirectory.success,
      this.onSetSaveDirectorySuccess
    );
    ipcRenderer.removeListener(
      actions.getGameDirectory.success,
      this.onSetGameDirectorySuccess
    );
    ipcRenderer.removeListener(
      actions.getSaveDirectory.success,
      this.onSetSaveDirectorySuccess
    );
  };

  private browseForFolder = (defaultPath?: string) => {
    const path = remote.dialog.showOpenDialog({
      defaultPath,
      properties: ["openDirectory"]
    });

    if (!path) {
      return null;
    }

    return path[0];
  };

  private browseForSaveFolder = () => {
    const saveDirectory = this.browseForFolder();
    ipcRenderer.send(actions.setSaveDirectory.action, saveDirectory);
  };

  private onSetSaveDirectorySuccess = (event: any, saveDirectory: string) => {
    this.setState({ saveDirectory });
  };

  private onSetGameDirectorySuccess = (event: any, gameDirectory: string) => {
    this.setState({ gameDirectory });
  };

  private browseForSekiroSaveGameFolder = () => {
    const defaultPath = remote.app.getPath("appData") + "\\Sekiro";
    const sekiroSaveGameFolder = this.browseForFolder(defaultPath);
    ipcRenderer.send(actions.setGameDirectory.action, sekiroSaveGameFolder);
  };
}

export const Settings = withRouter(SettingsComponent);
