import AuthForm from "./AuthForm"

function Login() {
  return (
    <div className="center h-screen ">
      <div className="flex flex-col px-6 md:px-12 py-8 w-11/12 xs:w-8/12 md:w-8/12 lg:w-7/12 xl:w-5/12  bg-gradient-to-b  from-teal-400 to-blue-500 shadow-xl ">
        <h1 className="header text-xl center pb-4 md:text-3xl text-gray-100 border-b-2">
          Sign in to your account
        </h1>
        <div className="gap-5">
          <AuthForm />
        </div>
      </div>
    </div>
  )
}

export default Login
