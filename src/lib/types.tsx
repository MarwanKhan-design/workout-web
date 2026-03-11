export interface User {
  _id: string
  name: string
  email: string
  age: number
}

export interface Exercise {
  _id: string
  name: string
  category: string
  muscleGroup: string
  equipment: string
  description: string
}

export interface Workout {
  _id?: string
  userId: string
  name: string
  description: string
  exercises: string[]
}