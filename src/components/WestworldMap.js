import React from 'react';
import { Segment } from 'semantic-ui-react';


import Area from './Area.js'

const WestworldMap = ({areas, hosts, selectHost}) => {
    const mappedAreas = areas.map(area => 
      <Area 
        key={area.name}
        area={area} 
        hosts={hosts} 
        selectHost={selectHost} 
      />
    )


  return (
    <Segment id="map" >
      {mappedAreas}
    </Segment>
  )
}

export default WestworldMap
