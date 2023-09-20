import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { addBudget, getBudget, updateBudget } from '../apis/budget-api'
import { useParams } from 'react-router-dom'

export default function Budget() {
  const { userID } = useParams()
  const [balance, setBalance] = useState(0)
  const [expenses, setExpense] = useState(0)
  const [newBalance, setNewBalance] = useState(0)
  const [newExpenses, setNewExpense] = useState(0)

  const queryClient = useQueryClient()

  const {
    data: list,
    isLoading,
    error,
  } = useQuery(['budget'], () => getBudget(Number(userID)))

  const update = useMutation(updateBudget, {
    onSuccess: () => {
      queryClient.invalidateQueries(['budget'])
    },
  })

  const add = useMutation(addBudget, {
    onSuccess: () => {
      queryClient.invalidateQueries(['budget'])
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

  const latestBudget = list[list.length - 1]
  const lastWeeksBudget = list[list.length - 2]

  async function handleAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    add.mutate({
      user_id: userID,
      total: newBalance,
      expenses: newExpenses,
      remaining: 0,
    })

    setNewBalance(0)
    setNewExpense(0)
  }

  function handleUpdateChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === 'expense') {
      setExpense(Number(event.target.value))
    }
    if (event.target.name === 'balance') {
      setBalance(Number(event.target.value))
    }
  }

  function handleNewChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === 'expense') {
      setNewExpense(Number(event.target.value))
    }
    if (event.target.name === 'balance') {
      setNewBalance(Number(event.target.value))
    }
  }

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    update.mutate({
      ...latestBudget,
      total: latestBudget.total + balance,
      expenses: latestBudget.expenses + expenses,
    })

    setExpense(0)
    setBalance(0)
  }

  return (
    <>
      <div className="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl ">
        <div className="inline-flex justify-center items-center">
          <span className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
            Budgets
          </span>
        </div>

        <div className="text-center">
          <p className="text-l font-semibold text-black">
            {lastWeeksBudget ? (
              <>
                <p>
                  <b>Last weeks budget</b>
                </p>
                <ul>
                  <li>Total Balance: ${lastWeeksBudget.total}</li>
                  <li>Total Expense: ${lastWeeksBudget.expenses}</li>
                </ul>
              </>
            ) : (
              <p>
                <b>No Previous Budget</b>
              </p>
            )}
          </p>
        </div>

        <dl className="flex justify-center items-center divide-x divide-gray-200 dark:divide-gray-700">
          <dt className="pr-3">
            Remaining:
            <span
              style={{
                color: lastWeeksBudget.remaining < 0 ? 'red' : 'green',
              }}
            >
              <svg
                className="inline-block w-4 h-4 self-center"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                />
              </svg>
              <span className="inline-block text-sm">
                ${lastWeeksBudget.remaining}
              </span>
            </span>
          </dt>
        </dl>

        <div className="text-center">
          <p className="text-l font-semibold text-black">
            {latestBudget ? (
              <>
                <p>
                  <b>Current Budget</b>
                </p>
                <ul>
                  <li>Total Balance: ${latestBudget.total}</li>
                  <li>Total Expense: ${latestBudget.expenses}</li>
                </ul>
              </>
            ) : (
              <p>
                <b>No Current Budget</b>
              </p>
            )}
          </p>
        </div>

        <dl className="flex justify-center items-center divide-x divide-gray-200 dark:divide-gray-700">
          <dt className="pr-3">
            Remaining:
            <span
              style={{
                color: latestBudget.remaining < 0 ? 'red' : 'green',
              }}
            >
              <svg
                className="inline-block w-4 h-4 self-center"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                />
              </svg>
              <span className="inline-block text-sm">
                ${latestBudget.remaining}
              </span>
            </span>
          </dt>
        </dl>

        <form onSubmit={handleUpdate}>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="addBalance"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Add to Current Balance
            </label>
            <input
              placeholder="0"
              id="addBalance"
              name="balance"
              type="number"
              value={balance.toString()}
              onChange={handleUpdateChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
            />
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="addExpense"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Add Expenses
            </label>
            <input
              placeholder="0"
              id="addExpense"
              name="expense"
              type="number"
              value={expenses.toString()}
              onChange={handleUpdateChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Submit
          </button>
        </form>

        <div className="text-center">
          <p className="text-l font-semibold text-black">Enter New Budget</p>
        </div>

        <form onSubmit={handleAdd}>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="addBalance"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Add to Balance
            </label>
            <input
              placeholder="0"
              id="addBalance"
              name="balance"
              type="number"
              value={newBalance.toString()}
              onChange={handleNewChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
            />
          </div>

          <div className="text-l font-semibold text-black">
            <label
              htmlFor="addExpense"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Add Expense
            </label>
            <input
              placeholder="0"
              id="addExpense"
              name="expense"
              type="number"
              value={newExpenses.toString()}
              onChange={handleNewChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 mt-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
