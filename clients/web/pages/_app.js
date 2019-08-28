import React from 'react'
import { Container } from 'next/app'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'
import store from '../store'
import Wrapper from '../components/Wrapper'
import serveStaticFile from '../utils/file-serving'

const App = ({ Component, pageProps }) => {
  return (
    <Container>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={serveStaticFile('/static/favicon.ico')} />
      </Helmet>
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
