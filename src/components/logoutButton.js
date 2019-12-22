import Component from '../component.js';
import store from '../../store/index.js';

export default class LogoutButton extends Component {
  constructor() {
    super(
      store,
      document.querySelector('.logout')
    ) 
  }
  render() {
    this.anchor.innerHTML = `
      <button class="logout-btn">Logout</button>
    `;

    this.anchor.querySelector('.logout-btn').addEventListener('click', () => {
      store.dispatch('logout', {
        redirect: 'login'
      })
    })
  }
}