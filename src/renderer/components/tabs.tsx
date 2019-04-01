import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Tabs = styled.div`
  display: flex;
  padding: 0 18px;
`;

export const TabLink = styled(NavLink)`
  align-items: center;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  color: inherit;
  display: flex;
  font-size: 14px;
  height: 45px;
  text-decoration: none;
  padding: 0 18px;

  &:hover {
    background: rgba(255, 255, 255, 0.01);
  }

  &:active {
    color: #fff;
  }

  &.active {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }
`;
