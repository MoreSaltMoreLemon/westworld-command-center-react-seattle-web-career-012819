import React from 'react'
import { Segment, Image } from 'semantic-ui-react'

import HostInfo from './HostInfo.js'
import * as Images from '../services/Images'


const Details = ({areas, selectedHost, moveHost, toggleHostActive}) => {
  const showSplash = selectedHost ? false : true

  const renderSplash = () => (<Image size='medium' src={Images.westworldLogo}/>)

  return(
    <Segment id="details" className="HQComps">
      {showSplash ?
        renderSplash() :
        <HostInfo 
          selectedHost={selectedHost} 
          areas={areas}
          moveHost={moveHost}
          toggleHostActive={toggleHostActive}
        />
      }
    </Segment>
  )
}

export default Details
