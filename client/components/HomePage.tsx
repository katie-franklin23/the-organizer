function HomePage() {
  const btnClick = () => {
    //Handle Click route later
  }
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
      <img src="client/images/logo.png" alt="img" className="w-60 h-60"></img>
      <button
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 hover:shadow-xl transition duration-300"
        onClick={btnClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span>Go to your Dashboard</span>
      </button>
    </div>
  )
}

export default HomePage
