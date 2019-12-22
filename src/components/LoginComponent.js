// Сделать чтобы store брался не на прямую, а через props;
//1uxfk3f3l13
import Component from '../component.js';
import store from '../../store/index.js';

export default class LoginComponent extends Component {
  constructor(app, settings) {
    const template = document.getElementById("login").content.cloneNode(true)
    app.append(template);
    super(
      store, 
      document.querySelector('.login-wrapper')
    );

  }
  render() {
    this.anchor.innerHTML = `
      <i class="fas fa-at"></i>
      <input type="email" class="" id="email" name="email" placeholder="Email" required>
      <i class="fas fa-lock"></i>
      <input type="text" class="" id="password" name="password" placeholder="Password" required>
      <button id="signIn">Login</button>
    `
    this.anchor.querySelector('#signIn').addEventListener('click', () => {
      let email = app.querySelector('#email').value;
      let password = app.querySelector('#password').value;
      store.dispatch('login', {
        email: email,
        password: password,
        redirect: 'list'
      })
    })
  }
}