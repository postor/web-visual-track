import { Navbar, NavItem } from 'react-materialize'

export default () => (<Navbar brand={(<span style={{padding: '0 10px'}}>Home</span>)} right>
  <NavItem>Getting started</NavItem>
  <NavItem>Components</NavItem>
</Navbar>)