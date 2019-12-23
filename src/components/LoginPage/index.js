import Login from './components/Login.js';
import Component from '../../component.js';

export default class ToDoPage extends Component {
  constructor(app, settings, store) {
    const template = document.getElementById("login").content.cloneNode(true)
    app.append(template);
    super(store)
    this.login = new Login(store);
  }
  render() {
    this.login.render();
  }
}