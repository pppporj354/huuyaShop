import React from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase/firebase.config"
import Breadcrumbs from "../../components/pageProps/Breadcrumbs"

const Profile = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      navigate("/signin")
    } catch (error) {
      console.log("Error signin ount", error)
    }
  }

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Profile" />
      <div className="w-full max-w-[800px] mx-auto p-4 my-10">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between border-b pb-6">
            <h1 className="text-2xl font-font-titleFont font-bold">
              My Profile
            </h1>
            <button
              onClick={handleSignOut}
              className="bg-primeColor text-white px-4 py-2 rounded-md hover:bg-black transition duration-300"
            >
              Sign Out
            </button>
          </div>
          <div className="mt-6 space-y-6">
            <div className="flex flex-col space-y-2">
              <p className="text-gray-600 font font-titleFont">Full Name</p>
              <p className="text-xl font-medium"> {user?.name}</p>
            </div>
          </div>
          <div className="mt-6 space-y-6">
            <div className="flex flex-col space-y-2">
              <p className="text-gray-600 font font-titleFont">Username</p>
              <p className="text-xl font-medium"> {user?.username}</p>
            </div>
          </div>
          <div className="mt-6 space-y-6">
            <div className="flex flex-col space-y-2">
              <p className="text-gray-600 font font-titleFont">Email</p>
              <p className="text-xl font-medium"> {user?.email}</p>
            </div>
          </div>
          <div className="mt-6 space-y-6">
            <div className="flex flex-col space-y-2">
              <p className="text-gray-600 font font-titleFont">Member Since</p>
              <p className="text-xl font-medium">
                {" "}
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
