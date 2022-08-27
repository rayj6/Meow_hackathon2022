import {connectPlug} from "../../Meow_hackathon2022_offchain_backend/plugWallet/conn.mjs";

const connectBtn = document.getElementById("connect_screen_connect_to_plug_container");
connectBtn.addEventListener("click", () => {
    connectPlug();
});