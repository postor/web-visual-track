import { Section } from 'react-materialize'
import layout from '../components/layout'
import SiteList from '../components/sitelist'

const Index = () => (<Section>
  <SiteList />
</Section>)

export default layout(Index)