import React from "react";
import styled from "styled-components";
import closeIcon from "../assets/close.png";

const Container = styled.div`
  background: rgba(0, 0, 0, 0.15);
  display: flex;
  height: 24px;
`;

const AppTitle = styled.span`
  font-size: 12px;
  line-height: 24px;
  margin-left: 8px;
`;

const CloseButton = styled.button`
  background: none;
  border: 0;
  outline: 0;
  margin-left: auto;
`;

export const TitleBar: React.FunctionComponent = () => (
  <Container>
    <AppTitle>Sekiro Savegame Manager</AppTitle>
    <CloseButton>X</CloseButton>
  </Container>
);
