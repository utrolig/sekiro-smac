import React from "react";
import styled from "styled-components";

type InputContainerProps = React.HTMLProps<HTMLInputElement> & {
  label: string;
  error?: boolean;
  description: string;
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

const InputContainer = styled.input`
  display: flex;
  height: 100%;
  align-items: center;
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

const SubTitle = styled.div`
  color: ${(p: { error?: boolean }) => (p.error ? "red" : "inherit")};
  font-size: 13px;
  margin-top: 4px;
`;

export const Input: React.FunctionComponent<InputContainerProps> = ({
  children,
  error,
  description,
  ref,
  as,
  label,
  ...rest
}) => {
  return (
    <ContainerOuter>
      <ContainerTitle>{label}</ContainerTitle>
      <InputContainer {...rest} />
      <SubTitle error={error}>{description}</SubTitle>
    </ContainerOuter>
  );
};
