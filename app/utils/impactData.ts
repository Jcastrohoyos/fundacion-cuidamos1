export type ImpactRow = {
  year: string
  bonos: number
  beneficiarios: number
  kits: number
  gorros: number
}

export type ImpactMetric = 'bonos' | 'beneficiarios' | 'kits' | 'gorros'

export const yearData: ImpactRow[] = [
  { year: '2022', bonos: 256, beneficiarios: 128, kits: 0, gorros: 0 },
  { year: '2023', bonos: 4417, beneficiarios: 1472, kits: 0, gorros: 0 },
  { year: '2024', bonos: 8463, beneficiarios: 2628, kits: 252, gorros: 720 },
  { year: '2025', bonos: 14482, beneficiarios: 3367, kits: 286, gorros: 395 },
  { year: 'Ene-Ago 2026', bonos: 6714, beneficiarios: 1676, kits: 146, gorros: 223 },
]

const sumMetric = (metric: ImpactMetric): number =>
  yearData.reduce((total, row) => total + row[metric], 0)

export const totals: Record<ImpactMetric, number> & {
  actividades: number
  corte: string
} = {
  bonos: sumMetric('bonos'),
  beneficiarios: sumMetric('beneficiarios'),
  kits: sumMetric('kits'),
  gorros: sumMetric('gorros'),
  actividades: 88,
  corte: 'agosto de 2026',
}

export const formatNumber = (value: number): string =>
  value.toLocaleString('es-CO')
