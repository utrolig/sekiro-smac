import styled from "styled-components";

export const Button = styled.button`
  background-color: #7289da;
  color: #fff;
  cursor: pointer;
  outline: 0;
  border: 0;
  border-radius: 3px;
  height: 45px;
  font-size: 14px;
  line-height: 45px;
  width: 250px;

  &:hover {
    background-color: #4b69d0;
  }

  &:active {
    box-shadow: 0 0 0 2px inset #7289da;
  }

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
    color: rgba(0, 0, 0, 0.33);
  }
`;
