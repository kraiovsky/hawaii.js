import React from 'react'
import { Container } from 'next/app'
import Wrapper from '../components/Wrapper'
import { StateProvider, initialState, reducer } from '../store'

const App = ({ Component, pageProps }) => {
  return (
    <Container>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </StateProvider>
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
