import { Mail, Home } from 'react-feather'

export default [
  {
    id: 'users',
    title: 'users',
    icon: <Home size={20} />,
    navLink: '/users'
  },
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'secondPage',
    title: 'Second Page',
    icon: <Mail size={20} />,
    navLink: '/second-page'
  }
]
