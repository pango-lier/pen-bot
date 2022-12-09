import { lazy } from 'react'
import AuthRoutes from './Auth'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/home/Home'))
  },
  {
    path: '/users',
    component: lazy(() => import('../../views/pages/User')),
  },
  {
    path: '/second-page',
    component: lazy(() => import('../../views/SecondPage')),
    meta: {
      publicRoute: true
    }
  },
  ...AuthRoutes,
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
