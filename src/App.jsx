import React,{ Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import Body from './components/Body'
import Header from './components/Header'
import store from './utils/store'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainContainer from './components/MainContainer'
// import WatchPage from './components/WatchPage'
// import SearchResult from './components/SearchResult'
import Error from './components/Error'

const WatchPage = lazy(() => import('./components/WatchPage') );
const SearchResult = lazy(() => import('./components/SearchResult'));

// function App() {
//   return (
//     <Provider store={store}>
//       <Header />
//       <RouterProvider router={appRouter} />
//       {/* 
//       Head
//       Body
//         Sidebar
//           Menu items
//         Main container
//           Button list
//           Video container
//             Video card
//        */}
//     </Provider>
   
//   )
// }

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Outlet />
    </Provider>
  )
}

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element : <App />,
    errorElement : <Error />,
    children:[
      {
        path: "/",
        element: <Body />,
        children:[
          {
            path:"/",
            element: <MainContainer />
          },
          {
            path: "watch",
            element: <Suspense><WatchPage /></Suspense>,
          },
          {
            path: "/results",
            element: <Suspense><SearchResult /></Suspense>,
          },
        ]
      },
    ]
  }
])


export default App
