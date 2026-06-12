import { useState, useEffect } from 'react'
import { scheduleAPI } from '../api'
import ScheduleForm from '../components/ScheduleForm'
import ScheduleList from '../components/ScheduleList'
import '../styles/Page.css'

export default function SchedulePage() {
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSchedules()
  }, [])

  const fetchSchedules = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await scheduleAPI.getAll(0, 100)
      setSchedules(response.data)
    } catch (err) {
      setError('Failed to load schedules')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSchedule = async (data) => {
    try {
      const response = await scheduleAPI.create(data)
      setSchedules([response.data, ...schedules])
    } catch (err) {
      setError('Failed to create schedule')
      console.error(err)
    }
  }

  const handleUpdateSchedule = async (id, data) => {
    try {
      const response = await scheduleAPI.update(id, data)
      setSchedules(schedules.map(schedule => schedule.id === id ? response.data : schedule))
    } catch (err) {
      setError('Failed to update schedule')
      console.error(err)
    }
  }

  const handleDeleteSchedule = async (id) => {
    try {
      await scheduleAPI.delete(id)
      setSchedules(schedules.filter(schedule => schedule.id !== id))
    } catch (err) {
      setError('Failed to delete schedule')
      console.error(err)
    }
  }

  return (
    <div className="page-container">
      <h1>📅 My Schedule</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <ScheduleForm onSubmit={handleAddSchedule} />

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <ScheduleList
          schedules={schedules}
          onUpdate={handleUpdateSchedule}
          onDelete={handleDeleteSchedule}
        />
      )}
    </div>
  )
}
