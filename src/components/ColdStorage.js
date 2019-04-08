import React from 'react';
import { Segment } from 'semantic-ui-react'
import HostList from './HostList'
import Host from './Host.js'

const ColdStorage = ({hosts, selectHost}) => {  
  hosts = hosts
      .filter(host => !host.active)
      .map(host => 
        <Host 
          key={host.name} 
          host={host}
          selectHost={selectHost} 
        />)  


  return (
    <Segment className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
        <HostList hosts={hosts} />
      </Segment>
    </Segment>
  )
}

export default ColdStorage
