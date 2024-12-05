import { Navigate, useLocation, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const PrivateRoute = () => {
  const { user, loading, isPublicPath } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  // Allow access to public paths without authentication
  if (isPublicPath(location.pathname)) {
    return <Outlet />
  }

  // Require authentication for all other paths
  if (!user) {
    return (
      <Navigate
        to="/signin"
        state={{
          from: location,
          message: "You must be logged in to access this page",
        }}
        replace
      />
    )
  }

  return <Outlet />
}

export default PrivateRoute
