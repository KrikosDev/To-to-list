import {
  makeObservable,
  observable,
  action,
  computed,
  makeAutoObservable,
} from 'mobx'

class SelectedTodos {
  todos = []
  constructor() {
    makeAutoObservable(this)
  }

  addTodo = (todo) => {
    let tested = true

    this.todos.map((item) => {
      if (item._id === todo._id) {
        tested = false
      }
    })
    if (tested) {
      this.todos = [...this.todos, todo]
    }
  }

  deleteTodo = (todo) => {
    const testTodos = this.todos.filter((item) => {
      if (item._id !== todo._id) return item
    })
    this.todos = [...testTodos]
  }
}

const selectedTodos = new SelectedTodos()

export { selectedTodos }
