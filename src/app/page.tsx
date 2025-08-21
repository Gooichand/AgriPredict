import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">AgriPredict</h1>
          <Link href="/login" className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100">
            Login
          </Link>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">
          Smart Crop Yield Forecasting
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Predict crop yields and receive real-time alerts to optimize your farming decisions with AI-powered insights.
        </p>
        <Link href="/login" className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-green-700">
          Get Started
        </Link>
      </main>
    </div>
  )
}