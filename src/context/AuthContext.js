import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../firebase/firebase.config"
import { doc, getDoc } from "firebase/firestore"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid))
          const userData = userDoc.data()

          // Only set user data if userData exists
          if (userData) {
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              name: userData.name,
              username: userData.username,
            })
          } else {
            // If no userData found, sign out the user
            await auth.signOut()
            setUser(null)
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        // console.error("Error fetching user data:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])
  // console.log(user)

  // Check if current path is public
  const isPublicPath = (path) => {
    const publicPaths = ["/", "/signin", "/signup"]
    return publicPaths.includes(path)
  }

  return (
    <AuthContext.Provider value={{ user, loading, isPublicPath }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
