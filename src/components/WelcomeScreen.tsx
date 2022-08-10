import { FC } from 'react'
import './WelcomeScreen.css'

type WelcomeScreenProps = {
  onStart: () => void
}

export const WelcomeScreen: FC<WelcomeScreenProps> = ({onStart}) => {
  return (
    <main className="welcome-screen" style={{
      backgroundImage: process.env.PUBLIC_URL + '/assets/Background Image Start Screen.png'
    }}>
      <h3>Take the quiz and try your first pair!</h3>
      <button onClick={onStart}>Try On Trial</button>
      <img className="welcome-screen__bg" src={process.env.PUBLIC_URL + '/assets/Background Image Start Screen.png'} />
    </main>
  )
}
