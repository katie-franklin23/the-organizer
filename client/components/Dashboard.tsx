import Sidebar from './Sidebar'
import ToDoList from './ToDoList'
import Stopwatch from './Timer'
import PresentCycle from './PresentCycle'
import Budget from './Budget'
import Animation from './Animation'
function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="col-span-1">
            <ToDoList />
          </div>
          <div className="col-span-1">
            <Stopwatch />
          </div>
          <div className="col-span-1">
            <PresentCycle />
          </div>
          <div className="col-span-1">
            <Budget />
          </div>
          <div>{/* <Animation /> */}</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
