// Сделать чтобы store брался не на прямую, а через props;

import Component from '../component.js';
import store from '../../store/index.js';

export default class ListComponent extends Component {
  constructor() {
    super(
      store, 
      document.querySelector('.root')
    );

  }
  render() {
    if(store.state.todo.length === 0) {
      this.anchor.innerHTML = `No todo's`;
      return
    }
    this.anchor.innerHTML = `
      <ul>
        ${
          store.state.todo.map(todoItem => {
            if(store.state.filter[0] == 'Done' && !todoItem.completed) {
              return;
            }
            else if(store.state.filter[0] == 'Not done' && todoItem.completed) {
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
        store.dispatch('removeItem', {
          id: task.id
        })
      })
      task.querySelector('.fa-check-circle').addEventListener('click', () => {
        store.dispatch('checkItem', {
          id: task.id,
          completed: JSON.parse(task.getAttribute("completed"))
        })
      })
      task.querySelector('span').addEventListener('click', function() {
        let taskText = this.innerText;
        let input = document.createElement('input')
        input.value = taskText;
        input.type = "text";
        input.className = 'edit-task';
        this.replaceWith(input)
        input.focus()
        input.onblur = () => {
          input.replaceWith(this)
        }
        input.addEventListener('keyup', (event) => {
          if(event.keyCode == 13) {
            store.dispatch('editTask', {
              id: task.id,
              text: input.value
            })
          }
        })
      })
    })
  }
}