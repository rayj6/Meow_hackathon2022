// ------------import connections------------------------
import {database} from "./config.mjs";
import {
    set,
    ref,
    onValue
  } from "../../../node_modules/firebase/database";
// ------------------------------------------------------
// ----------------export function----------------------
export {fetchUserAmount};
// -----------------------------------------------------


let userData = 0;
function fetchUserAmount (u) {
    onValue(ref(database, `userWallet/${u}/`), (snapshot) => {
        const data = snapshot.val();
        
        userData = data.total;
        return userData;
    })
}
fetchUserAmount("dkesy-xf3ry-tkw7f-emm7s-2ydc7-a5bni-wvm2y-lk4h3-ojjnh-wuah5-qae");
console.log(userData);