import {connectPlug} from "../../Meow_hackathon2022_offchain_backend/plugWallet/conn.mjs";

const connectBtn = document.getElementById("connectPlug");
connectBtn.addEventListener("click", () => {
    connectPlug();
});