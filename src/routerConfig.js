import ToDoPage from './pages/ToDoPage.js';
import LoginComponent from './components/LoginComponent.js';
export default {
  'login': {
    data: { route: 'login' },
    url: 'login',
    component: LoginComponent,
    settings: {
      redirect: 'list'
    },
  },
  'list': {
    data: { route: 'list' },
    url: 'list',
    component: ToDoPage,
    settings: {
      redirect: 'login'
    },
  }
}

