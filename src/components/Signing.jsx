import { useActionState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

function Signing() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [error, formSubmit, isPending] = useActionState(
    async (prevState, formData) => {
      // grab form input
      const email = formData.get("email")
      const password = formData.get("password")
      // 1. call the signIn function
      const { error: signInError, success, data } = await signIn(email, password)
      if (signInError) {
        return new Error(signInError)
      }
      if (success && data?.session) {
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
      <div className="w-full sm:w-3xl mx-auto p-1">
        <form
          action={formSubmit}
          aria-label="Sign in form"
          aria-describedby="form-description"
          className="flex flex-col my-6 gap-6 py-10 px-4 items-start sm:justify-center  rounded shadow-md/40 bg-blue-200"
        >
          <div id="form-description" className="sr-only">
            Use this form to sign in to your account. Enter your email and
            password.
          </div>

          <h2 className="font-bold text-2xl">Sign in</h2>
          <p className=" text-2xl">
            Don't have an account yet?{' '}
            <Link to={"/signup"} className="text-blue-900 border-b-3 hover:text-green-800 hover:border-b-green-800">
              Sign up
            </Link>
          </p>

          <label htmlFor="email" className="font-bold">Email</label>
          <input
            className="w-full border border-gray-300 p-2 text-sm  rounded text-gray-800 outline-none focus:ring-2 ring-amber-200 focus:border-amber-200 "
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
            className="w-full border border-gray-300 p-2 text-sm  rounded text-gray-800 outline-none focus:ring-2 ring-amber-200 focus:border-amber-200 "
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

          <button
            type="submit"
            className="w-full border py-2 px-3 rounded font-bold bg-white cursor-pointer hover:bg-blue-700"
          //className=
          //aria-busy=
          >
            {isPending ? "Signing In..." : "Sign In"}
          </button>
          {error && <h2 className="text-red-500 text-xl font-bold mx-4">{error.message}</h2>}
        </form>
      </div>
    </>
  )
}

export default Signing