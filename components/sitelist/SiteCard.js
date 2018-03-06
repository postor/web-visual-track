import Icon from 'react-fontawesome'
import { Card } from 'react-materialize'

export default (props) => {
  const { remove, site } = props
  return (<Card
    className='blue-grey darken-1'
    textClassName='white-text'
    title={site.url}
    actions={[
      (<a href='#'>
        <Icon name="eye" />
        <i> View</i>
      </a>),
      (<a onClick={() => remove()}>
        <Icon name="trash" />
        <i> Delete</i>
      </a>),
    ]}
  >
    <p>I am a very simple card.</p>
  </Card>)

}