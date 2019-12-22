import Observer from './observer.js';
import link from '../src/link.js';
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkZjhhMzk1MmVhNzBjMDAxNjgyNmQ2MCIsImVtYWlsIjoiYWxleC56YWtoYXJvdjI4MDJAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkdmR0NVBpd2tWYXM0N25leThaNUJkdTZjYmlDcVJZSVJ2b0lKczZJV25Td1FUYi9kZEYzODYiLCJ1c2VybmFtZSI6ItCQ0LvQtdC60YHQsNC90LTRgCDQl9Cw0YXQsNGA0L7QsiIsIl9fdiI6MH0sImlhdCI6MTU3NjYwNDU5OH0.mDb7G93uNVIVTCIwaVp4IS3bEKNNDYzvzmiABWvziWk"

// import requests from '../requests.js';

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
      console.log('On Init data: ',data)
      this.state.todo = [...data];
      this.state.todo.reverse();
      console.log('State after reverse: ', this.state.todo)
      console.log('Data after reverse: ', data)
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
          console.log('STATE:', this.state)
          console.log('DATA:', data)
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
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
        });
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