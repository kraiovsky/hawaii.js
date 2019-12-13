import React from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import Wrapper from '../components/Wrapper'

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  )
}

export default App
