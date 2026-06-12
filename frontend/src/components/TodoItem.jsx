import { useState } from 'react'
import '../styles/Item.css'

export default function TodoItem({
  todo,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) {
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority,
    completed: todo.completed,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSave = () => {
    if (!editData.title.trim()) {
      alert('Title cannot be empty')
      return
    }
    onSave(editData)
  }

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#28a745',
      medium: '#ffc107',
      high: '#dc3545',
    }
    return colors[priority] || '#6c757d'
  }

  if (isEditing) {
    return (
      <div className="item edit-mode">
        <div className="item-body">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="edit-input"
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
            className="edit-textarea"
            rows="2"
          />
          <div className="edit-controls">
            <select
              name="priority"
              value={editData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <label>
              <input
                type="checkbox"
                name="completed"
                checked={editData.completed}
                onChange={handleChange}
              />
              Completed
            </label>
          </div>
          <div className="item-actions">
            <button onClick={handleSave} className="btn-save">Save</button>
            <button onClick={onCancel} className="btn-cancel">Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`item ${todo.completed ? 'completed' : ''}`}>
      <div className="item-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onSave({ ...editData, completed: e.target.checked })}
        />
      </div>
      <div className="item-body">
        <div className="item-title">{todo.title}</div>
        {todo.description && <div className="item-description">{todo.description}</div>}
        <div className="item-meta">
          <span
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(todo.priority) }}
          >
            {todo.priority}
          </span>
          <span className="item-date">
            {new Date(todo.created_at).toLocaleDateString('en-US')}
          </span>
        </div>
      </div>
      <div className="item-actions">
        <button onClick={onEdit} className="btn-edit">Edit</button>
        <button onClick={onDelete} className="btn-delete">Delete</button>
      </div>
    </div>
  )
}
