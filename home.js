import React, {Component} from 'react'
import {Text, Header} from 'react-native-elements'
import {View} from 'react-native'
import Altro from './Altro'

export default({history}) => (
    <View>
        <Header
            centerComponent={<Text style={{color:'#fff',top:'22%'}} h2>ICOs Dashboard</Text>}/>
        <Altro
            index={1}
            />
        <Altro index={2}/>
        <Altro index={3}/>
        <Altro index={1214}/>
    </View>
)
