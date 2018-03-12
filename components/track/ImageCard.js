import Icon from 'react-fontawesome'
import { Card, CardTitle, Modal } from 'react-materialize'

export default (props) => {
  const { url, src } = props

  return (<Card
    header={(<Modal
      header={url}
      fixedFooter
      trigger={<CardTitle image={src} />}>
      <img src={src} />
    </Modal>)}
    actions={[(<Modal
      key="eye"
      header={url}
      fixedFooter
      trigger={<a>
        <Icon name="eye" />
        <i> View</i>
      </a>}>
      <img src={src} />
    </Modal>)]}
  >
    <p>{url}</p>
  </Card>)

}