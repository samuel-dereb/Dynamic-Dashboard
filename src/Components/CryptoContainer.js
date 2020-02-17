import React,  { Component } from 'react'
import  { connect } from 'react-redux'
import  { ScrollView, View, StyleSheet, Text, List, FlatList, Picker, SafeAreaView } from 'react-native'
import FetchCoinData from './../Actions/FetchCoinData'
import { CoinCard } from './CoinCard'
import Spinner from 'react-native-loading-spinner-overlay'

class CryptoContainer extends Component {
    constructor(props) {
        super(props);
        this.props.FetchCoinData();
    }

    renderCoinCards() {
        const { crypto } = this.props;
        return crypto.data.map((coin) => 
            <CoinCard 
                key={coin.name}
                coin_name={coin.name}
                symbol={`https://cryptoicons.org/api/icon/${coin.name.toLowerCase()}/200`}
                price_usd={coin.price_usd}
                percent_change_24h={coin.percent_change_24h}
                percent_change_7d={coin.percent_change_7d}
            />
        ) 
    }


    render() {

        const { crypto } = this.props;
        const { contentContainer } = styles;

        if (crypto.isFetching) {
            return (
                <View>
                    <Spinner
                        visible={crypto.isFetching}
                        textContent={"Loading..."}
                        textStyle={{color: '#253145'}}
                        animation="fade"
                    />
                </View>
            )
        }

        return (
            <ScrollView contentContainerStyle={contentContainer}> 
                {this.renderCoinCards()}
            </ScrollView>
        )

    }
}

const styles = {
    contentContainer: {
        paddingBottom: 100,
        paddingTop: 55
    }
}

function mapStateToProps(state) {
    return {
        crypto: state.crypto
    }
}

export default connect(mapStateToProps, { FetchCoinData })(CryptoContainer)
