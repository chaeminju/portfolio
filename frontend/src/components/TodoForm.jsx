import { useState } from 'react'
import '../styles/Form.css'

export default function TodoForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert('Please enter a title')
      return
    }
    onSubmit(formData)
    setFormData({ title: '', description: '', priority: 'medium' })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="title"
          placeholder="What do you need to do?"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <textarea
            name="description"
            placeholder="Add details (optional)"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            rows="2"
          />
        </div>

        <div className="form-group">
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit" className="form-button">
          Add TODO
        </button>
      </div>
    </form>
  )
}
