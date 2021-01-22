import React from "react";
import { Alert } from "react-native";
import { StyleSheet, Text, View, Image,TouchableOpacity,ScrollView, FlatList, TextInput} from "react-native";
import {SearchBar,Header} from 'react-native-elements'
import db from "../Config"
export default class ReadStory extends React.Component{
    constructor(props){
        super(props)
       this.state={
            search:'',
            allStories:[],
            lastVisibleStory: null,
            search:'',
            dataSource:"",
            readStory:"",
        }
    }
    componentDidMount=async()=>{
        const query = await db.collection("stories").limit(10).get()
        query.docs.map((doc)=>{
            this.setState({
                allStories:[...this.state.allStories,doc.data()],
                lastVisibleStory:doc
            })
        })
    }
  
    searchTransactions=(text)=>{
      const newData  =  this.state.allStories.filter((item)=>{
          const itemData  = item.title ? item.title.toUpperCase() : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1
      });

      this.setState({
        dataSource: newData, 
        search:text
      })
            
    }

    readStory=(item)=>{
        this.props.navigation.navigate("Story", {"details" : item});
    }
    render(){

                return (
                             <View style ={styles.container}>
                                  <Header
                            backgroundColor={'#FFC0CB'}
                            centerComponent={{
                            text: 'Story Hub',
                            style: { color: 'black', fontSize: 40 },
                             }}
                          /> 
                          <View  styles ={{height:20,width:'100%'}}>
                          <SearchBar
              placeholder="Type Here..."
              onChangeText={text => this.searchTransactions(text)}
              value={this.state.search}
            />
                          </View>
                        
                       
                         <ScrollView> 
                        <FlatList
                        
                    data ={this.state.search === ""?  this.state.allStories: this.state.dataSource}
                   renderItem ={({item})=>(
                       <View style = {styles.searchResult}>
                              
                            <Text style={{color:"white",fontWeight:"bold",fontSize:20}} onPress={()=>{this.readStory(item)}}>{"Title: " + item.title}</Text>
                            <Text style={{color:"white",fontSize:20}} onPress={()=>{this.readStory(item)}} >{"Author: " + item.author}</Text>
                       </View>
                   )}               
                   keyExtractor = {(item, index)=>{index.toString()}}
                   onEndReached = {()=>{this.fetchMoreStories()}}
                   onEndReachedThreshold = {0.7}
            />
            </ScrollView>
            </View>
                );

              }
              fetchMoreStories=async()=>{

            var text = this.state.search.toUpperCase();
            const story = await db.collection("stories").where("title","==",text).startAfter(this.state.lastVisibleStory).limit(10).get()
           story.docs.map((doc)=>{
                this.setState({
                    allStories:[...this.state.allStories,doc.data()],
                    lastVisibleStory:doc,
                })
            })
            }
    }

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    searchBar:{
        flexDirection:"row",
        height:"auto",
        width:"auto",
        borderWidth:0.5,
        alignItems:"center",
        backgroundColor:"grey",
    },
    bar:{
        borderWidth:2,
        height:30,
        width:300,
        paddingLeft:300,
    },
    searchButton:{
        borderWidth:2,
        borderTopWidth:4,
        height:30,
        width:200,
        marginTop:-20,
        marginLeft:75,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"pink",
    },
    searchResult:{
        borderBottomWidth:2,
        borderTopWidth:2,
        backgroundColor:"grey"
    }
  });