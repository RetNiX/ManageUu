class Task {
    public id : number;
    public isCompleted : boolean;

    constructor(public description : string) {
        this.id = Math.floor(Math.random() * 1001);
        this.description = description;
        this.isCompleted = false;
    }
/*     getTask(propName : number | string) : number | string {
        return this.task[propName];
    }
    setTask(propName: number | string, value : number | string) : void {
        this.task[propName] = value;
    } */
}
class TaskManager {
    public tasks: Task[];

    constructor(){
        this.tasks = [];
    }

    addTask(description : string) : void {
        this.tasks.push(new Task(description));
    }
    
    deleteTask(id : number) : void {
        let indexToDelete = this.tasks.findIndex((task : Task) => task.id == id);
        this.tasks.splice(indexToDelete, 1);
    }

    updateTaskDescription(id : number, newDescription : string) : void {
        let indexToUpdate = this.tasks.findIndex((task : Task) => task.id == id);
        this.tasks[indexToUpdate].description = newDescription;
    }

    completeTask(id : number) : void{
        let indexToComplete = this.tasks.findIndex((task : Task) => task.id == id);
        this.tasks[indexToComplete].isCompleted = true;
    }
}

function addTask() : void {
    let inputTask = (document.getElementById("newTask") as HTMLInputElement).value;
    manager.addTask(inputTask);
    (document.getElementById("newTask") as HTMLInputElement).value = "";
    showAllTasks();
}
function showAllTasks() : void {
    document.getElementById("active")!.innerHTML = "";
    document.getElementById("completed")!.innerHTML = "";
    for (let task of manager.tasks) {
        if(task.isCompleted == false) {
            document.getElementById("active")!.innerHTML += `
            <div class="container d-flex justify-content-center"><li class="list-group-item d-inline-block w-50 mt-2">${task.description}</li><span><button class="btn btn-success mt-2 mx-2" onclick="completeTask(${task.id})"><i class="fa-solid fa-check fa-lg"></i></button><button class="btn btn-primary mt-2 mx-2" onclick="editTask(${task.id})"><i class="fa-solid fa-pen fa-lg"></i></button><button class="btn btn-danger mt-2 mx-2" onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash-can fa-lg"></i></button></span></div>`;
        }
        else {
            document.getElementById("completed")!.innerHTML += `
            <div class="container d-flex justify-content-center"><li class="list-group-item d-inline-block w-50 mt-2 text-decoration-line-through">${task.description}</li><span><button class="btn btn-success mt-2 mx-2" disabled><i class="fa-solid fa-check-double fa-lg"></i></button><button class="btn btn-primary mt-2 mx-2" disabled><i class="fa-solid fa-pen fa-lg"></i></button><button class="btn btn-danger mt-2 mx-2" disabled><i class="fa-solid fa-trash-can fa-lg"></i></button></span></div>`;
        }
    }
}
function completeTask(id : number) : void {
    manager.completeTask(id);
    showAllTasks();
}
function editTask(id : number) : void {
    let newDesc = prompt("Please enter a new description: ");
    if (newDesc != null && newDesc != "") {
        manager.updateTaskDescription(id,newDesc!);
        showAllTasks();
    }
    else alert("Entered Something Wrong !");
}
function deleteTask(id : number) : void {
    if (confirm("Are you sure you want to DELETE?") == true) {
        manager.deleteTask(id);
        showAllTasks();
    }
}
let manager = new TaskManager();
console.log(manager.tasks);