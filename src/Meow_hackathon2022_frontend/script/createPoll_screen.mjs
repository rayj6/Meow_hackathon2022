const doneBtn = document.getElementById("create_vote_screen_done_button");
doneBtn.addEventListener("click", () => {
    location.href = "../screens/home.html"
})

const addContent = document.getElementById("create_vote_screen_content_input");
const addBtn = document.getElementById("create_vote_screen_list_of_options_add_button");
const addProps = document.getElementById("create_vote_screen_list_of_options_container");
addBtn.addEventListener("click", () => {
    addProps.innerHTML +=
    `
    <div id="create_vote_screen_list_of_options_1_container"> 
        <p id="create_vote_screen_list_of_options_1_text">${addContent.value}</p>
    </div>
    `
})