import { Component } from 'react'
import $ from 'jquery'
import { Row, Col, Section } from 'react-materialize'
import url2folder from '../../cmds/lib/url2folder'
import ImageCard from './ImageCard'

class Images extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  componentWillMount() {
    this.reload()
  }

  async reload() {
    const { baseUrl, urls } = this.props
    const urlNames = urls.map(x => `${url2folder(x)}.`)

    const data = await $.getJSON('/list-images', { baseUrl })
    const { generated = [], diff = [] } = data

    this.setState({
      generated: getDic(generated),
      diff: getDic(diff),
    })

    function getDic(arr) {
      return arr.map((x) => {
        const index = urlNames.findIndex((y) => x.includes(y))
        return {
          src: x,
          url: urls[index],
        }
      })
    }
  }

  render() {
    const {
      generated = [],
      diff = [],
    } = this.state

    return (<div>
      {!!generated.length && (<Section>
        <h3>generated</h3>
        <Row>
          {generated.map((x, i) => (<Col s={6} m={4} l={3} key={i}>
            <ImageCard {...x} />
          </Col>))}
        </Row>
      </Section>)}
      {!!diff.length && (<Section>
        <h3>diff</h3>
        <Row>
          {diff.map((x, i) => (<Col s={6} m={4} l={3} key={i}>
            <ImageCard {...x} />
          </Col>))}
        </Row>
      </Section>)}
    </div>)
  }
}

export default Images