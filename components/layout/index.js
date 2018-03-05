import 'babel-polyfill'
import Head from 'next/head'
import { Container, Row, Col } from 'react-materialize'
import { Provider } from 'node-realtime-db-react'

import Header from './Header'
import Footer from './Footer'

export default (Page) => () => (<Provider>
  <div>
    <Head>
      <title>web visual track</title>
      <link rel="stylesheet" href="/css/materialize.min.css" />
    </Head>
    <Header />
    <Container>
      <Page />
    </Container>
    <Footer />
  </div>
</Provider>)