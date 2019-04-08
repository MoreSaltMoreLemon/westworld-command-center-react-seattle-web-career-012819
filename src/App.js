import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import Headquarters from './components/Headquarters.js'
import WestworldMap from './components/WestworldMap.js'
import { Log } from './services/Log'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hosts: [],
      areas: [],
      selectedHost: false,
      logs: []
    }
  }

  componentDidMount() {
    httpRequest("http://localhost:4000/hosts")
      .then(res => res.json())
      .then(hosts => {
        hosts = hosts.map(host => {
          host.selected = false
          return host
        })
        this.setState({hosts})
      })
    
    httpRequest("http://localhost:4000/areas")
      .then(res => res.json())
      .then(areas => this.setState({areas}))
  }

  selectHost = (selectedHost) => {
    const hosts = this.state.hosts.map(host => {
      host.selected = host.id === selectedHost.id ? true : false
      return host
    })
    this.setState({selectedHost, hosts})
  }

  moveHost = (selectedHost, moveToArea) => {
    const hostsInArea = this.state.hosts.reduce((acc, host) => {
      return acc += host.area === moveToArea ? 1 : 0 
    }, 0)

    const areaProperties = this.state.areas.find(area => area.name === moveToArea)
    const logs = this.state.logs
    if (hostsInArea && areaProperties && hostsInArea < areaProperties.limit) {
      const hosts = this.state.hosts.map(host => {
        if (host.id === selectedHost.id) host.area = moveToArea
        return host
      })

      let msg = Log.notify(`${selectedHost.firstName} set in area ${capitalize(moveToArea)}`)
      logs.push(msg)

      this.setState({hosts, selectedHost, logs})
    } else {
      let msg = Log.warn(`${capitalize(moveToArea)} is full!`)
      logs.push(msg)
    }
  }

  toggleHostActive = (toggledHost) => {
    const hosts = this.state.hosts.map(host => {
      if (host.id === toggledHost.id) host.active = !host.active
      return host
    })

    const logs = this.state.logs
    let msg = Log.warn(`Activated ${toggledHost.firstName}!`)
    if (toggledHost.active) msg = Log.notify(`Decomissioned ${toggledHost.firstName}.`)
    logs.push(msg)

    this.setState({ hosts, logs })
  }

  toggleHostActiveAll = (predicate) => {
    const hosts = this.state.hosts.map(host => {
      host.active = predicate
      return host
    })
    const logs = this.state.logs
    let msg = Log.notify("Decommissiong all hosts.")
    if (predicate) msg = Log.warn("Activating all hosts!")
    logs.push(msg)

    this.setState({ hosts, logs })
  }
  

  render(){
    console.log("APP: STATE", this.state)
    return (
      <Segment id='app'>
        <WestworldMap 
          areas={this.state.areas} 
          hosts={this.state.hosts}
          selectHost={this.selectHost}
        />
        <Headquarters
          areas={this.state.areas}
          hosts={this.state.hosts}
          selectHost={this.selectHost}
          selectedHost={this.state.selectedHost}
          moveHost={this.moveHost}
          toggleHostActive={this.toggleHostActive}
          toggleHostActiveAll={this.toggleHostActiveAll}
          logs={this.state.logs}
        />
      </Segment>
    )
  }
}

export default App;

function httpRequest(url, method='GET', data={}) {
  const init = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: method,
    body: JSON.stringify(data)
  }
  if (method.toLowerCase() === 'get') delete init.body;
  else if (method.toLowerCase() === 'post' && init.body.id) delete init.body.id;

  return fetch( url, init);
}

function capitalize(string) {
  return string
          .split(/[ _-]/g)
          .map(word => word[0].toUpperCase() + word.slice(1))
          .join(' ')
}