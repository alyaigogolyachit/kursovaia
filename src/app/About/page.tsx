import React from "react"

const About = () => {
  return (
    <div className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 border border-gray-300 rounded-lg bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <p className="mb-4">
          Welcome to the blog app! Here you will find insightful articles on
          various topics.
        </p>
        <p className="mb-4">
          Enjoy sharing your thoughts and experiences through writing.
        </p>
        <p>Feel free to explore and leave comments. Happy reading!</p>
      </div>
    </div>
  )
}

export default About
