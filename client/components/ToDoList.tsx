import { useQuery } from '@tanstack/react-query'
import { getToDoList, deleteTask } from '../apis/to-do-api.tsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Task } from '../../models/to-do-models.ts'
import AddTodo from './AddTodo.tsx'
import { useParams } from 'react-router-dom'
import ToDoItemEdit from './ToDoListEdit.tsx'

function ToDoList() {
  const { userID } = useParams()

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

  function handleDelete(id: number) {
    delTask.mutate(id)
  }

  function handleEdit() {}
  return (
    <>
      <AddTodo />
      {list.map((x: Task) => {
        return (
          <ul key={x.id}>
            <li>
              {x.tasks} <ToDoItemEdit id={x.id} tasks={x.tasks} />
            </li>
          </ul>
        )
      })}
    </>
  )
}

export default ToDoList
