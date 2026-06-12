import { useState } from 'react'
import '../styles/Form.css'

export default function ScheduleForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    category: 'personal',
    reminder_enabled: false,
    reminder_minutes_before: 15,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.start_date || !formData.end_date) {
      alert('Please fill in required fields')
      return
    }

    const startDate = new Date(formData.start_date)
    const endDate = new Date(formData.end_date)
    if (startDate >= endDate) {
      alert('End date must be after start date')
      return
    }

    onSubmit({
      ...formData,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    })

    setFormData({
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      location: '',
      category: 'personal',
      reminder_enabled: false,
      reminder_minutes_before: 15,
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="title"
          placeholder="Schedule title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <input
            type="datetime-local"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="datetime-local"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <input
            type="text"
            name="location"
            placeholder="Location (optional)"
            value={formData.location}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="meeting">Meeting</option>
            <option value="birthday">Birthday</option>
            <option value="holiday">Holiday</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          className="form-textarea"
          rows="2"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="reminder_enabled"
              checked={formData.reminder_enabled}
              onChange={handleChange}
            />
            Enable reminder
          </label>
        </div>
        {formData.reminder_enabled && (
          <div className="form-group">
            <select
              name="reminder_minutes_before"
              value={formData.reminder_minutes_before}
              onChange={handleChange}
            >
              <option value="5">5 minutes before</option>
              <option value="15">15 minutes before</option>
              <option value="30">30 minutes before</option>
              <option value="60">1 hour before</option>
              <option value="1440">1 day before</option>
            </select>
          </div>
        )}
        <button type="submit" className="form-button">
          Add Schedule
        </button>
      </div>
    </form>
  )
}
