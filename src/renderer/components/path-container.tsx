import React from "react";
import styled from "styled-components";

type PathContainerProps = {
  subtitle: string;
  title: string;
};
const ContainerOuter = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
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

const SubTitle = styled.div`
  font-size: 13px;
  margin-top: 4px;
`;

export const PathContainer: React.FunctionComponent<PathContainerProps> = ({
  children,
  subtitle,
  title
}) => {
  return (
    <ContainerOuter>
      <ContainerTitle>{title}</ContainerTitle>
      <PathContainerInner>{children}</PathContainerInner>
      <SubTitle>{subtitle}</SubTitle>
    </ContainerOuter>
  );
};
