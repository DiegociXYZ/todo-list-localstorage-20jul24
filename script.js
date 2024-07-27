//initial references
const newTaskInput = document.querySelector("#new-task input");
const taskDiv= document.querySelector("#task");
let deleteTasks, editTasks,tasks;
let updateNote="";
let count;

//function on window load
window.onload = () => {
  updateNote ="";
  count = Object.keys(localStorage).length;
  displayTask();
}
//Function to Display task
const displayTasks= () => {
  if (Object.keys(localStorage).length > 0){
    tasksDiv.style.display = "inline-block";
  } else {
    tasksDiv.style.display = "none";
  }
  //clear the tasks
  tasksDiv.innerHTML ="";
  //fetch all the keys in local storage
  let tasks = Object.keys(localStorage);
  tasks = tasks.sort();
  for (let key of tasks){
    let classValue = localStorage.getItem(key);
    let taskInnerDiv = document.createElement("div");
    taskInnerDiv.classList.add(task);
    taskInnerDiv.setAttribute("id" , key);
    taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;
    //localStorage would store boolean as string so we parse in to boolean back
    let editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.innerHTML = `<ion-icon name="create"</ion-icon>`;
    if(!JSON.parse(value)){
      editButton.style.visibility="visible";
    }else{
      editButton.style.visibility ="hidden";
      taskInnerDiv.classList.add("completed");
    }
    taskInnerDiv.appendChild(editButton);
    taskInnerDiv.innerHTML += `<button class="delete"><ion-icon name="trash"></ion-icon></button>`;
    task.appendChild(taskInnerDiv);
  }
  //task completed
  tasks=document.querySelectorAll(".task");
  tasks.forEach((element , index) =>{
    element.onclick =() => {
      //local storage update
      if(element.classList.contains("completed")){
        updateStorage(element.id.split("_")[0], element.innerText, false);
      }else {
        updateStorage(element.id.split("_")[0], element.innerText, true);

      }
    };
  } );
//Edit Task

editTasks= document.getElementsByClassName("edit");
Array.from(editTasks).forEach((element, index) => {
  element.addEventListener("click", (e) => {
    //stop propagation on outer elements( if removed when we click delete eventually rhw click will move to parent)
    e.stopPropagation();
    //disable other edit buttons when one task is being edited
    disableButtons(true);
    //update input value and remove div
    let parent = element.parentElement;
    newTaskInput.value = parent.querySelector("taskname").innerText;
  })
})

}