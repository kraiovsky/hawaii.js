import React from 'react'
import { Container } from 'next/app'
import { Provider } from 'react-redux'
import store from '../store'
import Wrapper from '../components/Wrapper'

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
