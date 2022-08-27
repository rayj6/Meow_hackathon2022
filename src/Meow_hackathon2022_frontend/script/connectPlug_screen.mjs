import {connectPlug} from "./getFunction.mjs";

const connectBtn = document.getElementById("connect_screen_connect_to_plug_container");
connectBtn.addEventListener("click", () => {
    connectPlug();
});