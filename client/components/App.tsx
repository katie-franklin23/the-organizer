import { Link, Outlet } from 'react-router-dom'

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
        </main>
      </div>
    </>
  )
}

export default App
