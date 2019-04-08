import React from 'react'
import { Container } from 'next/app'
import Layout from '../components/Layout'
import { StateProvider, initialState, reducer } from '../store'

const App = ({ Component, pageProps }) => {
  return (
    <Container>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateProvider>
    </Container>
  )
}

export default App
