// ------------import connections------------------------
import {database} from "../config.mjs";
import {
    set,
    ref,
    onValue
  } from "firebase/database";
// ------------------------------------------------------
// ------------export dependencies------------------------
export {generatePoll, generateRoom}
// ------------------------------------------------------


function generatePoll (principalId, roomId, imageLink, title, content) {
    set(ref(database, `voteRoom/${principalId}/` + roomId), {
        content : content,
        title   : title,
        voteImg : imageLink
    })
    .then(() => {
        // Data saved successfully!
        console.log("create voteRoom successfully !");
        
    })
    .catch((error) => {
        // The write failed...
        console.log(error);
    });
}

function generateRoom (roomId, awswer, question, principalId) {
    set(ref(database, `roomManager/${roomId}/"QuestionContainer"/` + question), {
        Question    : question
    })
    .then(() => {
        // Data saved successfully!
        console.log("create room successfully !");
        set(ref(database, `roomManager/${roomId}/${question}/${principalId}`), {
            Awswer : awswer
        })
    })
    .catch((error) => {
        // The write failed...
        console.log(error);
    });
}

// generatePoll("umjcv-bwcvj-5rbec-75wba-gjn6f-xbmux-ioeo2-docpe-4gk7v-serqx-uae", "HJK4KI", "ImageLink", "This is title", "This is content")
// generateRoom("HJK4KI", "This is answer 1", "This is question 1", "umjcv-bwcvj-5rbec-75wba-gjn6f-xbmux-ioeo2-docpe-4gk7v-serqx-uae");