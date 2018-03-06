import 'babel-polyfill'
import Head from 'next/head'
import { Container, Row, Col } from 'react-materialize'
import { Provider } from 'node-realtime-db-react'

import Header from './Header'
import Footer from './Footer'

export default (Page) => () => (<Provider>
  <div>
    <Head>
      <link rel="stylesheet" href="/css/font-awesome.min.css" />
      <link rel="stylesheet" href="/css/materialize.min.css" />      
      <title>web visual track</title>
    </Head>
    <Header />
    <Container>
      <Page />
    </Container>
    <Footer />
  </div>
</Provider>)