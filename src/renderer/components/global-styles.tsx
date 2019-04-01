import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #page {
    background-color: #26252a;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
 
  ::-webkit-scrollbar-thumb {
    background-color: #26252a;
    border-radius: 20px;
  }

  ::-webkit-scrollbar-track {
    background: #3c3a42;
    border-radius: 20px;
  }
`;
