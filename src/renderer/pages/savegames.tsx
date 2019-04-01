import React from "react";
import styled from "styled-components";
import { ipcRenderer } from "electron";
import { actions } from "../../main/events";
import {
  ActiveSave,
  SavegameInfo,
  BackupActiveSavegameData
} from "../../common";
import { ActiveSaveSection } from "../components/active-save-section";
import { SavegamesList } from "../components/savegames-list";

export const SavegamesContainer = styled.div`
  display: flex;
  flex: 1;
`;

type HomeComponentState = {
  activeSavegameName: string | null;
  activeSave: ActiveSave | null;
  activeSaveError: boolean;
  activeSaveLoading: boolean;
  savegames: SavegameInfo[];
  savegameNameInput: string;
};

class SavegamesComponent extends React.Component<{}, HomeComponentState> {
  public state: HomeComponentState = {
    activeSavegameName: null,
    activeSave: null,
    activeSaveError: false,
    activeSaveLoading: true,
    savegames: [],
    savegameNameInput: ""
  };

  public componentDidMount() {
    this.bindEvents();
  }

  public componentWillUnmount() {
    this.unbindEvents();
  }

  public render() {
    const {
      activeSavegameName,
      activeSave,
      activeSaveLoading,
      activeSaveError,
      savegames,
      savegameNameInput
    } = this.state;
    return (
      <SavegamesContainer>
        <ActiveSaveSection
          disabled={!!!savegameNameInput}
          inputError={this.doesCurrentInputExist()}
          onBackupActiveSavegame={this.onBackupActiveSavegame}
          error={activeSaveError}
          loading={activeSaveLoading}
          savegameNameInput={savegameNameInput}
          onSavegameNameChange={this.onSavegameNameChange}
          item={activeSave}
        />
        <SavegamesList
          activeSavegameName={activeSavegameName}
          savegames={savegames}
          onRestoreClicked={this.onRestoreClicked}
        />
      </SavegamesContainer>
    );
  }

  private bindEvents = () => {
    ipcRenderer.on(
      actions.getActiveSavegame.success,
      this.handleGetActiveSavegameSuccess
    );
    ipcRenderer.on(
      actions.getActiveSavegame.error,
      this.handleGetActiveSavegameError
    );
    ipcRenderer.on(
      actions.backupActiveSavegame.success,
      this.onBackupActiveSavegameSuccess
    );
    ipcRenderer.on(
      actions.getSavegames.success,
      this.handleGetSavegamesSuccess
    );

    ipcRenderer.on(
      actions.restoreSavegame.success,
      this.handleRestoreSavegameSuccess
    );
    ipcRenderer.on(
      actions.restoreSavegame.error,
      this.handleRestoreSavegameError
    );
    ipcRenderer.on(
      actions.getActiveSavegameName.success,
      this.handleGetActiveSavegameNameSuccess
    );

    ipcRenderer.send(actions.getActiveSavegame.action);
    ipcRenderer.send(actions.getSavegames.action);
    ipcRenderer.send(actions.getActiveSavegameName.action);
  };

  private unbindEvents = () => {
    ipcRenderer.removeListener(
      actions.getActiveSavegame.success,
      this.handleGetActiveSavegameSuccess
    );
    ipcRenderer.removeListener(
      actions.getActiveSavegame.error,
      this.handleGetActiveSavegameError
    );
    ipcRenderer.removeListener(
      actions.backupActiveSavegame.success,
      this.onBackupActiveSavegameSuccess
    );
    ipcRenderer.removeListener(
      actions.getSavegames.success,
      this.handleGetSavegamesSuccess
    );
    ipcRenderer.removeListener(
      actions.restoreSavegame.success,
      this.handleRestoreSavegameSuccess
    );
    ipcRenderer.removeListener(
      actions.restoreSavegame.error,
      this.handleRestoreSavegameError
    );
    ipcRenderer.removeListener(
      actions.getActiveSavegameName.success,
      this.handleGetActiveSavegameNameSuccess
    );
  };

  private doesCurrentInputExist = () => {
    const { savegameNameInput, savegames } = this.state;
    const doesExist = savegames.find(
      savegame => savegame.name === savegameNameInput
    );

    return !!doesExist;
  };

  private onRestoreClicked = (name: string) => {
    ipcRenderer.send(actions.restoreSavegame.action, name);
    this.setState({ activeSavegameName: name });
  };

  private handleRestoreSavegameSuccess = () => {
    ipcRenderer.send(actions.getActiveSavegame.action);
  };

  private handleGetActiveSavegameNameSuccess = (
    event: any,
    activeSavegameName: string
  ) => {
    this.setState({ activeSavegameName });
  };

  private handleRestoreSavegameError = () => {
    console.log("Restore error");
  };

  private handleGetSavegamesSuccess = (
    event: any,
    savegames: SavegameInfo[]
  ) => {
    this.setState({ savegames });
  };

  private onSavegameNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ savegameNameInput: e.target.value });
  };

  private onBackupActiveSavegame = () => {
    const dto: BackupActiveSavegameData = {
      name: this.state.savegameNameInput
    };
    ipcRenderer.send(actions.backupActiveSavegame.action, dto);
    this.setState({
      savegameNameInput: "",
      activeSavegameName: this.state.savegameNameInput
    });
  };

  private onBackupActiveSavegameSuccess = (
    event: any,
    savegames: SavegameInfo[]
  ) => {
    this.setState({ savegames });
  };

  private handleGetActiveSavegameError = () => {
    this.setState({
      activeSave: null,
      activeSaveLoading: false,
      activeSaveError: true
    });
  };

  private handleGetActiveSavegameSuccess = (
    _event: any,
    activeSave: ActiveSave
  ) => {
    this.setState({ activeSave, activeSaveLoading: false });
  };
}

export const Savegames = SavegamesComponent;
