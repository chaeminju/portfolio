import { useState } from 'react'
import ScheduleItem from './ScheduleItem'
import '../styles/List.css'

export default function ScheduleList({ schedules, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null)

  if (schedules.length === 0) {
    return <div className="empty-message">No schedules yet. Create one to get started!</div>
  }

  const sortedSchedules = [...schedules].sort((a, b) => 
    new Date(a.start_date) - new Date(b.start_date)
  )

  return (
    <div className="list-container">
      {sortedSchedules.map(schedule => (
        <ScheduleItem
          key={schedule.id}
          schedule={schedule}
          isEditing={editingId === schedule.id}
          onEdit={() => setEditingId(schedule.id)}
          onSave={(data) => {
            onUpdate(schedule.id, data)
            setEditingId(null)
          }}
          onCancel={() => setEditingId(null)}
          onDelete={() => onDelete(schedule.id)}
        />
      ))}
    </div>
  )
}
