import { useEffect, useState } from 'react'
import { getPresents } from '../apis/present'
import PresentsType from '../../models/presents'

function PresentCycle() {
  const [presents, setPresents] = useState<PresentsType[]>([])
  const [currentPresentIndex, setCurrentPresentIndex] = useState<number>(0)

  useEffect(() => {
    async function fetchPresents() {
      try {
        const presentsData = await getPresents()
        setPresents(presentsData)
      } catch (error) {
        console.error('Error fetching presents:', error)
      }
    }

    fetchPresents()
  }, [])

  useEffect(() => {
    const nextPresent = () => {
      setCurrentPresentIndex((prevIndex) => (prevIndex + 1) % presents.length)
    }
    const timer = setInterval(() => {
      nextPresent()
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [currentPresentIndex, presents])

  return (
    <div className="container mx-auto p-4 justify-center text-center bg-slate-300 rounded">
      <h2 className="text-center text-2xl font-bold mb-4">
        Random Present Ideas
      </h2>
      {presents.length > 0 && (
        <div className="flex flex-col items-center">
          {' '}
          <img
            src={presents[currentPresentIndex].image_url}
            alt={presents[currentPresentIndex].present_name}
            className="rounded-lg shadow-lg mx-auto mb-4 max-w-md max-h-40"
          />
          <h3 className="text-center text-2xl font-bold mb-4">
            {presents[currentPresentIndex].present_name}
          </h3>
        </div>
      )}
    </div>
  )
}

export default PresentCycle
