import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask } from '../apis/to-do-api.tsx'

function AddTodo() {
  const [newTask, setNewTasks] = useState('')

  const queryClient = useQueryClient()

  const add = useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    add.mutate({
      tasks: newTask,
    })
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
