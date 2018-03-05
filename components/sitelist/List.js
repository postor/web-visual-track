export default ({ sites, remove }) => {
  return (<Row>
    {sites.map((site, i) => (<Col s={12} m={6} key={i}>
      <Card
        className='blue-grey darken-1'
        textClassName='white-text'
        title='Card title'
        actions={[(<a href='#'>Edit</a>), (<a href='#'>Remove</a>)]}
      >
        <p>I am a very simple card.</p>
      </Card>
    </Col>))}
  </Row>)
}