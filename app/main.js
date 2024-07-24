import { createLayout, createElement, createApplication, roseConfig } from "./roseviewsdk/roseview.core.js";

import outlinedButton from "./components/outlinedbtn.js";

let layout = createLayout("linear", "center");

let helloWorld = outlinedButton(layout, "Hello World !", "180px", "auto");

createApplication(layout);

roseConfig.Title = "roseview Framework";
