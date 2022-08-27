import {createUserWallet} from "../../Meow_hackathon2022_offchain_backend/token/tokenFunction.mjs";


const toTransactionBtn = document.getElementById("toTransaction"); 
toTransactionBtn.addEventListener("click", () => {
    console.log("toTransaction");
    location="../screens/transaction.html";
});

const createWalletBtn = document.getElementById("toCreateWallet");
const principalId = window.ic.plug.principalId;
createWalletBtn.addEventListener("click", () => {
    createUserWallet(principalId, "Nam", 123456);
})

const toCreatePollBtn = document.getElementById("toCreatePoll"); 
toCreatePollBtn.addEventListener("click", () => {
    console.log("toPoll");
    location="../screens/create_poll.html";
});

const toEnterPollPollBtn = document.getElementById("toEnterPoll"); 
toEnterPollPollBtn.addEventListener("click", () => {
    console.log("toPoll");
    location="../screens/enter_code.html";
});