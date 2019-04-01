import React from "react";
import styled from "styled-components";
import { withRouter, RouteComponentProps } from "react-router";
import { Button } from "../components/button";
import { ipcRenderer } from "electron";
import { actions } from "../../main/events";
import { ActiveSave } from "../../common";
import { ActiveSaveSection } from "../components/active-save-section";
import { SavegamesList } from "../components/savegames-list";

export const SavegamesContainer = styled.div`
  display: flex;
  flex: 1;
`;

type HomeComponentProps = RouteComponentProps<{}>;
type HomeComponentState = {
  activeSave: ActiveSave | null;
  activeSaveError: boolean;
  activeSaveLoading: boolean;
};

class SavegamesComponent extends React.Component<
  HomeComponentProps,
  HomeComponentState
> {
  public state: HomeComponentState = {
    activeSave: null,
    activeSaveError: false,
    activeSaveLoading: true
  };

  public componentDidMount() {
    this.bindEvents();
  }

  public componentWillUnmount() {
    this.unbindEvents();
  }

  public render() {
    const { activeSave, activeSaveLoading: loading } = this.state;
    return (
      <SavegamesContainer>
        <ActiveSaveSection error={false} loading={loading} item={activeSave} />
        <SavegamesList />
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
    ipcRenderer.send(actions.getActiveSavegame.action);
  };

  private unbindEvents = () => {
    ipcRenderer.removeListener(
      actions.getActiveSavegame.success,
      this.handleGetActiveSavegameSuccess
    );
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

  private openSettings = () => {
    this.props.history.push("/settings");
  };
}

export const Savegames = withRouter(SavegamesComponent);
