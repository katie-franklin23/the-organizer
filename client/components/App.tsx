import { Link, Outlet } from 'react-router-dom'
import Weather from './Weather'
import Animation from './Animation'
// import HomePage from './HomePage'

function App() {
  return (
    <>
      <div className="bg-gray-200 min-h-screen flex flex-col ">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Outlet />
          <Weather />
          {/* <Animation /> */}
        </main>
      </div>
    </>
  )
}

export default App
