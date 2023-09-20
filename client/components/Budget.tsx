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
      <h1>Budget</h1>

      {lastWeeksBudget ? (
        <>
          <p>
            <b>Last weeks budget</b>
          </p>
          <ul>
            <li>Total Balance: ${lastWeeksBudget.total}</li>
            <li>Total Expense: ${lastWeeksBudget.expenses}</li>
            <li>
              Total Remaining:{' '}
              <span
                style={{
                  color: lastWeeksBudget.remaining < 0 ? 'red' : 'green',
                }}
              >
                ${lastWeeksBudget.remaining}
              </span>
            </li>
          </ul>
        </>
      ) : (
        <p>
          <b>No Previous Budget</b>
        </p>
      )}

      {latestBudget ? (
        <>
          <p>
            <b>Current Budget</b>
          </p>
          <ul>
            <li>Total Balance: ${latestBudget.total}</li>
            <li>Total Expense: ${latestBudget.expenses}</li>
            <li>
              Total Remaining:{' '}
              <span
                style={{
                  color: latestBudget.remaining < 0 ? 'red' : 'green',
                }}
              >
                ${latestBudget.remaining}
              </span>
            </li>
          </ul>

          <form onSubmit={handleUpdate}>
            <label htmlFor="addBalance">Add to Balance</label>
            <input
              placeholder="0"
              id="addBalance"
              name="balance"
              type="number"
              value={balance.toString()}
              onChange={handleUpdateChange}
            />
            <label htmlFor="addExpense">Add Expense</label>
            <input
              placeholder="0"
              id="addExpense"
              name="expense"
              type="number"
              value={expenses.toString()}
              onChange={handleUpdateChange}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <p>
          <b>No Current Budget</b>
        </p>
      )}

      <p>
        <b>New budget</b>
      </p>

      <form onSubmit={handleAdd}>
        <label htmlFor="addBalance">Add to Balance</label>
        <input
          placeholder="0"
          id="addBalance"
          name="balance"
          type="number"
          value={newBalance.toString()}
          onChange={handleNewChange}
        />
        <label htmlFor="addExpense">Add Expense</label>
        <input
          placeholder="0"
          id="addExpense"
          name="expense"
          type="number"
          value={newExpenses.toString()}
          onChange={handleNewChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
