import { collection, addDoc, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase.config"

// Add a product
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, "products"), productData)
    return docRef.id
  } catch (error) {
    console.error("Error adding product:", error)
    throw error
  }
}

// Get all products
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"))
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error getting products:", error)
    throw error
  }
}
