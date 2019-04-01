import React from "react";
import styled from "styled-components";
import moment from "moment";
import { ActiveSave } from "../../common";
import { Button } from "./button";
import { SectionTitle } from "./section-title";
import { Input } from "./input";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px;
  width: 300px;
`;

const Title = () => <SectionTitle>Active savegame</SectionTitle>;

export type ActiveSaveSectionProps = {
  error: boolean;
  disabled: boolean;
  item: ActiveSave | null;
  inputError: boolean;
  loading: boolean;
  savegameNameInput: string;
  onSavegameNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBackupActiveSavegame: () => void;
};

class ActiveSaveSectionComponent extends React.Component<
  ActiveSaveSectionProps
> {
  public render() {
    const {
      disabled,
      inputError,
      error,
      item,
      loading,
      onBackupActiveSavegame,
      savegameNameInput,
      onSavegameNameChange
    } = this.props;

    if (loading) {
      return <Container />;
    }

    if (error || !item) {
      return (
        <Container>
          <Title />
          Error loading active save game. Are you sure you have selected the
          correct folder in settings?
        </Container>
      );
    }

    return (
      <Container>
        <Title />
        <div>{item.name}</div>
        <div style={{ marginBottom: 18 }}>
          {moment(item.modifiedAt).fromNow()}
        </div>
        <Input
          error={inputError}
          placeholder={"f.ex Before Chained Ogre"}
          label={"Name"}
          description={this.getInputDescription()}
          value={savegameNameInput}
          onChange={onSavegameNameChange}
        />
        <Button
          disabled={inputError || disabled}
          onClick={onBackupActiveSavegame}
        >
          Backup current save
        </Button>
      </Container>
    );
  }

  private getInputDescription = () => {
    if (this.props.inputError) {
      return "A savegame with that name already exists.";
    }

    return "A fitting name for the current save backup";
  };
}

export const ActiveSaveSection = ActiveSaveSectionComponent;
