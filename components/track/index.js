import { Button } from 'react-materialize'
import { connect } from 'node-realtime-db-react'
import { SITE_LIST_KEY } from '../sitelist/define'
import { getOptions, actions } from '../../cmds'


const Track = (props) => {
  const { site, io } = props
  if (!site) {
    return (<h1>site not found !</h1>)
  }

  const { url } = site

  return (<div>
    <h1>{url}</h1>
    {getOptions(site).map((opt, i) => {
      const { title } = actions[opt]
      return (<Button key={i}>{title}</Button>)
    })}
    <p>{JSON.stringify(getOptions(site))}</p>
  </div>)
}

export default (index) => {
  return connect({ site: `${SITE_LIST_KEY}.${index}` })(Track)
}