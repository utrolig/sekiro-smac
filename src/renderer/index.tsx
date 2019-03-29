import React from "react";
import ReactDOM from "react-dom";
import { Root } from "./root";

function startApplication() {
  const el = document.getElementById("page");

  if (!el) {
    throw new Error("No div with id #page in template.");
  }

  ReactDOM.render(<Root />, el);
}

startApplication();
