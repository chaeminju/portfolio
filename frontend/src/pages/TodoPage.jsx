import { useState, useEffect } from 'react'
import { todoAPI } from '../api'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import '../styles/Page.css'

export default function TodoPage() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTodos()
  }, [filter])

  const fetchTodos = async () => {
    setLoading(true)
    setError(null)
    try {
      const completed = filter === 'all' ? null : filter === 'completed'
      const response = await todoAPI.getAll(0, 100, completed)
      setTodos(response.data)
    } catch (err) {
      setError('Failed to load todos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTodo = async (data) => {
    try {
      const response = await todoAPI.create(data)
      setTodos([response.data, ...todos])
    } catch (err) {
      setError('Failed to create todo')
      console.error(err)
    }
  }

  const handleUpdateTodo = async (id, data) => {
    try {
      const response = await todoAPI.update(id, data)
      setTodos(todos.map(todo => todo.id === id ? response.data : todo))
    } catch (err) {
      setError('Failed to update todo')
      console.error(err)
    }
  }

  const handleDeleteTodo = async (id) => {
    try {
      await todoAPI.delete(id)
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (err) {
      setError('Failed to delete todo')
      console.error(err)
    }
  }

  return (
    <div className="page-container">
      <h1>📝 My TODO List</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <TodoForm onSubmit={handleAddTodo} />
      
      <div className="filter-buttons">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <TodoList
          todos={todos}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />
      )}
    </div>
  )
}
