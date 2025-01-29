export type New = {
  id: number
  title: string
  description: string
  level: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
}

export type Event = {
  id: number
  title: string
  startAt: string
  endAt: string
  createdAt: string
  updatedAt: string
}

export type Slide = {
  id: number
  order: number | null
  imageUrl: string
  createdAt: string
  updatedAt: string
}
