import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask } from '../apis/to-do-api.tsx'
import { useParams } from 'react-router-dom'

function AddTodo() {
  const { userID } = useParams()
  const [timestamp, setTimestamp] = useState('')
  const [newTask, setNewTasks] = useState('')

  const queryClient = useQueryClient()

  const add = useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const formatDate = (dateString: number) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }

    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const currentTimestamp = formatDate(Date.now())
    setTimestamp(currentTimestamp)
    add.mutate({
      tasks: newTask,
      user_id: Number(userID),
      created: timestamp,
    })

    console.log(timestamp)
    setNewTasks('')
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTasks(event.target.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task">Add Task</label>
        <input
          placeholder="What needs to be done?"
          value={newTask}
          id="task"
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </>
  )
}

export default AddTodo
