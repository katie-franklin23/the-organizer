import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import ToDoList from './client/components/ToDoList.tsx'
import App from './client/components/App.tsx'
import HomePage from './client/components/HomePage.tsx'
import StepCounter from './client/components/StepCounter.tsx'

import Sidebar from './client/components/Sidebar.tsx'

import PresentCycle from './client/components/PresentCycle.tsx'


export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<HomePage />} />

    <Route path="/todolist/:userID" element={<ToDoList />} />
    <Route path="/stepCounter/:userID" element={<StepCounter />} />

    <Route path="/dashboard" element={<Sidebar />} />
    <Route path="/gift" element={<PresentCycle />} />

  </Route>,
)

export const router = createBrowserRouter(routes)
