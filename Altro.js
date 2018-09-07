import React from 'react';
import {ListItem, Badge} from 'react-native-elements'
import {View} from 'react-native'
import axios from 'axios'
import {Redirect} from 'react-router-native'


export default class Altro extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            toDashboard: false,
            coinData: ""
        }
    }

    handleSubmit = (user) => {
        this.setState(() => ({
            toDashboard: true
          }))
      }
    componentWillMount() {
        let url = 'https://api.coinmarketcap.com/v2/ticker/' + this.props.index + '/'
        let response = ''
        axios
            .get(url)
            .then((res) => {
                response = res.data.data.quotes.USD.price
                // var name = res.data.data

                this.setState({
                    coinName: res.data.data.name,
                    coinData: response.toFixed(5),
                    rank: res.data.data.rank,
                    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/32x32/' + this.props.index + '.png',
                    h1: res.data.data.quotes.USD.percent_change_1h,
                    h24: res.data.data.quotes.USD.percent_change_24h,
                    d7: res.data.data.quotes.USD.percent_change_7d
                })
            })
    }

    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to={'/'+this.props.index} />
        }
        var title = "#" + this.state.rank + " " + this.state.coinName + " | " + this.state.coinData + " $"
        return (
            <View>
                <ListItem
                    key={this.props.index}
                    roundAvatar
                    title={title}
                    avatar={{uri: this.state.iconUrl}}
                    onPress={this.handleSubmit}
                    />
                <Badge
                    value={((this.state.h1 > 0)
                    ? '+ ' + this.state.h1
                    : this.state.h1)}
                    containerStyle={{
                    backgroundColor: ((this.state.h1 > 0)
                        ? 'green'
                        : 'red')
                }}/>
            </View>
        )
    }
}