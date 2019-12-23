import Component from '../../../component.js';

export default class FilterTasks extends Component {
  constructor(store) {
    super(
      store,
      document.querySelector('.item-filter')
    )
    this.store = store; 
  }
  render() {
    this.anchor.innerHTML = `
      <select id="select">
        ${
          (this.store.state.filter.map((flt) => {
            return (
              `<option id="${flt}">${flt}</option>`
            )
          }))
        }
      </select>
    `
    let select = this.anchor.querySelector('#select')
    select.addEventListener('change', () => {
      this.store.dispatch('filter', select.value)
    })  
  }
}