import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root'
import InfoPage from './pages/infopage/InfoPage'
import AddPage from './pages/addpage/AddPage'
import PlanPage from './pages/planpage/PlanPage'
import SummaryPage from './pages/summarypage/SummaryPage'
import Success from './pages/success/Success'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <InfoPage />,
      },
      {
        path: '/add',
        element: <AddPage />,
      },
      {
        path: '/plan',
        element: <PlanPage />,
      },
      {
        path: '/summary',
        element: <SummaryPage />,
      },
      {
        path: '/success',
        element: <Success></Success>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} ></RouterProvider>
  </React.StrictMode>,
)
