import { Section } from 'react-materialize'
import layout from '../components/layout'
import getPage from '../components/track'

const Track = ({ url = {} }) => {
  const { query = {} } = url
  const { index } = query
  const Page = getPage(index)
  return (<Section>
    <Page index={index} />
  </Section>)
}

export default layout(Track)