import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'

class HostInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedArea: this.props.selectedHost.area,
      active: this.props.selectedHost.active
    }
  }

  handleChange = (e, value) => {
    const area = value.value
    
    this.setState({selectedArea: area})
    this.props.moveHost(this.props.selectedHost, area)
  }

  toggle = () => {
    this.props.toggleHostActive(this.props.selectedHost)
  }

  areaDropDownValues = () => {
    return this.props.areas.map(area => {
      const name = area.name
      return {key: name, text: capitalize(name), value: name}
    })
  }

  activeLabel = (e) => {
    if (this.props.selectedHost.active) {
      return "Active"
    } else {
      return "Decommissioned"
    }
  }

  render(){
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={this.props.selectedHost.imageUrl}
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {this.props.selectedHost.firstName} | { this.props.gender ? <Icon name='man' /> : <Icon name='woman' />}
                
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.toggle}
                  label={this.activeLabel()}
                  checked={this.props.selectedHost.active}
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={(e, value) => this.handleChange(e, value)}
                value={this.state.selectedArea}
                options={this.areaDropDownValues()}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}


function capitalize(string) {
  return string
          .split(/[ _-]/g)
          .map(word => word[0].toUpperCase() + word.slice(1))
          .join(' ')
}

export default HostInfo
