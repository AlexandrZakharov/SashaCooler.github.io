import Component from '../../../component.js';

export default class InputTask extends Component {
  constructor(store) {
    super(
      store,
      document.querySelector('.input-wrapper')
    )
    this.store = store; 
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
        this.store.dispatch('addItem', value);
        input.focus();
        input.value = '';
      } else alert('Task text must contain at least 5 characters')
    }
    submit.addEventListener('click', handeClick);
    input.addEventListener('keyup', handeClick);
  }
}