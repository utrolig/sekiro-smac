import React from "react";
import styled from "styled-components";
import { SectionTitle } from "./section-title";
import { SavegameInfo } from "../../common";
import { Savegame } from "./savegame";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: scroll;
  padding: 18px;
`;

const Title = styled(SectionTitle)`
  margin: 18px;
  margin-bottom: 0;
`;

export type SavegamesListProps = {
  activeSavegameName: string | null;
  savegames: SavegameInfo[];
  onRestoreClicked: (name: string) => void;
};

export const SavegamesList: React.FunctionComponent<SavegamesListProps> = ({
  activeSavegameName,
  savegames,
  onRestoreClicked
}) => (
  <Container>
    <Title>Savegames</Title>
    <ScrollContainer>
      {savegames.map(savegame => (
        <Savegame
          key={savegame.name}
          active={activeSavegameName === savegame.name}
          savegame={savegame}
          onRestoreClicked={onRestoreClicked}
        />
      ))}
    </ScrollContainer>
  </Container>
);
