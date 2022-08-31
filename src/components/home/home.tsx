import NavigationButton from 'components/fragments/navigationButton/navigationButton'
import React from 'react'
import TokenTable from 'components/home/tokenTable/tokenTable'
import { getTokenList } from 'components/home/ressource'
import style from './style.module.scss'
import { useQuery } from 'react-query'

const Home: React.FC = () => {
  const { data: tokens, isLoading } = useQuery<Token[]>(
    'getTokenList',
    getTokenList
  )

  // @TODO: had a loader component
  if (isLoading) {
    return <p className={style.loader}>...</p>
  }

  // @TODO: had an error handler component
  if (tokens === undefined) {
    return <p>Error while loading data</p>
  }

  return (
    <div className={style.home}>
      <NavigationButton to="/" label="Go to swap" />
      <TokenTable tokens={tokens} />
    </div>
  )
}

Home.displayName = 'Home'

export default Home
