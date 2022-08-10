import { FC, useEffect, useState } from 'react'
import { MultipleChoices } from './MultipleChoices'
import { Question, RatingsMap } from './types'
import './QuestionScreen.css'

const increaseRatings = (ratings: any, ratingIncrease: any) => {
  for (const [key, value] of Object.entries(ratings)) {
    ratings[key] = value + ratingIncrease[key]
  }

  return ratings
}

type QuestionScreenProps = {
  questions: Question[]
  initialRatingsMap: RatingsMap
  onFinished: (ratings: RatingsMap) => void
}

export const QuestionScreen: FC<QuestionScreenProps> = ({
  questions,
  initialRatingsMap,
  onFinished,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question>()
  const [answeredQuestions, setAnsweredQuestions] = useState<{[key: string]: boolean}>({})
  const [ratings, setRatings] = useState<RatingsMap>(initialRatingsMap)

  const handleAnswer = (answer: any) => {
    setRatings(increaseRatings(ratings, answer.ratingIncrease))

    if (currentQuestion) {
      setAnsweredQuestions({
        ...answeredQuestions,
        ...{[currentQuestion.id]: true}
      })
    }

    // maybe prevent the questions from looping?
    // or is it too much for this challenge?
    // we'll find out!
    // const nextQuestion = answeredQuestions[answer.nextQuestion] ? questions[answer.nextQuestion] : null
    const nextQuestion = questions[answer.nextQuestion]

    if (nextQuestion) {
      setCurrentQuestion(nextQuestion)
    } else {
      onFinished(ratings)
    }
  }

  useEffect(() => {
    if (questions && questions.length) setCurrentQuestion(questions[0])
  }, [questions])

  if (!questions || !currentQuestion) return <>Empty questions</>

  return (
    <main className="question-screen">
      {currentQuestion.copy}
      <MultipleChoices
        answers={currentQuestion.answers}
        onAnswer={handleAnswer}
      />
    </main>
  )
}
