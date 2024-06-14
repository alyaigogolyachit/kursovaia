import Link from "next/link"

const NotFound = () => {
  return (
    <div className="min-h-screen mt-10 flex  flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-white  mb-4">Page Not Found</h1>
      <p className="text-lg text-white  mb-8">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link href="/">
        <p className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition duration-300">
          Go Home
        </p>
      </Link>
    </div>
  )
}

export default NotFound
