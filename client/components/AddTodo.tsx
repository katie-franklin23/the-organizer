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
        <label
          htmlFor="task"
          className="flex p-2 gap-x-4 gap-y-4 justify-center"
        >
          Add Task
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
          placeholder="What needs to be done?"
          value={newTask}
          id="task"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="flex p-1 gap-x-4 cursor-pointer hover:text-white hover:bg-green-500 transition rounded items-center justify-center"
          style={{ margin: '0 auto' }}
        >
          Add
        </button>
      </form>
    </>
  )
}

export default AddTodo
