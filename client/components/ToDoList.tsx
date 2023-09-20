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
      <div className="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl ">
        <div className="inline-flex justify-center items-center">
          <span className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
            ToDo List
          </span>
        </div>

        <div className="text-center">
          <p className="text-l font-semibold text-black">
            <p>
              <b>Add Task</b>
            </p>
          </p>
        </div>

        <AddTodo />

        <div className="text-center">
          <ul className=" text-m font-medium text-gray-900 bg-white ">
            {list.map((x: Task) => {
              return (
                <>
                  <li
                    key={x.id}
                    style={{
                      textDecoration: x.completed ? 'line-through' : '',
                      listStyle: 'none',
                    }}
                  >
                    <div className="flex items-center pl-3">
                      <input
                        type="checkbox"
                        checked={x.completed}
                        id={String(x.id)}
                        onChange={handleChange}
                        className="w-6 h-6 text-gray-600 bg-gray-100 border-gray-300 rounded"
                      />
                      <p className="w-full py-3 ml-2 text-sm font-medium text-black">
                        {x.tasks}{' '}
                        <p className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                          {x.created}
                        </p>
                      </p>
                    </div>
                  </li>
                  <ToDoItemEdit
                    id={x.id}
                    tasks={x.tasks}
                    completed={x.completed}
                  />
                </>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default ToDoList
