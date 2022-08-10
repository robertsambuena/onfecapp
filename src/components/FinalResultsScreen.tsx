import { FC } from 'react'
import { Shoe } from './types'
import './FinalResultsScreen.css'

type ShoeWidgetProps = {
  shoe: Shoe
}

export const ShoeWidget: FC<ShoeWidgetProps> = ({ shoe }) => {
  return (
    <div className="final-results-screen__shoe-widget">
      <img src={`${process.env.PUBLIC_URL}/assets/${shoe.name}.png`} />
      {shoe.name}
    </div>
  )
}

type FinalResultsScreenProps = {
  shoesWithRatings: Shoe[]
  onReset: () => void
}

export const FinalResultsScreen: FC<FinalResultsScreenProps>= ({ shoesWithRatings, onReset }) => {
  const sortedShoes = shoesWithRatings.sort((a, b) => b.rating - a.rating)

  const topShoe = sortedShoes.shift()

  if (!topShoe) return <h3>No shoe</h3>

  return (
    <article className="final-results-screen">
      <h3>Congratulations!</h3>
      <p>Based on your selection, we've decided on the Cloudventure and Cloudflyer! Enjoy your 30 day trial!</p>
      <ShoeWidget shoe={topShoe}/>
      <h4>Similar Profiles</h4>
      {sortedShoes
        .slice(0, 2)
        .map((shoe) => {
        return <ShoeWidget shoe={shoe}/>
      })}
      <a onClick={onReset}>Restart Quiz</a>
    </article>
  )
}
