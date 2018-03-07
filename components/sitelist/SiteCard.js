import Icon from 'react-fontawesome'
import { Card } from 'react-materialize'
import Link from 'next/link'

export default (props) => {
  const { remove, site, index } = props
  const className = typeof site.pass == 'undefined' ? 'blue-grey darken-1' : site.pass ? 'green-grey darken-1' : 'red-grey darken-1'

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
    <p>I am a very simple card.</p>
  </Card>)

}