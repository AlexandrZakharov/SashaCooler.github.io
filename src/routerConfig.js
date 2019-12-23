import TodoPage from './components/TodoPage/index.js';
import LoginPage from './components/LoginPage/index.js';
export default {
  'login': {
    data: { route: 'login' },
    url: 'login',
    component: LoginPage,
    settings: {
      redirect: 'list'
    },
  },
  'list': {
    data: { route: 'list' },
    url: 'list',
    component: TodoPage,
    settings: {
      redirect: 'login'
    },
  }
}

