import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AgriPredict - Smart Crop Yield Forecasting',
  description: 'Predict crop yields and get farmer alerts with AI-powered insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}