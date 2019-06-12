import React from 'react'
import { Container } from 'next/app'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Wrapper from '../components/Wrapper'
import { reducer } from '../store'

const store = createStore(reducer)

const App = ({ Component, pageProps }) => {
  return (
    <Container>
      <Provider store={store}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </Provider>
    </Container>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps }
}

export default App
