'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface YieldChartProps {
  crop?: string
}

export default function YieldChart({ crop = 'general' }: YieldChartProps) {
  const cropData: { [key: string]: number[] } = {
    rice: [3.8, 4.1, 4.6, 4.9, 5.3],
    wheat: [2.5, 2.8, 3.2, 3.5, 3.8],
    corn: [5.2, 5.6, 6.1, 6.4, 6.8],
    cotton: [1.2, 1.4, 1.6, 1.8, 2.0],
    sugarcane: [38.5, 40.2, 42.1, 43.8, 45.2],
    soybean: [2.1, 2.3, 2.5, 2.7, 2.8],
    general: [4.2, 4.5, 5.0, 5.2, 5.7]
  }

  const data = [
    { month: 'Jan', yield: cropData[crop]?.[0] || cropData.general[0] },
    { month: 'Feb', yield: cropData[crop]?.[1] || cropData.general[1] },
    { month: 'Mar', yield: cropData[crop]?.[2] || cropData.general[2] },
    { month: 'Apr', yield: cropData[crop]?.[3] || cropData.general[3] },
    { month: 'May', yield: cropData[crop]?.[4] || cropData.general[4] },
  ]

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="yield" stroke="#16a34a" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}