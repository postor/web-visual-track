import Icon from 'react-fontawesome'
import moment from 'moment'
import { Card } from 'react-materialize'
import Link from 'next/link'

export default (props) => {
  const { remove, site = {}, index } = props
  const { pass, lastTrackTime } = site
  const className = typeof pass == 'undefined' ? 'blue-grey darken-1' : pass ? 'green darken-2' : 'red darken-1'
  const word = `${moment.unix(lastTrackTime).fromNow()} ${pass ? 'Passed!' : 'Failed'}`

  return (<Card
    className={className}
    textClassName='white-text'
    title={site.url}
    actions={[
      (<Link key="view" href={`/track?index=${index}`}><a>
        <Icon name="eye" />
        <i> View</i>
      </a></Link>),
      (<a key="delete" onClick={() => remove()}>
        <Icon name="trash" />
        <i> Delete</i>
      </a>),
    ]}
  >
    <p>{word}</p>
  </Card>)

}