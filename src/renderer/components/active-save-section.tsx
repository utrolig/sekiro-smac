import React from "react";
import styled from "styled-components";
import moment from "moment";
import { ActiveSave } from "../../common";
import { Button } from "./button";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px;
  width: 300px;
`;

const TitleComponent = styled.div`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 6px;
  text-transform: uppercase;
`;

const Title = () => <TitleComponent>Active Savegame</TitleComponent>;

export type ActiveSaveSectionProps = {
  error: boolean;
  item: ActiveSave | null;
  loading: boolean;
};

class ActiveSaveSectionComponent extends React.Component<
  ActiveSaveSectionProps
> {
  public render() {
    const { error, item, loading } = this.props;

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
        <div>{moment(item.modifiedAt).fromNow()}</div>
        <Button style={{ marginTop: 18 }}>Backup current save</Button>
      </Container>
    );
  }
}

export const ActiveSaveSection = ActiveSaveSectionComponent;
