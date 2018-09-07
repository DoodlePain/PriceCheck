import React, { Component } from 'react'
import {Icon} from 'react-native-elements'

export default class backC extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toDashboard: false,
            coinData: ""
        }
        console.log();
        
    }
  render() {
    return (
        <Icon name="chevron-left" 
            color="#fff"
            onPress={()=>{this.props.goback()}}
        />
    )
  }
}
