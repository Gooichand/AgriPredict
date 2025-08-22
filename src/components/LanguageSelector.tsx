'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { languages } from '@/lib/translations'

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:opacity-80 transition-opacity"
        style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff' }}
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium">{currentLanguage?.name}</span>
        <span className="text-xs">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border z-50 min-w-48">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 px-3 py-2 border-b">
              {t('selectLanguage')}
            </div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as any)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 rounded-md transition-colors ${
                  language === lang.code ? 'bg-green-50 text-green-700' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {language === lang.code && <span className="ml-auto text-green-600">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}