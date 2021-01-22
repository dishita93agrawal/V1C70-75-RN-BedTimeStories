import React from "react";
import { StyleSheet, Text, View, Image,ScrollView, TouchableOpacity} from "react-native"; 
import db from "../Config"
import {Header,SearchBar} from 'react-native-elements' 
export default class App extends React.Component {
    constructor(props){
        super(props)
       this.state={
            title: this.props.navigation.getParam("details")["title"], 
            author: this.props.navigation.getParam("details")["author"], 
            story: this.props.navigation.getParam("details")["story"]
        }
    }


  
    back=async()=>{
        this.props.navigation.navigate("TabNavigator")
    }

    render() {
              return(
                  <View style={styles.container}>
                       <Header
                            backgroundColor={'#FFC0CB'}
                            centerComponent={{
                            text: 'Story Hub',
                            style: { color: 'black', fontSize: 40 },
                             }}
                          /> 
            
            <TouchableOpacity style ={styles.backToBrowse} onPress={()=>{this.back()}}>
                <Text style={styles.backToBrowseText}>Back To Browse...</Text>
            </TouchableOpacity>
            <ScrollView style = {styles.searchResult}>
                            <Text style={{color:"white",fontWeight:"bold",fontSize:60,marginLeft:10,marginBottom:10}}>{this.state.title}</Text>
                            <Text style={{color:"white",fontSize:40,marginLeft:10,marginBottom:10}}>By: {this.state.author}</Text>
                            <Text style={{color:"white",fontSize:20,marginLeft:10,marginBottom:10}}>{this.state.story}</Text>
                      </ScrollView>
            </View>
              )
    }
  
  }
  
  const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"grey"
    },
    searchResult:{
        borderTopWidth:2,
    },
    backToBrowse:{
        borderWidth:2,
        padding:10,
        backgroundColor:"white",
    },
    backToBrowseText:{
        fontWeight:"bold",
        fontSize:15,
    }
  });