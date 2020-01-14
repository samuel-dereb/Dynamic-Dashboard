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
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         coin: null,
    //         data: {
    //             name: "ETH",
    //             price_usd: "$125",
    //             percent_change_24h: "2.00%",
    //             percent_change_7d: "-0.87%"
    //         }
    //     }
    //     this.props.FetchCoinData()
    // }
    // updateData() {
    //     this.setState({data: this.props.crypto.data});
    // }
    // renderCoinCards(selectedItem, selectedIndex) {
    //     this.setState({coin: selectedItem});
    //     let filteredData = this.props.crypto.data.filter((coin, index) => selectedIndex == index);
    //     if(filteredData) this.setState({data: filteredData})

        // return this.props.crypto.data.map((coin, index) => (
        //     <CoinCard
        //         key={index}
        //         symbol={`https://cryptoicons.org/api/icon/${coin.name.toLowerCase()}/200`}
        //         coin_name={coin.name}
        //         price_usd={coin.price_usd}
        //         percent_change_24h={coin.percent_change_24h}
        //         percent_change_7d={coin.percent_change_7d}
        //     />
        // ))
    // }

    // render() {
    //     let { crypto } = this.props;
        // let item, index = null;
        // if(crypto.isFetching) {
        //     return (
        //         <View>
        //             <Spinner 
        //                 visible={crypto.isFetching}
        //                 testContent={"loading..."}
        //                 textStyle={{color: "#253145"}}
        //                 orientation="fade"/>
        //         </View>
        //     )
        // }
        // let fetched = crypto.data
        // return (
        //     <ScrollView contentContainerStyle={contentContainer}>
        //         <Picker
        //             selectedValue={this.state.coin}
        //             onValueChange={(selectedItem, selectedIndex) => this.renderCoinCards(selectedItem, selectedIndex)}
        //             > 
        //             {crypto.data.map((coin, index) => {
        //                 return <Picker.Item key={index} label={coin.name} value={coin.name}></Picker.Item>
        //             })}
        //         </Picker> 
                /* <List> */
                // <FlatList
                //     data = {this.state.coin ? crypto.data: this.state.data}
                //     renderItem= {( {coin, index }) => (
                //         <CoinCard
                //             key={index}
                //             symbol={`https://cryptoicons.org/api/icon/${coin.name.toLowerCase()}/200`}
                //             coin_name={coin.name}
                //             price_usd={coin.price_usd}
                //             percent_change_24h={coin.percent_change_24h}
                //             percent_change_7d={coin.percent_change_7d}
                //     />)}
                //     keyExtractor={item => item.rank.toString()}
                // />
                /* </List> */
    //         </ScrollView>  
    //     )
    // }
