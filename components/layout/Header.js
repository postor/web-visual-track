import { Component } from 'react'
import Link from 'next/link'
import Icon from 'react-fontawesome'
import $ from 'jquery'
import prisist from 'next-prisist-state'

const serverSide = typeof window == 'undefined'

class Menu extends Component {

  constructor(props) {
    super(props)
    if (serverSide) return

    const callback = (e) => {
      const { setPrisist, prisisted = {} } = this.props
      const { slideOpen = false } = prisisted
      if (e.target == this.buttonCollpase || e.target.parentNode == this.buttonCollpase) {
        setPrisist({ slideOpen: !slideOpen })
        return
      }

      if (slideOpen) {
        setPrisist({ slideOpen: false })
      }
    }
    $(document).click(callback)
    this._toClean = [() => $(document).unbind('click', callback)]
  }

  componentWillUnmount() {
    if (serverSide) return
    this._toClean.forEach(x => x())
  }

  render() {
    const { setPrisist, prisisted = {} } = this.props
    const { slideOpen = false } = prisisted
    const sideNavStyle = {
      transition: '0.6s ease',
      transform: slideOpen ? 'translateX(0px)' : 'translateX(-100%)',
    }

    return (<nav>
      <div className="nav-wrapper">
        <div className="col s12">
          <Link href="/">
            <a className="brand-logo">
              <span style={{ padding: '0 10px' }}>Home</span>
            </a>
          </Link>
          <ul className="right hide-on-med-and-down">
            <li>
              <a target="_blank" href="https://github.com/postor/web-visual-track">GitHub</a>
            </li>
            <li>
              <a target="_blank" href="https://github.com/postor/web-visual-track/issues/new">New Issue</a>
            </li>
          </ul>
          <ul className="side-nav" style={sideNavStyle}>
            <li>
              <a href="https://github.com/postor/web-visual-track">GitHub</a>
            </li>
            <li>
              <a href="https://github.com/postor/web-visual-track/issues/new">New Issue</a>
            </li>
          </ul>
          <a
            ref={(el) => this.buttonCollpase = el}
            className="button-collapse"
          >
            <Icon name="bars" style={{
              fontSize: '2em',
              lineHeight: '56px',
              tag: 'a',
            }} />
          </a>
        </div>
      </div>
    </nav>)
  }
}


const connect = prisist({
  defaultState: { slideOpen: false }
})

export default connect(Menu)