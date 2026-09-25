import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { yearData, formatNumber } from '../../utils/impactData'

export default function ProgresoPorAnoChart() {
  return (
    <ResponsiveContainer width="100%" height={420}>
      <BarChart data={yearData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
        <XAxis dataKey="year" stroke="var(--color-text-light)" tick={{ fill: 'var(--color-text-light)' }} />
        <YAxis stroke="var(--color-text-light)" tick={{ fill: 'var(--color-text-light)' }} tickFormatter={formatNumber} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--color-primary)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
          }}
          labelStyle={{ color: 'white', fontWeight: 'bold' }}
          itemStyle={{ color: '#ffffff' }}
        />
        <Legend />
        <Bar dataKey="bonos" name="Bonos de almuerzo" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="beneficiarios" name="Beneficiarios" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="kits" name="Kits de aseo" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="gorros" name="Gorros" fill="var(--color-text-light)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
