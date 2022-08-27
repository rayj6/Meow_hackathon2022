// ------------import connections------------------------
import {database} from "../config.mjs";
import {
    set,
    ref,
    onValue
  } from "firebase/database";
import {hash} from "../hash.mjs";
// import {fetchUserAmount} from "../func.mjs";
// ------------------------------------------------------
// ----------------export function----------------------
export {createUserWallet}
// -----------------------------------------------------

function createUserWallet (principalId, name, key) {
    set(ref(database, `userWallet/${principalId}/`), {
        name    : name,
        key     : key,
        total   : 100
    })
    .then(() => {
        // Data saved successfully!
        console.log("create user wallet successfully !");
        
    })
    .catch((error) => {
        // The write failed...
        console.log(error);
    });
}


function transaction (receiver, sender, amount, message) {
    let hashed = hash(receiver, sender, message);

//    console.log(amount)

    onValue(ref(database, `userWallet/${receiver}/`), (snapshot) => {
        const receiverName = snapshot.val().name;
        const receiverkey = snapshot.val().key;
        const receiverData = snapshot.val().total;

        const currentTotal = receiverData + amount;

        set(ref(database, `userWallet/${receiver}/`), {
            name: receiverName,
            key: receiverkey,
            total: currentTotal
        })
    })
    onValue(ref(database, `userWallet/${sender}/`), (snapshot) => {
        const senderName = snapshot.val().name;
        const senderkey = snapshot.val().key;
        const senderData = snapshot.val().total;

        const currentTotal = senderData - amount;
        console.log(amount);
        set(ref(database, `userWallet/${sender}/`), {
            name: senderName,
            key: senderkey,
            total: currentTotal
        })
    })

    set(ref(database, `transactionHistory/${hashed}/`), {
        amount      : amount,
        receiver    : receiver,
        sender      : sender,
        message     : message
    })
    .then(() => {
        // Data saved successfully!
        console.log("create transaction successfully !");
    })
    .catch((error) => {
        // The write failed...
        console.log(error);
    });
}


// createUserWallet("dkesy-xf3ry-tkw7f-emm7s-2ydc7-a5bni-wvm2y-lk4h3-ojjnh-wuah5-qae", "Duc", 123456)
// createUserWallet("umjcv-bwcvj-5rbec-75wba-gjn6f-xbmux-ioeo2-docpe-4gk7v-serqx-uae", "Tu", 123456)
transaction("dkesy-xf3ry-tkw7f-emm7s-2ydc7-a5bni-wvm2y-lk4h3-ojjnh-wuah5-qae", "umjcv-bwcvj-5rbec-75wba-gjn6f-xbmux-ioeo2-docpe-4gk7v-serqx-uae", 50, "This is message");