import React from 'react'
import { useQuery } from 'react-query'
import { getTokenList } from './ressource'
import TokenTable from './tokenTable/tokenTable'

const Home: React.FC = () => {
  const { data: tokens, isLoading } = useQuery<Token[]>(
    'getTokenList',
    getTokenList
  )

  if (tokens === undefined || isLoading) {
    return <p>Loading ...</p>
  }

  console.log(tokens)

  return (<div>
    <TokenTable tokens={tokens} />
    </div>)
}

Home.displayName = 'Home'

export default Home
