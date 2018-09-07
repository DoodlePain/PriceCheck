import React, {Component} from 'react'
import { Header, Text,PricingCard,FormInput} from 'react-native-elements'
import {View} from 'react-native'
import BackC from './backC'
import axios from 'axios'
import {  TextInput } from 'react-native';
import Keyboard from 'react-native-keyboard'

let model = {
    
    _keys: [],

    _listeners: [],

    addKey(key) {
        this._keys.push(key);
        this._notify();
    },

    delKey() {
        this._keys.pop();
        this._notify();
    },

    clearAll() {
        this._keys = [];
        this._notify();
    },

    getKeys() {
        return this._keys;
    },

    onChange(listener) {
        if (typeof listener === 'function') {
            this._listeners.push(listener);
        }
    },

    _notify() {
        this._listeners.forEach((listner) => {
            listner(this);
        });
    }
};

export default class cPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toDashboard: false,
            coinData: "",
            text:1
        }
    }

    componentWillMount() {
        let url = 'https://api.coinmarketcap.com/v2/ticker/' + this.props.match.params.id + '/'
        let response = ''
        axios
            .get(url)
            .then((res) => {
                response = res.data.data.quotes.USD.price
                // var name = res.data.data
                
                this.setState({
                    coinName: res.data.data.name,
                    coinPrice: response.toFixed(5),
                    rank: res.data.data.rank,
                    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/32x32/' + this.props.index + '.png',
                    h1: res.data.data.quotes.USD.percent_change_1h,
                    h24: res.data.data.quotes.USD.percent_change_24h,
                    d7: res.data.data.quotes.USD.percent_change_7d
                })
            })
    }

    handleSubmit = (user) => {
        this.setState(() => ({toDashboard: true}))
    }

    componentDidMount() {
        model.onChange((model) => {
            this.setState({text: model.getKeys().join('')});
        });
    }

    _handleClear() {
        model.clearAll();
    }

    _handleDelete() {
        model.delKey();
    }

    _handleKeyPress(key) {
        model.addKey(key);
    }

    
    render() {
 
        
        return (
            <View >
                <Header
                    leftComponent={<BackC goback={()=>{this.props.history.push('/')}}/>}
                    centerComponent={<Text style={{color:'#fff',top:'22%'}} h2>{this.state.coinName}</Text>}
                    />
                <PricingCard
                    color='#4f9deb'
                    title={this.state.coinName}
                    price={(this.state.coinPrice *this.state.text).toFixed(5)+ " $"}
                    info={['Your amount : '+this.state.text + ' ' +this.state.coinName+'s',"Ranking : "+this.state.rank, 'All Core Features']}
                    button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
                    />
                <View style={{top:'26%'}}>
                    <Keyboard 
                        keyboardType="decimal-pad"
                        onClear={this._handleClear.bind(this)}
                        onDelete={this._handleDelete.bind(this)}
                        onKeyPress={this._handleKeyPress.bind(this)}
                        />
                </View>
            </View>
        )
    }
}
