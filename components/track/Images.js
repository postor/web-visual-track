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
        return {
          src: x,
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
      {!!diff.length && (<Section>
        <h3>diff</h3>
        <div className="cards-container">
          {diff.map((x, i) => (<ImageCard key={i} {...x} />))}
        </div>
      </Section>)}
      {!!generated.length && (<Section>
        <h3>generated</h3>
        <div className="cards-container">
          {generated.map((x, i) => (<ImageCard key={i} {...x} />))}
        </div>
      </Section>)}
      <style jsx global>{`
      .cards-container {
        column-break-inside: avoid;
      }
      .cards-container .card {
        display: inline-block;
        overflow: visible;
      }
      
      @media only screen and (max-width: 600px) {
        .cards-container {
          -webkit-column-count: 1;
          -moz-column-count: 1;
          column-count: 1;
        }
      }
      @media only screen and (min-width: 601px) {
        .cards-container {
          -webkit-column-count: 2;
          -moz-column-count: 2;
          column-count: 2;
        }
      }
      @media only screen and (min-width: 993px) {
        .cards-container {
          -webkit-column-count: 3;
          -moz-column-count: 3;
          column-count: 3;
        }
      }
      
      `}</style>
    </div>)
  }
}

export default Images