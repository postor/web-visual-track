import 'babel-polyfill'
import Head from 'next/head'
import { Container, Row, Col } from 'react-materialize'
import { Provider } from 'node-realtime-db-react'

import Header from './Header'
import Footer from './Footer'

export default (Page) => (props) => (<Provider>
  <div>
    <Head>
      <link rel="stylesheet" href="/css/font-awesome.min.css" />
      <link rel="stylesheet" href="/css/materialize.min.css" />
      <title>web visual track</title>
    </Head>
    <Header />
    <Container>
      <Page url={props.url} />
      <p>{JSON.stringify(props)}</p>
    </Container>
    <Footer />
  </div>
</Provider>)