import { useQuery } from '@tanstack/react-query'
import { getToDoList, deleteTask, editTask } from '../apis/to-do-api.tsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Task } from '../../models/to-do-models.ts'
import AddTodo from './AddTodo.tsx'
import { useParams } from 'react-router-dom'
import { useState, ChangeEvent } from 'react'

function ToDoItemEdit({ id, task }: Task) {
  const { userID } = useParams()
  const [editing, setEditing] = useState(false)
  const [updatedTask, setUpdatedTask] = useState(task)

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
      setEditing(false)
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
    delTask.mutate({ id })
  }

  // Handling Edit functions

  const handleStartEdit = () => {
    setEditing(true)
  }

  const handleEndEdit = () => {
    setEditing(false)
    setUpdatedTask(updatedTask)
  }

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(updatedTask)
    edTask.mutate({ id, updatedTask })
    // ^ To do
  }

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()

  //   edTask.mutate({id, updatedTask: task})
  // }

  return (
    <div>
      {editing ? (
        <form onSubmit={handleEdit}>
          <input
            type="text"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
          />

          <button type="submit">Save</button>
          <button type="button" onClick={handleEndEdit}>
            Stop Editing
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

{
  /* {
          editing ? (
            <form onSubmit={handleEdit}>
              <input
                type="text"
                value={updatedTask}
                onChange={(e) => setUpdatedTask(e.target.value)}
              />

              <button type="submit">Save</button>
              <button type="button" onClick={handleEndEdit}>
                Stop Editing
              </button>
            </form>
          ) : (
            <ul key={x.id}>
              <li>
                {x.tasks}
                <button onClick={() => handleDelete(x.id)}>Delete</button>
                <button onClick={() => handleStartEdit()}>Edit Task</button>
              </li>
            </ul>
          ) */
}

export default ToDoItemEdit
