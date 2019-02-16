import React, { Component } from "react"
import { Alert } from "reactstrap"

import imgA from "./blue-green-1.jpg"
import imgB from "./blue-green-2.png"

export default class BgDeployment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    this.fetchData()
    this.timer = setInterval(() => this.fetchData(), 1000)
  }
  componentWillUnmount() {
    this.timer = null
  }

  
  incrementCount(){
    this.setState({
      count: this.state.count + 1
    })
  }

  fetchData = () => {
    this.incrementCount()
    this.setState({ ...this.state, isFetching: true })
    fetch(this.props.service_url)
      .then(response => response.json())
      .then(result => this.setState({ actuator: result, isFetching: false }))
      .catch(e => console.log(e))
  }

  render() {
    if (!this.state.actuator) return <p>Loading...</p>
    return (    
      <div id="layout-content" className="layout-content-wrapper">
        <div className="panel-list">     
          <Alert color={`${this.state.actuator.git.branch === "feature2" ? "success" : "primary"}`} className="code">
            Hit service <i><b>{this.state.actuator.build.artifact} </b></i>  {this.state.count} times. <br/>
            Version : <i><b> {this.state.actuator.build.version} </b></i>
          </Alert>
          <img src={`${this.state.actuator.git.branch === "feature2" ? imgB : imgA}`} width="400" height="200"  alt="ab" />
        </div>
      </div>
    )
  }
}