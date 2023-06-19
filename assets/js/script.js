var Task = /** @class */ (function () {
    function Task(description) {
        this.description = description;
        this.id = Math.floor(Math.random() * 1001);
        this.description = description;
        this.isCompleted = false;
    }
    return Task;
}());
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = [];
    }
    TaskManager.prototype.addTask = function (description) {
        this.tasks.push(new Task(description));
    };
    TaskManager.prototype.deleteTask = function (id) {
        var indexToDelete = this.tasks.findIndex(function (task) { return task.id == id; });
        this.tasks.splice(indexToDelete, 1);
    };
    TaskManager.prototype.updateTaskDescription = function (id, newDescription) {
        var indexToUpdate = this.tasks.findIndex(function (task) { return task.id == id; });
        this.tasks[indexToUpdate].description = newDescription;
    };
    TaskManager.prototype.completeTask = function (id) {
        var indexToComplete = this.tasks.findIndex(function (task) { return task.id == id; });
        this.tasks[indexToComplete].isCompleted = true;
    };
    return TaskManager;
}());
function addTask() {
    var inputTask = document.getElementById("newTask").value;
    manager.addTask(inputTask);
    document.getElementById("newTask").value = "";
    showAllTasks();
}
function showAllTasks() {
    document.getElementById("active").innerHTML = "";
    document.getElementById("completed").innerHTML = "";
    for (var _i = 0, _a = manager.tasks; _i < _a.length; _i++) {
        var task = _a[_i];
        if (task.isCompleted == false) {
            document.getElementById("active").innerHTML += "\n            <div class=\"container d-flex justify-content-center\"><li class=\"list-group-item d-inline-block w-50 mt-2\">".concat(task.description, "</li><span><button class=\"btn btn-success mt-2 mx-2\" onclick=\"completeTask(").concat(task.id, ")\"><i class=\"fa-solid fa-check fa-lg\"></i></button><button class=\"btn btn-primary mt-2 mx-2\" onclick=\"editTask(").concat(task.id, ")\"><i class=\"fa-solid fa-pen fa-lg\"></i></button><button class=\"btn btn-danger mt-2 mx-2\" onclick=\"deleteTask(").concat(task.id, ")\"><i class=\"fa-solid fa-trash-can fa-lg\"></i></button></span></div>");
        }
        else {
            document.getElementById("completed").innerHTML += "\n            <div class=\"container d-flex justify-content-center\"><li class=\"list-group-item d-inline-block w-50 mt-2 text-decoration-line-through\">".concat(task.description, "</li><span><button class=\"btn btn-success mt-2 mx-2\" disabled><i class=\"fa-solid fa-check-double fa-lg\"></i></button><button class=\"btn btn-primary mt-2 mx-2\" disabled><i class=\"fa-solid fa-pen fa-lg\"></i></button><button class=\"btn btn-danger mt-2 mx-2\" disabled><i class=\"fa-solid fa-trash-can fa-lg\"></i></button></span></div>");
        }
    }
}
function completeTask(id) {
    manager.completeTask(id);
    showAllTasks();
}
function editTask(id) {
    var newDesc = prompt("Please enter a new description: ");
    if (newDesc != null && newDesc != "") {
        manager.updateTaskDescription(id, newDesc);
        showAllTasks();
    }
    else
        alert("Entered Something Wrong !");
}
function deleteTask(id) {
    if (confirm("Are you sure you want to DELETE?") == true) {
        manager.deleteTask(id);
        showAllTasks();
    }
}
var manager = new TaskManager();
console.log(manager.tasks);
