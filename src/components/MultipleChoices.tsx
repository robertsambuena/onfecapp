import { FC } from 'react'
import { Answer } from './types'
import './MultipleChoices.css'

type QuestionProps = {
  answers: Answer[]
  onAnswer: (answer: Answer) => void
}

export const MultipleChoices: FC<QuestionProps> = ({answers, onAnswer}) => {
  if (!answers || !answers.length) return null

  return (
    <section className="multiple-choices">
      {answers.map((answer) => (
        <button
          className="multiple-choices__button"
          key={answer.id}
          onClick={() => onAnswer(answer)}
        >
          {answer.copy}
        </button>
      ))}
    </section>
  )
}
