import { useQuery } from '@tanstack/react-query'
import { getToDoList, deleteTask, editTask } from '../apis/to-do-api.tsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Task } from '../../models/to-do-models.ts'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

function ToDoItemEdit({ id, tasks }: Task) {
  const { userID } = useParams()
  const [editing, setEditing] = useState(false)
  const [updatedTask, setUpdatedTask] = useState(tasks)

  const {
    data: list,
    isLoading,
    error,
  } = useQuery(['tasks'], () => getToDoList(Number(userID)))

  const queryClient = useQueryClient()

  const delTask = useMutation(deleteTask, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const edTask = useMutation(editTask, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  if (error instanceof Error) {
    return (
      <>
        <p>Something went wrong ... {error.message}</p>
      </>
    )
  }

  if (!list || isLoading) {
    return (
      <>
        <p>Loading ...</p>
      </>
    )
  }

  function handleDelete() {
    delTask.mutate(id)
  }

  const handleStartEdit = () => {
    setEditing(true)
  }

  const handleEndEdit = () => {
    setTimeout(() => {
      setEditing(false)
      setUpdatedTask(tasks)
    }, 10)
  }

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(updatedTask)
    console.log(userID)
    edTask.mutate({ id, update: updatedTask })
  }

  return (
    <div>
      {editing ? (
        <form onSubmit={handleEdit}>
          <input
            type="text"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
          />
          <button type="submit" onClick={() => handleEndEdit()}>
            Save
          </button>
        </form>
      ) : (
        <li>
          <button onClick={() => handleDelete()}>Delete</button>
          <button onClick={() => handleStartEdit()}>Edit Task</button>
        </li>
      )}
    </div>
  )
}

export default ToDoItemEdit
