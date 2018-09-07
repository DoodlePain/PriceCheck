import React from 'react';
import {View} from 'react-native'
import {NativeRouter, Switch, Route} from 'react-router-native'
import Home from './home'
import cPage from './cPage'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crypto: 'Bitcoin',
            data: ''
        }
    }

    render() {
        return (
            <NativeRouter>
                <View>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/:id" component={cPage}/>
                    </ Switch>
                </View>
            </ NativeRouter>
        );
    }
}
