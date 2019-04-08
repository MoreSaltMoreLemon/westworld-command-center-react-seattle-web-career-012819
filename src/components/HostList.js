import React from 'react'
import { Card } from 'semantic-ui-react'

const HostList = ({hosts}) => {

  return(
    <Card.Group itemsPerRow={6}>
      {hosts}
    </Card.Group>
  )
}

export default HostList
