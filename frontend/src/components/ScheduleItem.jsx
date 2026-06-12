import { useState } from 'react'
import '../styles/Item.css'

export default function ScheduleItem({
  schedule,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) {
  const [editData, setEditData] = useState({
    title: schedule.title,
    description: schedule.description || '',
    start_date: formatDateTimeLocal(schedule.start_date),
    end_date: formatDateTimeLocal(schedule.end_date),
    location: schedule.location || '',
    category: schedule.category || 'personal',
    reminder_enabled: schedule.reminder_enabled,
    reminder_minutes_before: schedule.reminder_minutes_before,
  })

  function formatDateTimeLocal(dateString) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSave = () => {
    if (!editData.title.trim() || !editData.start_date || !editData.end_date) {
      alert('Please fill in required fields')
      return
    }

    const startDate = new Date(editData.start_date)
    const endDate = new Date(editData.end_date)
    if (startDate >= endDate) {
      alert('End date must be after start date')
      return
    }

    onSave({
      ...editData,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    })
  }

  const getCategoryColor = (category) => {
    const colors = {
      work: '#3498db',
      personal: '#9b59b6',
      meeting: '#e74c3c',
      birthday: '#f39c12',
      holiday: '#1abc9c',
    }
    return colors[category] || '#95a5a6'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
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
          <div className="edit-controls">
            <input
              type="datetime-local"
              name="start_date"
              value={editData.start_date}
              onChange={handleChange}
            />
            <input
              type="datetime-local"
              name="end_date"
              value={editData.end_date}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={editData.location}
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
              name="category"
              value={editData.category}
              onChange={handleChange}
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="meeting">Meeting</option>
              <option value="birthday">Birthday</option>
              <option value="holiday">Holiday</option>
            </select>
            <label>
              <input
                type="checkbox"
                name="reminder_enabled"
                checked={editData.reminder_enabled}
                onChange={handleChange}
              />
              Reminder
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
    <div className="item schedule-item">
      <div className="item-body">
        <div className="item-title">{schedule.title}</div>
        <div className="item-meta">
          <span
            className="category-badge"
            style={{ backgroundColor: getCategoryColor(schedule.category) }}
          >
            {schedule.category}
          </span>
          <span className="item-date">
            {formatDate(schedule.start_date)} - {formatDate(schedule.end_date)}
          </span>
        </div>
        {schedule.location && <div className="item-location">📍 {schedule.location}</div>}
        {schedule.description && <div className="item-description">{schedule.description}</div>}
        {schedule.reminder_enabled && (
          <div className="item-reminder">
            🔔 Reminder: {schedule.reminder_minutes_before} minutes before
          </div>
        )}
      </div>
      <div className="item-actions">
        <button onClick={onEdit} className="btn-edit">Edit</button>
        <button onClick={onDelete} className="btn-delete">Delete</button>
      </div>
    </div>
  )
}
