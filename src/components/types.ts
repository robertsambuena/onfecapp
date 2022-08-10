export interface Answer {
  id: number,
  copy: string,
  nextQuestion: number,
  ratingIncrease: RatingsMap
}

export interface Question {
  id: number
  copy: string
  answers: Answer[]
}

export type RatingsMap = {
  [key: string]: number
}

export interface Shoe {
  id: string
  name: string
  rating: number
}
