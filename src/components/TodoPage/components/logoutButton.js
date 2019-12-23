import Component from '../../../component.js';

export default class LogoutButton extends Component {
  constructor(store) {
    super(
      store,
      document.querySelector('.logout')
    )
    this.store = store; 
  }
  render() {
    this.anchor.innerHTML = `
      <button class="logout-btn">Logout</button>
    `;

    this.anchor.querySelector('.logout-btn').addEventListener('click', () => {
      this.store.dispatch('logout', {
        redirect: 'login'
      })
    })
  }
}