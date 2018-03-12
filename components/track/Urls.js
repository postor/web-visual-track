import { Section, Collection, CollectionItem } from 'react-materialize'
import Icon from 'react-fontawesome'
import { Component } from 'react'
import $ from 'jquery'

const style = { float: 'right', cursor: 'pointer' }


class Urls extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  render() {
    const { site, urls, set, dataPath } = this.props
    const { loading } = this.state
    return (<Section>
      <Collection header='urls'>
        {urls.map((val, i) => {
          const { href, enabled = true } = typeof val == 'string' ? { href: val } : val
          const setUrlEnabled = (enabled) => {
            this.setState({ loading: true })
            set(`${dataPath}.${i}`, { href, enabled }).then(() => {
              return $.ajax({
                type: "POST",
                url: '/write-file',
                data: JSON.stringify({
                  ...site,
                  logs: [],
                }),
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
              })
            }).then(() => this.setState({ loading: false }))
          }
          return (<CollectionItem key={i}>
            {!loading && (enabled
              ? (<a style={style} onClick={() => setUrlEnabled(false)}><Icon name='toggle-on' /> disable</a>)
              : (<a style={style} onClick={() => setUrlEnabled(true)}><Icon name='toggle-off' /> enable</a>))}
            <span>{href}</span>
          </CollectionItem>)
        })}
      </Collection>
    </Section>)

  }
}



export default Urls