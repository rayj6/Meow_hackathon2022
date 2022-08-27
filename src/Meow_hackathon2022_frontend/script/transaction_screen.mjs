const getReceiverId = document.getElementById("transaction_screen_option_reciever_id_input");
const getSenderId = document.getElementById("transaction_screen_option_sender_id_input");
const getAmountId = document.getElementById("transaction_screen_option_amount_input");

var e = document.getElementById("how_to_pay");

const transferBtn = document.getElementById("transaction_screen_option_submit_input");
transferBtn.addEventListener("click", () => {
    console.log(getReceiverId.value);
    console.log(getSenderId.value);
    console.log(getAmountId.value);

    console.log(e.value);
})