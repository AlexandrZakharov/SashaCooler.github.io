import Component from '../../component.js';
import TaskList from './components/taskList.js'
import InputTask from './components/inputTask.js';
import LogoutButton from './components/logoutButton.js';
import FilterTasks from './components/filterTasks.js';
import TasksCounter from './components/tasksCounter.js';

export default class ToDoPage extends Component {
  constructor(app, settings, store) {
    const template = document.getElementById("list").content.cloneNode(true) 
    app.append(template);
    super(store)
    this.list = new TaskList(store);
    this.logoutButton = new LogoutButton(store);
    this.input = new InputTask(store);
    this.filterTasks = new FilterTasks(store);
    this.tasksCounter = new TasksCounter(store);
  }
  render() {
    this.logoutButton.render();
    this.input.render();
    this.list.render();
    this.filterTasks.render();
    this.tasksCounter.render();
  }
}