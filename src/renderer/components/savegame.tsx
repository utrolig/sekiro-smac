import React from "react";
import styled from "styled-components";
import { SavegameInfo } from "../../common";
import moment from "moment";

const Container = styled.div`
  justify-content: center;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  padding: 6px 18px;
  margin-bottom: 8px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  border: 2px solid
    ${(p: { active: boolean }) =>
      p.active ? "#f4a742" : "rgba(255, 255, 255, 0.1)"};
`;

const Name = styled.div`
  color: #fff;
  font-size: 16px;
`;

const DateText = styled.div`
  color: inherit;
  font-size: 12px;
`;

export type SavegameProps = {
  active: boolean;
  savegame: SavegameInfo;
  onRestoreClicked: (name: string) => void;
};

export const Savegame: React.FunctionComponent<SavegameProps> = ({
  active,
  onRestoreClicked,
  savegame
}) => (
  <Container active={active} onClick={() => onRestoreClicked(savegame.name)}>
    <Name>{savegame.name}</Name>
    <DateText>{moment(savegame.created).fromNow()}</DateText>
  </Container>
);
