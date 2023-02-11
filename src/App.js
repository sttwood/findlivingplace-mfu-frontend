import React from 'react'
import { Outlet } from 'react-router-dom'
// React V.6
import { Routes, Route } from 'react-router-dom'

// [REDUX]
import { useDispatch } from 'react-redux'

// [FUNCTIONs]
import { currentUser } from './Services/Functions/auth'


// [Routes] (redirect for user/admin permission)
import UserRoute from './Routes/UserRoute'
import AdminRoute from './Routes/AdminRoute'

//[LAYOUTs]
import DefaultNavbar from './Layouts/Header/DefaultNavbar'
import AdminSidebar from './Layouts/Side/AdminSidebar'
import UserSidebar from './Layouts/Side/UserSidebar'
import DefaultFooter from './Layouts/Footer/DefaultFooter'

//[PAGEs]
// Home
import Homepage from './Pages/index'
import ShowSinglePost from './Components/showcase/ShowSinglePost'
import AllPost from './Components/showcase/ShowAllPost'

// Auth
import Register from './Pages/auth/Register'
import Login from './Pages/auth/Login'
import ForgetPassword from './Pages/auth/ForgetPassword'
// Advance Search
import AdvanceSearch from './Pages/AdvanceSearch'
// Admin
import Dashboard from './Pages/admin/Dashboard'
import PostList from './Pages/admin/PostList'
import UserList from './Pages/admin/UserList'
import CreateCategory from './Pages/admin/category/CreateCategory'
import UpdateCategory from './Pages/admin/category/UpdateCategory'
import AdminCreatePlace from './Pages/admin/place/CreatePlace'
import AdminUpdatePlace from './Pages/admin/place/UpdatePlace'
import AdminFavorite from './Pages/admin/Favorite'
// User
import MyAccount from './Pages/user/MyAccount'
import MyPost from './Pages/user/MyPost'
import UserCreatePlace from './Pages/user/place/CreatePlace'
import UserUpdatePlace from './Pages/user/place/UpdatePlace'
import UserFavorite from './Pages/user/Favorite'



function App() {
  // Default Navbar
  const Navbar = () => (
    <div>
      <DefaultNavbar />
      <Outlet />
    </div>
  )

  const dispatch = useDispatch()
  const idtoken = localStorage.token
  // redux
  if (idtoken) {
    currentUser(idtoken)
      // currentAdmin(idtoken)
      .then((res) => {
        //code
        console.log(res.data)
        dispatch({
          type: 'LOGIN',
          payload: {
            token: idtoken,
            _id: res.data._id,
            email: res.data.email,
            firstname: res.data.firstname,
            lastname: res.data.lastname,
            telephone: res.data.telephone,
            role: res.data.role,
          },
        })
      })
      .catch((err) => {
        //err
        console.log(err)
      })
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path='/' element={<Homepage />} />
          <Route path='/places' element={<AllPost />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgetPassword />} />
          <Route path='/advance-search' element={<AdvanceSearch />} />
          <Route path='/place/:id' element={<ShowSinglePost />} />
        </Route>
        {/* [ADMIN] */}
        <Route path="/admin" element={<AdminSidebar />}>
          {/* dashboard */}
          <Route
            path='/admin/dashboard'
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          {/* user list */}
          <Route
            path='/admin/user-list'
            element={
              <AdminRoute>
                <UserList />
              </AdminRoute>
            }
          />
          {/* post list */}
          <Route
            path='/admin/post-list'
            element={
              <AdminRoute>
                <PostList />
              </AdminRoute>
            }
          />
          {/* Favorite */}
          <Route
            path='/admin/favorite'
            element={
              <AdminRoute>
                <AdminFavorite />
              </AdminRoute>
            }
          />
          {/* create category */}
          <Route
            path='/admin/create-category'
            element={
              <AdminRoute>
                <CreateCategory />
              </AdminRoute>
            } />
          {/* update category */}
          <Route
            path='/admin/update-category/:id'
            element={
              <AdminRoute>
                <UpdateCategory />
              </AdminRoute>
            } />
          {/* creat post */}
          <Route
            path='/admin/create-place'
            element={
              <AdminRoute>
                <AdminCreatePlace />
              </AdminRoute>
            }
          />
          {/* edit post */}
          <Route
            path='/admin/update-place/:id'
            element={
              <AdminRoute>
                <AdminUpdatePlace />
              </AdminRoute>
            }
          />
        </Route>

        {/* [USER] */}
        <Route path="/user" element={<UserSidebar />}>
          {/* My account */}
          <Route
            path='/user/my-account'
            element={
              <UserRoute>
                <MyAccount />
              </UserRoute>
            }
          />
          {/* My post */}
          <Route
            path='/user/my-post'
            element={
              <UserRoute>
                <MyPost />
              </UserRoute>
            }
          />
          {/* Favorite */}
          <Route
            path='/user/favorite'
            element={
              <UserRoute>
                <UserFavorite />
              </UserRoute>
            }
          />
          {/* creat post */}
          <Route
            path='/user/create-place'
            element={
              <UserRoute>
                <UserCreatePlace />
              </UserRoute>
            }
          />
          {/* edit post */}
          <Route
            path='/user/update-place/:id'
            element={
              <UserRoute>
                <UserUpdatePlace />
              </UserRoute>
            }
          />
        </Route>
      </Routes>
      <DefaultFooter />
    </>

  )
}

export default App
