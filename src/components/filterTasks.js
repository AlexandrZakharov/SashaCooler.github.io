import Component from '../component.js';
import store from '../../store/index.js';

export default class FilterTasks extends Component {
  constructor() {
    super(
      store,
      document.querySelector('.item-filter')
    ) 
  }
  render() {
    this.anchor.innerHTML = `
      <select id="select">
        ${
          (store.state.filter.map((flt) => {
            return (
              `<option id="${flt}">${flt}</option>`
            )
          }))
        }
      </select>
    `
    this.anchor.querySelector('#select').addEventListener('change', function () {
      console.log(this.value)
      store.dispatch('filter', this.value)
    })  
  }
}