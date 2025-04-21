function Homepage() {
  return (
    <div className="relative w-screen h-screen">
      <img
        className="absolute w-full h-full object-cover"
        src="assets/noaa-0ETSZYPjvDo-unsplash.jpg"
        alt="background"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <input
          type="text"
          placeholder="Enter city"
          className="w-1/2 p-3 rounded-4xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  )
}

export default Homepage