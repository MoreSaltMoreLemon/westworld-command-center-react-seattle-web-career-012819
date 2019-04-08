import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage.js'
import LogPanel from './LogPanel.js'



class Headquarters extends Component {

  render(){
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
          <ColdStorage 
            hosts={this.props.hosts}
            selectHost={this.props.selectHost}
          />
        </Grid.Column>
        <Grid.Column width={5}>
          <Details 
            areas={this.props.areas}
            selectedHost={this.props.selectedHost}  
            moveHost={this.props.moveHost}
            toggleHostActive={this.props.toggleHostActive}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <LogPanel 
            toggleHostActiveAll={this.props.toggleHostActiveAll}
            logs={this.props.logs}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
