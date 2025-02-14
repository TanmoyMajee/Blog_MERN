import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './tailwind.config.App'
import './index.css'
import Layout from './components/layout'
import Blog from './components/blog'
import Register from './components/register'
import Login from './components/login'
import BlogPage from './components/blogPage'
import Post from './components/createPost'
import PostPage from './components/postpage'
import Editpost from './components/editPost'
import Contact_us from './components/contact_us'
import About from './components/about'
import {AuthProvider} from '../src/contetxApi/contetx'
import { AuthContext } from './contetxApi/contetx';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom' 
// const { user, isLoggedIn, handleLogout, resetSearchFilters } = useContext(AuthContext);
// const user = false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<BlogPage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/post' element={<Post/>}/>
      <Route path='/postpage/:id' element={<PostPage/>}/>
      <Route path='/editpost/:id' element={<Editpost/>}/>
      <Route path='/contact' element={<Contact_us/>}/>
      <Route path='/about' element={<About/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
   <RouterProvider router={router}/>
   </AuthProvider>
  </StrictMode>,
)
