import { Link, Outlet } from 'react-router-dom'
import Weather from './Weather'
import Animation from './Animation'
import Theme from './Theme'
// import HomePage from './HomePage'

function App() {
  return (
    <>

      <Theme>
        <div className="app">
          {/* <h1 className="text-red-500">Fullstack Boilerplate - with Fruits!</h1> */}
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
            <Animation />
          </main>
        </div>
      </Theme>

    </>
  )
}

export default App
