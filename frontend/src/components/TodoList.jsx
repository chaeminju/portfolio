import { useState } from 'react'
import TodoItem from './TodoItem'
import '../styles/List.css'

export default function TodoList({ todos, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null)

  if (todos.length === 0) {
    return <div className="empty-message">No todos yet. Create one to get started!</div>
  }

  return (
    <div className="list-container">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingId === todo.id}
          onEdit={() => setEditingId(todo.id)}
          onSave={(data) => {
            onUpdate(todo.id, data)
            setEditingId(null)
          }}
          onCancel={() => setEditingId(null)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </div>
  )
}
