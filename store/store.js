import Observer from './observer.js';
import link from '../src/link.js';

export default class Store {
  constructor(reducers) {
    this.reducers = reducers;
    this.state = {
      todo: [],
      userInfo: {},
      filter: ['All', 'Done', 'Not done']
    }
    this.events = new Observer();
  }

  onInitState(redirect) {
    fetch('https://todo-app-back.herokuapp.com/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.userInfo.token
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.state.todo = [...data];
      this.state.todo.reverse();
      if(redirect) link(redirect)
    })
  }

  dispatch(actionType, payload) {
    if(this.reducers[actionType]) {
      this.state = this.reducers[actionType](payload, this.state);
      this.events.next('change', this.state);
    }
    switch (actionType) {
      case "addItem":
        fetch("https://todo-app-back.herokuapp.com/todos", {
          method: "POST",
          body: JSON.stringify({
            text: payload
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: this.state.userInfo.token
          }
        })
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.state.todo.unshift(data);
          this.events.next('change', this.state);
        });
        break;
      case "removeItem":
        fetch(`https://todo-app-back.herokuapp.com/todos/${payload.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.state.userInfo.token
          }
        })
        break;
      case "checkItem":
        fetch(`https://todo-app-back.herokuapp.com/todos/${payload.id}`, {
          method: "PUT",
          body: JSON.stringify({
            completed: !payload.completed
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: this.state.userInfo.token
          }
        });
        break;
      case "editTask":
        fetch(`https://todo-app-back.herokuapp.com/todos/${payload.id}`, {
          method: "PUT",
          body: JSON.stringify({
            text: payload.text
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: this.state.userInfo.token
          }
        });
        break;
      case "login":
        fetch("https://todo-app-back.herokuapp.com/login", {
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if(!data.error) {
            this.state.userInfo.token = data.token;
            this.onInitState(payload.redirect)
          } else {
            alert('Wrong e-mail or password!')
          }
        })
        break;
      case 'logout':
        link(payload.redirect)
        break
      default:
        break
    }
  }     
}