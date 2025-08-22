import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import ChatBot from '@/components/ChatBot'

export const metadata: Metadata = {
  title: 'KisanSafe - Smart Crop Yield Forecasting',
  description: 'Predict crop yields and get farmer alerts with AI-powered insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <LanguageProvider>
          {children}
          <ChatBot />
        </LanguageProvider>
      </body>
    </html>
  )
}