import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = ({host, selectHost}) => {
  return(
    <Card
      className={"host" + (host.selected ? ' selected': '')}
      onClick={() => selectHost(host)}
      image={host.imageUrl}
      raised
    />
  )
}

export default Host


// Host : {
// active: false
// area: "badlands"
// authorized: false
// firstName: "Musashi"
// gender: "Male"
// id: 15
// imageUrl: "https://vignette.wikia.nocookie.net/westworld/images/6/6b/Musashi_Akane_No_Mai.jpg/revision/latest/scale-to-width-down/310?cb=20180520131337"
// lastName: "n/a"
// }