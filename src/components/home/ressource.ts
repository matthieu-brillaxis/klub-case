import API from 'helpers/api'

// @TODO: type payload later
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getTokenList = async () => {
  const { data } = await API.get('tokens/v2/all')
  return data
}

export { getTokenList }
