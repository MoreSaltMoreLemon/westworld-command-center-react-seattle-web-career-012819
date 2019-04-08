import React from 'react';
import Host from './Host.js'
import HostList from './HostList.js'

import '../stylesheets/Area.css'

const Area = ({area, hosts, selectHost}) => {
  const hostCards = hosts
      .filter(host => 
        host.area === area.name 
        && host.active
      )
      .map(host => 
        <Host 
          key={host.name} 
          host={host}
          selectHost={selectHost} 
        />)  

  const name = area.name
                .split(' ')
                .map(word => {
                  return word[0].toUpperCase() + word.slice(1)
                })
                .join(' ')

  return (
    <div className='area' id={area.name}>
      <h3 className='labels'>{name}</h3>
      <HostList hosts={hostCards} />
    </div>
  )
}

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;


// Area : {
// auth_req: false
// id: 6
// limit: 10
// name: "badlands"
// }
