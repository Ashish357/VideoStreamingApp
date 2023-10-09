import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { appRouter } from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'

 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(<RouterProvider router={appRouter} />);