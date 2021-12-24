// import { name } from "./index.js";
document.addEventListener("DOMContentLoaded", (e) => {
  // name();
  /*--------------------------------------------------------------------*/
  // INITIALIZING PAGE
  const emptyTaskInit = document.querySelector(".empty-task-template");
  /*--------------------------------------------------------------------*/
  // INIT FUNC
  const initialize = () => {
    for (let i = 0; i < 70; i++) {
      const div = document.createElement("div");
      emptyTaskInit.appendChild(div);
    }
  };
  initialize();
  /*--------------------------------------------------------------------*/
  // ELEMENTS
  const addTaskInput = document.getElementById("add-task-input");
  const addTaskForm = document.querySelector(".add-task-form2");
  const addTaskButton = document.getElementById("add-task-button");
  const addedTasks = document.querySelector(".added-tasks");
  const lists = document.querySelector(".added-list-child-container");
  const trashIcon = document.getElementById("trash-icon");
  const allTasks = document.querySelector("#all-tasks");
  const currentList = document.querySelector(".current-list");
  const searchInput = document.getElementById("search-bar");
  const deleteListTrashButton = document.getElementById("trash-lists");
  const deleteListModel = document.querySelector(".delete-list-container");
  const deleteListInput = document.getElementById("delete-list-input");
  const deleteListButton = document.getElementById("delete-list-button");
  const deleteListForm = document.querySelector(".delete-list-form");
  const currListStats = document.querySelector(".current-list-stats");
  const completeBtn = document.querySelector("#complete-icon");
  const completedTasks = document.getElementById("completed");
  const numCompleted = document.querySelector(".num-complete");
  /*--------------------------------------------------------------------*/
  // GLOBAL VARIABLES
  let listId;
  let taskId;
  const getNumTasks = () => {
    const numTasks = document.querySelectorAll(".pre-filled").length;
    document.querySelector(".num-tasks").innerHTML = numTasks;
  };
  getNumTasks();
  const getNumComplete = async () => {
    try {
      const res = await fetch("/api/tasks/complete");
      const data = await res.json();
      const numComplete = data.length;
      numCompleted.innerHTML = numComplete;

      if (!data.message) {
        return data;
      }
    } catch (e) {
      console.error(e);
    }
  };
  getNumComplete();
  const getNumCompleteInList = async () => {
    try {
      const res = await fetch(`/api/tasks/complete/${listId}`);
      const data = await res.json();
      const numComplete = data.length;
      numCompleted.innerHTML = numComplete;

      if (!data.message) {
        return data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  console.log("HELLO");
  /*--------------------------------------------------------------------*/
  // FUNCTIONS
  const fetchAllTasks = (data) => {
    data.forEach((task) => {
      const div = document.createElement("div");
      div.id = task.id;
      div.classList.add("pre-filled");
      const boiler = `<div class="filled" data-id=${task.id}><input type="checkbox" data-id=${task.id}><p data-id=${task.id}>${task.description}</p></div>`;
      div.innerHTML = boiler;
      addedTasks.appendChild(div);
      getNumTasks();
      getNumComplete();
    });
  };
  /*--------------------------------------------------------------------*/
  // SHOW ADD TASK BUTTON LISTENER
  addTaskInput.addEventListener("focus", (e) => {
    addTaskButton.classList.remove("hide-button");
  });
  /*--------------------------------------------------------------------*/
  // HIDE ADD TASK BUTTON
  document.addEventListener("click", (e) => {
    if (e.target !== addTaskInput) {
      addTaskButton.classList.add("hide-button");
    }
  });
  /*--------------------------------------------------------------------*/
  // RENDER TASKS FROM SELECTED LIST
  lists.addEventListener("click", async (e) => {
    listId = e.target.id;
    currentList.innerHTML = e.target.innerHTML;
    currListStats.innerHTML = `Stats for ${e.target.innerHTML} list`;
    const res = await fetch(`/api/lists/${listId}`);

    const data = await res.json();
    if (data.message !== "Failed") {
      addedTasks.innerHTML = "";
      fetchAllTasks(data);
      getNumTasks();
      getNumCompleteInList();
    }
    // } else {
    currentList.innerHTML = e.target.innerHTML;
    // }
  });
  /*--------------------------------------------------------------------*/
  /*--------------------------------------------------------------------*/
  // ADDING TASK TO PAGE AND DATABASE
  addTaskButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(addTaskForm);

    const description = formData.get("description");

    try {
      let body = { description };
      if (listId) {
        body = { description, listId };
      }
      console.log({ body });
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log({ res });
      if (!res.ok) {
        throw res;
      }

      const data = await res.json();
      console.log({ data });
      if (data.message === "Success") {
        const val = addTaskInput.value;
        const div = document.createElement("div");
        div.id = data.task.id;
        div.classList.add("pre-filled");
        const boiler = `<div class="filled" data-id=${data.task.id}><input type="checkbox" data-id=${data.task.id}><p data-id=${data.task.id}>${val}</p></div>`;
        div.innerHTML = boiler;
        addedTasks.appendChild(div);
        addTaskInput.value = "";
        addTaskInput.blur();
        getNumTasks();
        getNumCompleteInList();
      }
    } catch (e) {
      console.error(e);
    }
  });
  /*--------------------------------------------------------------------*/
  // SELECTING TASKS
  const detailCard = document.querySelector(".detail-card");
  const taskDetailsHead = document.querySelector(".edit");
  const taskName = document.querySelector(".task-name");
  const listName = document.querySelector(".list-drop-down");
  addedTasks.addEventListener("click", async (e) => {
    taskId = !e.target.id ? e.target.dataset.id : e.target.id;
    const taskDiv = document.getElementById(taskId);
    taskDiv.classList.toggle("selected");
    detailCard.classList.remove("detail-card-hidden");
    detailCard.classList.add("detail-card-active");
    /*--------------------------------------------------------------------*/
    // FETCHING TASK DETAILS
    try {
      const res = await fetch(`/api/tasks/${taskId}`);

      const data = await res.json();
      if (!data.message) {
        const selected = document.querySelectorAll(".selected");
        const editForm = document.querySelector(".edit-task");
        // const
        if (selected.length > 1) {
          taskDetailsHead.innerHTML = `${selected.length} tasks selected`;
          // editForm.disabled = "true";
          editForm.classList.add("detail-card-hidden");
          editForm.classList.remove("detail-form-active");
        } else if (selected.length === 1) {
          taskDetailsHead.innerHTML = `Edit Task Details`;
          editForm.classList.remove("detail-card-hidden");
          editForm.classList.add("detail-form-active");
          if (taskDiv.classList.contains("selected")) {
            // taskName.dataset.taskId = taskId;
            taskName.value = data.description;
            // listName.innerHTML = !data.List;
            // console.log(listName.children);
            if (data.List) {
              Array.from(listName.children).forEach((child) => {
                console.log(child);
                if (child.value == data.List.id) {
                  child.selected = "true";
                }
              });
            } else {
              document.getElementById("null").selected = "true";
            }
            // listName.options[listName.selectedIndex].selected = !data.List.id
            //   ? null
            //   : data.List.id;
            // console.log(data.List.id);
            // ? "This task does not belong to any lists"
            // : `List Name: ${data.List.name}`;
          } else {
            // editForm.classList.toggle("detail-card-hidden");

            try {
              const res = await fetch(`/api/tasks/${selected[0].id}`);
              const data = await res.json();
              taskName.value = data.description;
              if (data.list) {
                Array.from(listName.children).forEach((child) => {
                  console.log(child);
                  if (child.value == data.List.id) {
                    child.selected = "true";
                  }
                });
              } else {
                document.getElementById("null").selected = "true";
              }
              // listName.innerHTML = `List Name: ${data.List.name}`;
            } catch (e) {
              console.error(e);
            }
          }
        } else {
          // taskName.innerHTML = "";
          // listName.innerHTML = "";
          detailCard.classList.add("detail-card-hidden");
          detailCard.classList.remove("detail-card-active");
          editForm.classList.add("detail-card-hidden");
          editForm.classList.remove("detail-form-active");
        }
      }
    } catch (e) {
      console.error(e);
    }
  });
  const closeTaskCard = document.getElementById("close-task-detail");
  closeTaskCard.addEventListener("click", (e) => {
    detailCard.classList.add("detail-card-hidden");
    detailCard.classList.remove("detail-card-active");
    document
      .querySelectorAll(".selected")
      .forEach((child) => child.classList.remove("selected"));
  });
  /*--------------------------------------------------------------------*/
  // DELETING TASKS FROM DATABASE AND PAGE
  trashIcon.addEventListener("click", async (e) => {
    const tasks = document.querySelectorAll(".selected");
    const num = tasks.length;
    tasks.forEach(async (task) => {
      taskId = !task.id ? task.dataset.id : task.id;
      try {
        const res = await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });

        // if (!res.ok) throw res;
        const data = await res.json();
        if (data.message === "Destroyed") {
          addedTasks.removeChild(task);
          const taskName = document.querySelector(".task-name");
          const listName = document.querySelector(".list-drop-down");
          getNumTasks();
          getNumComplete();
          detailCard.classList.add("detail-card-hidden");
          detailCard.classList.remove("detail-card-active");
        }
      } catch (e) {
        console.error(e);
      }
    });
  });
  /*--------------------------------------------------------------------*/
  // FETCHING ALL TASKS
  allTasks.addEventListener("click", async (e) => {
    listId = undefined;
    currentList.innerHTML = "All Tasks";
    currListStats.innerHTML = "Stats for all tasks";
    try {
      const res = await fetch("/api/tasks");

      const data = await res.json();
      if (data.message !== "Failed") {
        addedTasks.innerHTML = "";
        getNumComplete();
        fetchAllTasks(data);
      }
    } catch (e) {
      console.error(e);
    }
  });
  searchInput.addEventListener("search", async (e) => {
    const val = searchInput.value;
    try {
      const res = await fetch(`/api/search/${val}`);
      const data = await res.json();
      if (!data.message) {
        currentList.innerHTML = "Search Results";
        addedTasks.innerHTML = "";
        fetchAllTasks(data);
      }
    } catch (e) {
      console.error(e);
    }
  });
  const addListButton = document.getElementById("add-list-button");
  const addListContainer = document.querySelector(".add-list-container");

  //Event listener to toggle add a list form
  addListButton.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    addListContainer.classList.toggle("hide-list-container");
  });

  //get add a list button
  // const addListButton = document.getElementById("add-list-button")
  const addListForm = document.querySelector(".add-list-form");

  const submitListButton = document.getElementById("submit-list-button");

  //get added lists div container
  const listContainer = document.querySelector(".added-list-child-container");

  //add list input
  const listInput = document.getElementById("add-list-input");

  const closeListAddModal = document.getElementById("close-add-list");
  const closeListDeleteModal = document.getElementById("close-delete-list");

  //Event lister to create list on click of add list button
  submitListButton.addEventListener("click", async (e) => {
    e.preventDefault();
    // e.stopPropagation()

    const formData = new FormData(addListForm);

    const name = formData.get("name");

    const body = { name };

    try {
      const res = await fetch("/api/lists", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!data.message) {
        const div = document.createElement("div");
        const option = document.createElement("option");
        div.id = data.id;
        option.value = data.id;
        div.classList.add("added-list-children");
        div.innerHTML = data.name;
        option.innerHTML = data.name;
        listContainer.appendChild(div);
        deleteListInput.appendChild(option);
        listInput.value = "";
        addListContainer.classList.toggle("hide-list-container");
      }
    } catch (e) {
      console.error(e);
    }
  });
  closeListAddModal.addEventListener("click", (e) => {
    addListContainer.classList.toggle("hide-list-container");
  });

  //--------------------------------------------------------------
  // Delete an existing list

  const deleteListContainer = async () => {
    deleteListModel.classList.toggle("hide-list-container");
    //const res = await fetch("/api/lists", {

    //})
  };
  const closeListDelete = () => {
    deleteListModel.classList.toggle("hide-list-container");
  };
  const deleteList = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const selected = deleteListInput.options[deleteListInput.selectedIndex];
    const id = selected.value;
    const res = await fetch(`/api/lists/${id}`, {
      method: "Delete",
    });
    const data = await res.json();
    if (data.message === "Destroyed") {
      deleteListInput.removeChild(selected);
      const children = document.querySelector(
        ".added-list-child-container"
      ).children;
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (child.id === id) {
          lists.removeChild(child);
        }
      }
    }
  };

  closeListDeleteModal.addEventListener("click", closeListDelete);
  deleteListButton.addEventListener("click", deleteList);
  deleteListTrashButton.addEventListener("click", deleteListContainer);

  completeBtn.addEventListener("click", (e) => {
    const tasks = document.querySelectorAll(".selected");
    tasks.forEach(async (task) => {
      taskId = !task.id ? task.dataset.id : task.id;
      try {
        const body = { completed: true };
        const res = await fetch(`/api/tasks/${taskId}`, {
          method: "PATCH",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (data.message === "Updated") {
          addedTasks.removeChild(task);
          getNumCompleteInList();
          detailCard.classList.add("detail-card-hidden");
          detailCard.classList.remove("detail-card-active");
          // const taskName = document.querySelector(".task-name");
          // const listName = document.querySelector(".list-drop-down");
          // const dueDate = document.querySelector(".due-date");
          // getNumTasks();
          // taskName.innerHTML = `${num} task(s) deleted`;
          // setTimeout(() => {
          //   taskName.innerHTML = ``;
          // }, 7000);
          // listName.innerHTML = "";
          // dueDate.innerHTML = "";
        }
      } catch (e) {
        console.error(e);
      }
    });
  });

  completedTasks.addEventListener("click", async (e) => {
    addedTasks.innerHTML = "";
    currentList.innerHTML = "Completed Tasks";
    getNumTasks();
    const data = await getNumComplete();
    fetchAllTasks(data);
  });

  const editTaskSubmit = document.querySelector("#edit-task-btn");

  editTaskSubmit.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log(taskName.value);
    const description = taskName.value;
    listId = listName.options[listName.selectedIndex].value;
    // console.log(newListId);
    console.log(taskId);
    try {
      const body = { description, listId };
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.message === "Updated") {
        try {
          const newRes = await fetch(`/api/tasks/`);

          const data = await newRes.json();

          if (!data.message) {
            addedTasks.innerHTML = "";
            fetchAllTasks(data);
            detailCard.classList.add("detail-card-hidden");
            detailCard.classList.remove("detail-card-active");
            currentList.innerHTML = "All Tasks";
            currListStats.innerHTML = "Stats for all tasks";
          }
        } catch (e) {
          console.error(e);
        }
        // addedTasks.removeChild(task);
        // getNumComplete();
        // const taskName = document.querySelector(".task-name");
        // const listName = document.querySelector(".list-drop-down");
        // const dueDate = document.querySelector(".due-date");
        // getNumTasks();
        // taskName.innerHTML = `${num} task(s) deleted`;
        // setTimeout(() => {
        //   taskName.innerHTML = ``;
        // }, 7000);
        // listName.innerHTML = "";
        // dueDate.innerHTML = "";
      }
    } catch (e) {
      console.error(e);
    }
  });
});
