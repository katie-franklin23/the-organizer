import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getToDoList, editCheck } from '../apis/to-do-api.tsx'
import { Task } from '../../models/to-do-models.ts'
import AddTodo from './AddTodo.tsx'
import { useParams } from 'react-router-dom'
import ToDoItemEdit from './ToDoListEdit.tsx'

function ToDoList() {
  const { userID } = useParams()

  const queryClient = useQueryClient()
  const {
    data: list,
    isLoading,
    error,
  } = useQuery(['tasks'], () => getToDoList(Number(userID)))

  const checkedBox = useMutation(editCheck, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      checkedBox.mutate({ id: Number(event.currentTarget.id), checked: true })
    } else {
      checkedBox.mutate({ id: Number(event.currentTarget.id), checked: false })
    }
  }

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

  return (
    <>
      <AddTodo />
      {list.map((x: Task) => {
        return (
          <ul
            key={x.id}
            style={{
              textDecoration: x.completed ? 'line-through' : '',
            }}
          >
            <input
              type="checkbox"
              checked={x.completed}
              id={String(x.id)}
              onChange={handleChange}
            />
            {x.tasks} {x.created}
            <ToDoItemEdit id={x.id} tasks={x.tasks} completed={x.completed} />
          </ul>
        )
      })}
    </>
  )
}

export default ToDoList
