import Component from '../../../component.js';

export default class Login extends Component {
  constructor(store) {
    super(
      store, 
      document.querySelector('.login-wrapper')
    );
    this.store = store;
  }
  render() {
    this.anchor.innerHTML = `
      <i class="fas fa-at"></i>
      <input type="email" class="" id="email" name="email" placeholder="Email" required>
      <i class="fas fa-lock"></i>
      <input type="password" class="" id="password" name="password" placeholder="Password" required>
      <button id="signIn">Login</button>
    `
    this.anchor.querySelector('#signIn').addEventListener('click', () => {
      let email = this.anchor.querySelector('#email').value;
      let password = this.anchor.querySelector('#password').value;
      this.store.dispatch('login', {
        email: email,
        password: password,
        redirect: 'list'
      })
    })
  }
}