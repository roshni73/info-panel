function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
          <span className="text-2xl">📊</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          InfoPanel Ready!
        </h1>
        <p className="text-gray-600 mb-6">
          Tailwind CSS is successfully configured and working!
        </p>
        <div className="space-y-3">
          <div className="flex items-center text-green-600">
            <span className="mr-2">✅</span>
            <span>React + TypeScript</span>
          </div>
          <div className="flex items-center text-green-600">
            <span className="mr-2">✅</span>
            <span>Tailwind CSS</span>
          </div>
          <div className="flex items-center text-green-600">
            <span className="mr-2">✅</span>
            <span>Vite Build Tool</span>
          </div>
        </div>
        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors">
          Continue to Dashboard
        </button>
      </div>
    </div>
  )
}

export default App
