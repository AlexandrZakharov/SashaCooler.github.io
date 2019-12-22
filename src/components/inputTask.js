import Component from '../component.js';
import store from '../../store/index.js';

export default class InputTask extends Component {
  constructor() {
    super(
      store,
      document.querySelector('.input-wrapper')
    ) 
  }
  render() {
    this.anchor.innerHTML = `
      <input type="text" required class="input-task" placeholder="Enter your task..">
      <button type="submit" class="input-btn">Add</button>
    `
    const input = this.anchor.querySelector('.input-task');
    const submit = this.anchor.querySelector('.input-btn')
    const handeClick = event => {
      // Пропускает только "Enter" и кнопку submit
      if(event.type === 'keyup' && event.keyCode !== 13) return;
      event.preventDefault();

      let value = input.value.trim();

      if(value.length > 5) {
        store.dispatch('addItem', value);
        input.focus();
        input.value = '';
      } else alert('To-do item should contain more then 5 characters')
    }
    submit.addEventListener('click', handeClick);
    input.addEventListener('keyup', handeClick);
  }
}