import Component from '../../../component.js';

export default class TasksCounter extends Component {
  constructor(store) {
    super(
      store,
      document.querySelector('.tasks-counter')
    )
    this.store = store;
  }
  render() {
    const completed = []
    const notCompleted = []
    this.store.state.todo.map((task) => {
      (task.completed == true) ? completed.push(task) : notCompleted.push(task)
    })
    this.anchor.innerHTML = `
      <div class="all-tasks counter">
        <span>All tasks: </span>
        <span>${this.store.state.todo.length}</span>
      </div>
        <div class="done-tasks counter">
        <span>Done: </span>
        <span>${completed.length}</span>
      </div>
      <div class="not-done-tasks counter">
        <span>Not done: </span>
        <span>${notCompleted.length}</span>
      </div>
    `;
  }
}