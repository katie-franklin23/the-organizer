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
    <div className="h-100 w-100 flex items-center justify-center bg-red-500 font-sans">
      <div className="bg-white rounded">
        <div className="mb-4">
          <h1 className="flex text-grey-800 font-semibold justify-center p-2 m-2">
            Your Todo List
          </h1>
          <div>
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
                    className="w-4 h-4 rounded mr-2 ml-1"
                  />
                  {x.tasks} {x.created}
                  <ToDoItemEdit
                    id={x.id}
                    tasks={x.tasks}
                    completed={x.completed}
                  />
                </ul>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToDoList
