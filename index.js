const fs = require('fs');
const path = require('path');
const readline = require('readline');

const dataFilePath = path.join(__dirname, 'tasks.json');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function loadTasks() {
  try {
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  } catch (err) {
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2));
}

function addTask() {
  rl.question('Enter the task description: ', (description) => {
    const tasks = loadTasks();
    tasks.push({ id: Date.now(), description, completed: false });
    saveTasks(tasks);
    console.log('Task added successfully!');
    rl.close();
  });
}

function viewTasks() {
  const tasks = loadTasks();
  console.log('Tasks:');
  tasks.forEach((task) => {
    console.log(`- [${task.completed ? 'x' : ' '}] ${task.description}`);
  });
}

function markTaskComplete() {
  rl.question('Enter the task ID to mark as complete: ', (id) => {
    const tasks = loadTasks();
    const task = tasks.find((task) => task.id === parseInt(id));
    if (task) {
      task.completed = true;
      saveTasks(tasks);
      console.log('Task marked as complete.');
    } else {
      console.log('Task not found.');
    }
    rl.close();
  });
}

function removeTask() {
  rl.question('Enter the task ID to remove: ', (id) => {
    const tasks = loadTasks();
    const index = tasks.findIndex((task) => task.id === parseInt(id));
    if (index !== -1) {
      tasks.splice(index, 1);
      saveTasks(tasks);
      console.log('Task removed successfully.');
    } else {
      console.log('Task not found.');
    }
    rl.close();
  });
}

// // Usage
// // addTask();
// viewTasks();
markTaskComplete();
// removeTask();