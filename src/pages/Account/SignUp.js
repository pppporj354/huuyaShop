import React, { useState } from "react"
import { BsCheckCircleFill } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import { logoLight } from "../../assets/images"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../../firebase/firebase.config"

const SignUp = () => {
  // ============= Initial State Start here =============
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [checked, setChecked] = useState(false)
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errName, setErrName] = useState("")
  const [errUsername, setErrUsername] = useState("")
  const [errEmail, setErrEmail] = useState("")
  const [errPhone, setErrPhone] = useState("")
  const [errPassword, setErrPassword] = useState("")
  const navigate = useNavigate()

  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("")
  // ============= Event Handler Start here =============
  const handleName = (e) => {
    setName(e.target.value)
    setErrName("")
  }
  const handleUsername = (e) => {
    setUsername(e.target.value)
    setErrUsername("")
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
    setErrEmail("")
  }
  const handlePhone = (e) => {
    setPhone(e.target.value)
    setErrPhone("")
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
    setErrPassword("")
  }

  // ============= Event Handler End here ===============
  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
  }
  // ================= Email Validation End here ===============

  const handleSignUp = async (e) => {
    e.preventDefault()

    try {
      if (
        name &&
        username &&
        email &&
        EmailValidation(email) &&
        password &&
        password.length >= 6 &&
        checked
      ) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

        // Then create user document
        try {
          await setDoc(doc(db, "users", userCredential.user.uid), {
            name,
            username,
            email,
            phone,
            createdAt: new Date(),
          })

          setSuccessMsg(
            `Hello dear ${username}, Your account has been created successfully!`
          )

          // Reset form
          setName("")
          setUsername("")
          setEmail("")
          setPhone("")
          setPassword("")
          setChecked(false)

          setTimeout(() => {
            navigate("/shop")
          }, 2000)
        } catch (firestoreError) {
          console.error("Firestore Error:", firestoreError)
          setErrEmail("Failed to save user data. Please try again.")

          // Optionally delete the auth user if Firestore fails
          await userCredential.user.delete()
        }
      } else {
        // Validate all fields
        if (!name) setErrName("Enter your name")
        if (!username) setErrUsername("Enter your name")
        if (!email) setErrEmail("Enter your email")
        if (email && !EmailValidation(email)) setErrEmail("Enter a valid email")
        if (!password) setErrPassword("Create a password")
        if (password && password.length < 6)
          setErrPassword("Password must be at least 6 characters")
        if (!checked) setErrEmail("Please accept the Terms of Service")
      }
    } catch (error) {
      console.error("Auth Error:", error)
      if (error.code === "auth/email-already-in-use") {
        setErrEmail("Email already exists")
      } else {
        setErrEmail(error.message)
      }
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Get started for free
            </h1>
            <p className="text-base">Create your account to access more</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with Huuya
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all Huuya services
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              © Huuya
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button
                className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <div className="w-full h-screen flex items-center justify-center ">
            <div className="max-w-md w-full mx-autorounded-lg  p-8">
              <form className="w-full flex flex-col">
                <div className="w-full flex flex-col gap-4 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-primeColor">
                  <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                    Create your account
                  </h1>
                  <div className="flex flex-col gap-3">
                    {/* client name */}
                    <div className="flex flex-col gap-.5">
                      <p className="font-titleFont text-base font-semibold text-gray-600">
                        Full Name
                      </p>
                      <input
                        onChange={handleName}
                        value={name}
                        className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                        type="text"
                        placeholder="eg. John Doe"
                      />
                      {errName && (
                        <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                          <span className="font-bold italic mr-1">!</span>
                          {errName}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-.5">
                      <p className="font-titleFont text-base font-semibold text-gray-600">
                        Username
                      </p>
                      <input
                        onChange={handleUsername}
                        value={username}
                        className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                        type="text"
                        placeholder="eg. John Doe"
                      />
                      {errUsername && (
                        <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                          <span className="font-bold italic mr-1">!</span>
                          {errUsername}
                        </p>
                      )}
                    </div>
                    {/* Email */}
                    <div className="flex flex-col gap-.5">
                      <p className="font-titleFont text-base font-semibold text-gray-600">
                        Email
                      </p>
                      <input
                        onChange={handleEmail}
                        value={email}
                        className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                        type="email"
                        placeholder="john@workemail.com"
                      />
                      {errEmail && (
                        <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                          <span className="font-bold italic mr-1">!</span>
                          {errEmail}
                        </p>
                      )}
                    </div>
                    {/* Phone Number */}
                    <div className="flex flex-col gap-.5">
                      <p className="font-titleFont text-base font-semibold text-gray-600">
                        Phone Number
                      </p>
                      <input
                        onChange={handlePhone}
                        value={phone}
                        className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                        type="text"
                        placeholder="008801234567891"
                      />
                      {errPhone && (
                        <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                          <span className="font-bold italic mr-1">!</span>
                          {errPhone}
                        </p>
                      )}
                    </div>
                    {/* Password */}
                    <div className="flex flex-col gap-.5">
                      <p className="font-titleFont text-base font-semibold text-gray-600">
                        Password
                      </p>
                      <input
                        onChange={handlePassword}
                        value={password}
                        className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                        type="password"
                        placeholder="Create password"
                      />
                      {errPassword && (
                        <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                          <span className="font-bold italic mr-1">!</span>
                          {errPassword}
                        </p>
                      )}
                    </div>
                    {/* Checkbox */}
                    <div className="flex items-start mdl:items-center gap-2">
                      <input
                        onChange={() => setChecked(!checked)}
                        className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                        type="checkbox"
                      />
                      <p className="text-sm text-primeColor">
                        I agree to the Huuya{" "}
                        <span className="text-blue-500">Terms of Service </span>
                        and{" "}
                        <span className="text-blue-500">Privacy Policy</span>.
                      </p>
                    </div>
                    <button
                      onClick={handleSignUp}
                      className={`${
                        checked
                          ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                          : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                      } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                    >
                      Create Account
                    </button>
                    <p className="text-sm text-center font-titleFont font-medium">
                      Don't have an Account?{" "}
                      <Link to="/signin">
                        <span className="hover:text-blue-600 duration-300">
                          Sign in
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignUp
