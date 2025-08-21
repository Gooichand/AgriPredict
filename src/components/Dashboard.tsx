'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import SignOutButton from './SignOutButton'
import YieldChart from './YieldChart'
import AlertMap from './AlertMap'

interface DashboardProps {
  user: any
}

interface YieldPrediction {
  id: number
  predicted_yield: number
  created_at: string
  district_id: number
}

interface WeatherAlert {
  id: number
  alert_type: string
  severity: string
  message: string
  created_at: string
}

export default function Dashboard({ user }: DashboardProps) {
  const [yieldPrediction, setYieldPrediction] = useState<YieldPrediction | null>(null)
  const [alerts, setAlerts] = useState<WeatherAlert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch latest yield prediction
        const { data: yieldData } = await supabase
          .from('yield_predictions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single()
        
        if (yieldData) setYieldPrediction(yieldData)

        // Fetch weather alerts
        const { data: alertsData } = await supabase
          .from('weather_alerts')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (alertsData) setAlerts(alertsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">AgriPredict Dashboard</h1>
          <SignOutButton />
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Welcome, {user.email}</h2>
        
        {loading ? (
          <div className="text-center py-8">Loading dashboard data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Predicted Yield</h3>
              <p className="text-3xl font-bold text-green-600">
                {yieldPrediction ? `${yieldPrediction.predicted_yield} tons/acre` : '5.2 tons/acre'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Weather Alerts</h3>
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <div key={alert.id} className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500 mb-2">
                    <p className="font-semibold">{alert.alert_type}</p>
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-gray-500">Severity: {alert.severity}</p>
                  </div>
                ))
              ) : (
                <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
                  <p className="font-semibold">Drought</p>
                  <p className="text-sm">Low rainfall expected</p>
                </div>
              )}
            </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Yield Trends</h3>
            <YieldChart />
          </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Yield Trends</h3>
              <YieldChart />
            </div>
          </div>
        )}

        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Alert Map</h3>
          <AlertMap />
        </div>
      </main>
    </div>
  )
}