import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useActionState } from 'react'
import { useAuth } from '../context/AuthContext'

function SignUp() {
  const navigate = useNavigate()
  const{signUpNewUser} = useAuth()
  const [error, actionFunction, isPending] = useActionState(
    async (prevState, formData)=>{
      const email = formData.get("email")
      const password=formData.get("password")
      const{error, success, data} = await signUpNewUser(email,password)
      if (error){
        return new Error(error)
      }
      if(success && data?.session){
        navigate("/dashboard")
        return null
      }
      return null
    },
    null
  )
  return (
    <>
      <h1 className="text-2xl text-center text-gray-900 p-4 bg-white shadow-md/80">Paper Like A Boss</h1>
      <div className="w-full sm:w-3xl mx-auto p-1 ">
        <form
          action={actionFunction}
          aria-label="Sign up form"
          aria-describedby="form-description"
          className="flex flex-col my-6 gap-6 py-10 px-4 items-start sm:justify-center bg-amber-100 rounded shadow-md/40"
        >
          <div id="form-description" className="sr-only">
            Use this form to create a new account. Enter your email and
            password.
          </div>

          <h2 className="font-bold text-2xl">Sign up today!</h2>
          <p className=" text-2xl">
            Already have an account?{' '}
            <Link to={"/"} className='text-green-700 border-b-3 hover:text-blue-800 hover:border-b-3'>
                Sign in
            </Link>
          </p>

           <label htmlFor="name" className="font-bold">Name</label>
          <input
            className=" w-full bg-white  border border-gray-300 p-2 text-sm  rounded text-gray-800 outline-none focus:ring-2 ring-amber-200 focus:border-amber-200 "
            type="email"
            name="name"
            id="name"
            placeholder=""
            required
            aria-required="true"
          //aria-invalid=
          //aria-describedby=
          disabled={isPending}
          />

          <label htmlFor="email" className="font-bold">Email</label>
          <input
            className=" w-full bg-white  border border-gray-300 p-2 text-sm  rounded text-gray-800 outline-none focus:ring-2 ring-amber-200 focus:border-amber-200 "
            type="email"
            name="email"
            id="email"
            placeholder=""
            required
            aria-required="true"
          //aria-invalid=
          //aria-describedby=
          disabled={isPending}
          />

          <label htmlFor="password" className="font-bold">Password</label>
          <input
            className=" w-full bg-white border border-gray-300 p-2 text-sm  rounded text-gray-800 outline-none focus:ring-2 ring-amber-200 focus:border-amber-200 "
            type="password"
            name="password"
            id="password"
            placeholder=""
            required
            aria-required="true"
          //aria-invalid=
          //aria-describedby=
          disabled={isPending}
          />

          <fieldset
            className="border font-bold px-5 py-2 bg-white rounded cursor-pointer"
            aria-required="true"
            aria-label="Select your role"
          >
            <legend>Select your role</legend>
            <div className="font-medium m-2 flex gap-4 text-gray-900">
              <label>
                <input
                  className=''
                  type="radio"
                  name="account-type"
                  value="admin"
                  required
                />{' '}
                Admin
              </label>
              <label>
                <input type="radio" name="account-type" value="rep" required />{' '}
                Sales Rep
              </label>
            </div>
          </fieldset>


          <button
            type="submit"
            className=" w-full  border py-2 px-3 rounded font-bold bg-white cursor-pointer hover:bg-amber-700"
          disabled={isPending}
          //aria-busy=
          >
            {isPending? "Signing up...." : "Sign up"}
          </button>
           {error && <h2 className="text-red-500 text-xl font-bold mx-4">{error.message}</h2>}
        </form>
      </div>
    </>
  )
}

export default SignUp