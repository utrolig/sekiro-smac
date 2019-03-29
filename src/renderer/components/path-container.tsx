import React from "react";
import styled from "styled-components";

type PathContainerProps = {
  title: string;
};
const ContainerOuter = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const ContainerTitle = styled.div`
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 4px;
  text-transform: uppercase;
`;

const PathContainerInner = styled.div`
  display: flex;
  align-items: center;
`;

export const PathContainer: React.FunctionComponent<PathContainerProps> = ({
  children,
  title
}) => {
  return (
    <ContainerOuter>
      <ContainerTitle>{title}</ContainerTitle>
      <PathContainerInner>{children}</PathContainerInner>
    </ContainerOuter>
  );
};
