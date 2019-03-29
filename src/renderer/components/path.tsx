import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border: 0;
  border-radius: 3px;
  color: #fff;
  flex: 1;
  height: 45px;
  line-height: 45px;
  padding: 0 12px;
  margin-right: 12px;
  font-size: 14px;
`;

export type PathProps = {
  path: string | null;
  placeholder: string;
};

export const Path: React.FunctionComponent<PathProps> = ({
  path,
  placeholder
}) => {
  let pathStr = path;
  if (!path) {
    pathStr = placeholder;
  }

  return <Container>{pathStr}</Container>;
};
