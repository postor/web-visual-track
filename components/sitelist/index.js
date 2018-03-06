import { Component } from 'react'
import { connect } from 'node-realtime-db-react'
import { Row, Col, CardPanel, Section, Button, Input } from 'react-materialize'
import Icon from 'react-fontawesome'
import swal from 'sweetalert'
import { SITE_LIST_KEY } from './define'
import SiteCard from './SiteCard'

class SiteList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: 'https://github.com/postor/web-visual-track/wiki'
    }
  }

  render() {
    const { sites = [], io, set } = this.props
    const { url } = this.state
    return (<div>
      <h1>My Sites:</h1>
      <Row>
        {!!sites.length && sites.map((site, i) => (<Col s={12} m={6} key={i}>
          <SiteCard remove={() => set(SITE_LIST_KEY, [i, 1], 'splice')} site={site} index={i} />
        </Col>))}
        {!sites.length && (<CardPanel className="teal lighten-4 black-text">
          <span>You do not have any sites now, Please add one.</span>
        </CardPanel>)}
      </Row>
      <Row>
        <Input
          s={12}
          type="url"
          value={url}
          placeholder="https://github.com/postor/web-visual-track/wiki"
          onChange={(e) => this.setState({ url: e.target.value })}
        />
        <Button waves='light' onClick={() => this.add()}><Icon name='plus' /> Add One</Button>
      </Row>
    </div>)
  }

  add() {
    const { url } = this.state
    const { set, sites } = this.props
    if (url) {
      if (sites.some((x) => x.url == url)) {
        swal("Oops!", "Url already exist!", "error")
        return
      }
      set(SITE_LIST_KEY, { url }, 'push')
      this.setState({ url: '' })
    }
  }
}

export default connect({ sites: SITE_LIST_KEY })(SiteList)