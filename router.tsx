import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Sidebar from './client/components/Sidebar.tsx'
import App from './client/components/App.tsx'
import HomePage from './client/components/HomePage.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<HomePage />} />
    <Route path="/dashboard" element={<Sidebar />} />
  </Route>,
)

export const router = createBrowserRouter(routes)
