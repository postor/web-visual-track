import Icon from 'react-fontawesome'
import { Card, CardTitle, Modal } from 'react-materialize'

export default (props) => {
  const { src } = props

  return (<Card
    header={(<Modal
      header={src}
      fixedFooter
      trigger={<CardTitle image={src} />}>
      <img src={src} />
    </Modal>)}
    actions={[(<Modal
      key="eye"
      header={src}
      fixedFooter
      trigger={<a>
        <Icon name="eye" />
        <i> View</i>
      </a>}>
      <img src={src} />
    </Modal>)]}
  >
    <p>{src}</p>
  </Card>)

}