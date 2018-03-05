import { Row, Col, Card, CardPanel } from 'react-materialize'
import { connect } from 'node-realtime-db-react'
import { SITE_LIST_KEY } from './define'

const SiteList = ({ sites = [], io }) => {
  if (sites.length) {
    return (<Row>
      {sites.map((site, i) => (<Col s={12} m={6} key={i}>
        <Card
          className='blue-grey darken-1'
          textClassName='white-text'
          title='Card title'
          actions={[<a href='#'>This is a link</a>]}
        >
          I am a very simple card.
        </Card>
      </Col>))}
    </Row>)
  }

  return (<CardPanel className="teal lighten-4 black-text">
    <span>You do not have any sites now, Please .</span>
  </CardPanel>)
}

export default connect({ sites: SITE_LIST_KEY })(SiteList)