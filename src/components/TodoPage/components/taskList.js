import Component from '../../../component.js';

export default class TaskList extends Component {
  constructor(store) {
    super(
      store, 
      document.querySelector('.task-list')
    );
    this.store = store;

  }
  render() {
    if(this.store.state.todo.length === 0) {
      this.anchor.innerHTML = `No todo's`;
      return
    }
    this.anchor.innerHTML = `
      <ul>
        ${
          this.store.state.todo.map(todoItem => {
            if(this.store.state.filter[0] == 'Done' && !todoItem.completed) {
              return;
            }
            else if(this.store.state.filter[0] == 'Not done' && todoItem.completed) {
              return
            }
            let LINE = todoItem.completed ? 'textChecked': '';
            let STATUS = todoItem.completed ? 'iconChecked': '';
            return(
            `<li class="item-wrapper" id="${todoItem._id}" completed="${todoItem.completed}"> 
              <i class="fa fa-check-circle ${STATUS}"></i> 
              <span class="${LINE}">${todoItem.text}</span> 
              <i class="fas fa-trash-alt"></i> 
            </li>`)}).join('')   
        }
      </ul>
    `;

    this.anchor.querySelectorAll('.item-wrapper').forEach((task) => {
      task.querySelector('.fa-trash-alt').addEventListener('click', () => {
        this.store.dispatch('removeItem', {
          id: task.id
        })
      })
      task.querySelector('.fa-check-circle').addEventListener('click', () => {
        this.store.dispatch('checkItem', {
          id: task.id,
          completed: JSON.parse(task.getAttribute("completed"))
        })
      })
      let span = task.querySelector('span');
      span.addEventListener('click', () => {
        let taskText = span.innerText;
        let input = document.createElement('input')
        input.value = taskText;
        input.type = "text";
        input.className = 'edit-task';
        span.replaceWith(input)
        input.focus()
        input.onblur = () => {
          input.replaceWith(span)
        }
        input.addEventListener('keyup', (event) => {
          if(event.keyCode == 13) {
            this.store.dispatch('editTask', {
              id: task.id,
              text: input.value
            })
          }
        })
      })
    })
  }
}