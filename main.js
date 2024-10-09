// shows the current date on load
window.onload = function () {
    document.querySelector(".set-date-today").value = new Date()
        .toISOString()
        .substr(0, 10);
};

// list data
const listData = JSON.parse(localStorage.getItem("tasks")) || [];

//  function to render data on the page
function renderListData() {
    let htmlTaskList = "";

    listData.forEach((taskObject) => {
        const { name, date, isChecked } = taskObject;
        const html = `
        <input type="checkbox" class="check-task js-check-task" ${isChecked}>
                <div class="name-task">${name}</div>
                <div class="date-task">${date}</div>
                <button class="delete-task-btn js-delete-task-btn"><i class="fa-solid fa-trash"></i></button>
                `;
        htmlTaskList += html;
    });

    // Check if list is empty
    const emptyList = document.querySelector(".js-empty-list");
    htmlTaskList
        ? (emptyList.style.display = "none")
        : (emptyList.style.display = "initial");

    // add task object to the list
    document.querySelector(".list-container").innerHTML = htmlTaskList;

    // after we put the html on the page we can work with delete btn class
    document.querySelectorAll(".js-delete-task-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            listData.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(listData));
            renderListData();
        });
    });
    document.querySelectorAll(".js-check-task").forEach((check, index) => {
        check.addEventListener("click", () => {
            if (check.checked === true) {
                listData[index].isChecked = "checked";
            } else {
                listData[index].isChecked = "";
            }
            localStorage.setItem("tasks", JSON.stringify(listData));
        });
    });
}

renderListData();

document.querySelector(".js-add-task-btn").addEventListener("click", () => {
    addTask();
});

function addTask() {
    const nameInput = document.querySelector(".name-input");
    const dateInput = document.querySelector(".date-input");
    const name = nameInput.value;
    const date = dateInput.value;

    if (name === "" || date === "") {
        return;
    } else {
        listData.unshift({
            name,
            date,
        });
    }

    localStorage.setItem("tasks", JSON.stringify(listData));

    renderListData();

    nameInput.value = "";
}
