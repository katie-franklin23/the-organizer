import { useQuery } from '@tanstack/react-query'
import { getToDoList, deleteTask, editTask } from '../apis/to-do-api.tsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

interface Prop {
  id: number
  tasks: string
  completed: boolean
}

function ToDoItemEdit({ id, tasks }: Prop) {
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
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-grey-darker text-center bg-yellow-100"
          />
          <div className="text-center">
            <button
              type="submit"
              onClick={() => handleEndEdit()}
              className="ml-1 mr-2 bg-green-500 hover:bg-green-300 text-white mb-0 mt-0 py-0 px-0 rounded transition mx-auto"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <li className="flex justify-between items-center mb-4">
          <div>
            <button
              onClick={() => handleStartEdit()}
              className="ml-1 mr-2 bg-blue-500 hover:bg-blue-300 text-white mt-2 py-0 px-0 rounded transition"
            >
              Edit Task
            </button>
            <button
              onClick={() => handleDelete()}
              className="ml-1 mr-2 bg-red-500 hover:bg-red-300 text-white mt-2 py-0 px-0 rounded transition"
            >
              Delete
            </button>
          </div>
        </li>
      )}
    </div>
  )
}

export default ToDoItemEdit
