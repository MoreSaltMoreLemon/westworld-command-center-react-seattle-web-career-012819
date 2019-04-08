import React from 'react'
import { Segment, Button } from 'semantic-ui-react';


class LogPanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activateAll: true
    }
  }

  toggleHostActiveAll = () => {
    const activateAll = this.state.activateAll
    this.props.toggleHostActiveAll(activateAll)
    this.setState({activateAll: !activateAll})
  }

  printLogs = () => {
    const logs = this.props.logs.slice()
    return logs
      .reverse()
      .map((log, i) => 
        <p 
          key={i} 
          className={log.type}
        >{log.msg}</p>
      )
  }

  render() {
    return(
      <Segment className="HQComps" id="logPanel">
        <pre>
          {this.printLogs()}
        </pre>
        
        <Button
          fluid
          color={this.state.activateAll ? "red" : "green"}
          content={this.state.activateAll ? "ACTIVATE ALL" : "DEACTIVATE ALL"}
          onClick={this.toggleHostActiveAll}
        />
      </Segment>
    )
  }
}

export default LogPanel
