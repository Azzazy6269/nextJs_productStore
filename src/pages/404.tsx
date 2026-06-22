import React from 'react'
import Link from 'next/link'

const NotFound404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
        <p className="mt-2 text-base-content/70">
          Oops! The page you are looking for does not exist.
        </p>
        <div className="mt-8">
          <Link href="/" className="btn btn-primary btn-wide">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound404

NotFound404.getLayout =(page:React.ReactElement)=>{
  return(<>{page}</>)
}