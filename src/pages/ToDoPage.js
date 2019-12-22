import Component from '../component.js';
import store from '../../store/index.js';
import ListComponent from '../components/taskList.js';
import InputTask from '../components/inputTask.js';
import LogoutButton from '../components/logoutButton.js';
import FilterTasks from '../components/filterTasks.js';
import TasksCounter from '../components/tasksCounter.js';

export default class ToDoPage extends Component {
  constructor(app, settings) {
    const template = document.getElementById("list").content.cloneNode(true) 
    app.append(template);
    super(store)
    this.list = new ListComponent();
    this.logoutButton = new LogoutButton();
    this.input = new InputTask();
    this.filterTasks = new FilterTasks();
    this.tasksCounter = new TasksCounter();
  }
  render() {
    this.logoutButton.render();
    this.input.render();
    this.list.render();
    this.filterTasks.render();
    this.tasksCounter.render();
  }
}