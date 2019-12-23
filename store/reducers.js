export default function createReducers() {
  return {
    removeItem: (payload, state) => ({
      ...state,
      todo: [
        ...state.todo.filter(task => task._id != payload.id)
      ]
    }),
    checkItem: (payload, state) => {
      return {
        ...state,
        todo: [
          ...state.todo.map((task) => {
            if(task._id == payload.id) {
              task.completed = !task.completed
              return task
            } else return task
          })
        ],
        filter: [
          ...state.filter
        ]
      }
    },
    editTask: (payload, state) => {
      return {
        ...state,
        todo: [
          ...state.todo.map(task => {
            if(task._id == payload.id) {
              task.text = payload.text
              return task
            } else return task
          })
        ]
      }
    },
    filter: (payload, state) => {
      return {
        ...state,
        todo: [
          ...state.todo
        ],
        filter: [
          payload,
          ...state.filter.filter((flt) => flt !== payload)
        ]
      }
    },
    login: (payload, state) => ({
      ...state,
      userInfo: {
        authorized: true,
        ...payload,
      }
    }),
    logout: (payload, state) => ({
      ...state,
      todo: [],
      userInfo: {}
    }),
  }
}

