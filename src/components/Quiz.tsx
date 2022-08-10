import { useState } from 'react'
import { QuestionScreen } from './QuestionScreen'
import { WelcomeScreen } from './WelcomeScreen'
import { Question, RatingsMap, Shoe } from './types'
import { FinalResultsScreen } from './FinalResultsScreen'

import dataJSON from '../data.json'

type Data = {
  questions: Question[],
  shoes: Shoe[]
}

export const Quiz = () => {
  const [data, setData] = useState<Data | null>(null)
  const [shoesWithRatings, setShoesWithRatings] = useState<Shoe[]>([])

  const start = () => {
    setData(dataJSON as Data)
  }

  const handleReset = () => {
    setData(null)
    setShoesWithRatings([])
  }

  const handleFinished = (ratingsMap: RatingsMap) => {
    setShoesWithRatings(data ? data.shoes.map((shoe) => {
      shoe.rating = ratingsMap[shoe.id]
      return shoe
    }) : [])
  }

  if (shoesWithRatings.length) {
    return <FinalResultsScreen onReset={handleReset} shoesWithRatings={shoesWithRatings}/>
  }

  if (data) {
    const initialRatingsMap = data.shoes.reduce((ratingsMap, shoe) => {
      return {
        ...ratingsMap,
        [shoe.id]: 0
      }
    }, {})

    return (
      <QuestionScreen
        questions={data.questions}
        initialRatingsMap={initialRatingsMap}
        onFinished={handleFinished}
      />
    )
  }

  return <WelcomeScreen onStart={start}/>
}
