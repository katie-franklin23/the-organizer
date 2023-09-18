import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { addSteps, getStepCounts } from '../apis/stepCounter-api'
import { useParams } from 'react-router-dom'

export default function StepCounter() {
  const { userID } = useParams()

  const {
    data: list,
    isLoading,
    error,
  } = useQuery(['steps'], () => getStepCounts(Number(userID)))

  const [stepsCount, setStepsCount] = useState<number>(0)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setStepsCount(Number(event.target.value))
  }

  const queryClient = useQueryClient()

  const add = useMutation(addSteps, {
    onSuccess: () => {
      queryClient.invalidateQueries(['steps'])
    },
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    add.mutate({
      steps: Number(stepsCount),
      user_id: Number(userID),
    })
    setStepsCount(0)
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

  interface Steps {
    user_id: number
    steps: number
  }

  const fiveSteps = list.slice(-5)
  const totalFiveSteps = fiveSteps.reduce(
    (total: number, step: Steps) => total + Number(step.steps),
    0,
  )

  return (
    <>
      <h1>Step Counter</h1>
      <p>Steps state: {stepsCount}</p>
      <p>Last 5 days:</p>

      {fiveSteps.map((x) => {
        return <p key={x.id}>{x.steps}</p>
      })}

      <form onSubmit={handleSubmit}>
        <label htmlFor="stepCount" style={{ display: 'none' }}>
          Enter Step Count
        </label>
        <p>{totalFiveSteps}</p>
        <input
          placeholder="0"
          id="stepCount"
          type="number"
          value={stepsCount}
          onChange={handleChange}
          pattern="[0-9]*"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
