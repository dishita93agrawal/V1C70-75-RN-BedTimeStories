import React from "react";
import { Alert,StyleSheet,Image, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from "react-native";
import * as firebase from "firebase";
import {SearchBar,Header} from 'react-native-elements'
export default class SignUpScreen extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
        }
    }

    newUser=async(email,password)=>{
        if(email&&password){
            console.log("Account Created!")
            try{
                const response = await firebase.auth().createUserWithEmailAndPassword(email,password);
                if(response){
                    console.log("Navigation Executed")
                    
                    this.props.navigation.navigate('ReadStory')
                }
  
            }
            catch(error){
                switch(error.code){
                    case 'auth/existing-email': Alert.alert("Incorrect Email or Password")
                    console.log('invaild')
                    break;
                }
        }
    }
        else{
            Alert.alert("Enter Email and Password")
        }
    }

 
    render(){
        return(
            <KeyboardAvoidingView style={{alignItems:"center"}}>
                <View style ={styles.container}>
                                  <Header
                            backgroundColor={'#FFC0CB'}
                            centerComponent={{
                            text: 'Story Hub',
                            style: { color: 'black', fontSize: 40 },
                             }}
                          /> 
                          </View>
                <View> 
                <View>
                 <Text style={{fontSize:20,textAlign:"center"}}>Enter An Email And Password To Continue To StoryHub</Text>
                </View>
                <TextInput
                placeholder="ABC@example.com"
                keyboardType="email-address"
                style={styles.loginBox}
                onChangeText={(text)=>{
                    this.setState({
                        email:text
                    })
                }}
                value={this.state.email}/>
                <TextInput
                style={styles.loginBox}
                placeholder="Enter Password"
                secureTextEntry={true}
                onChangeText={(text)=>{
                    this.setState({
                        password:text
                    })
                }}
                />
                
                </View>
                <View>
                    <TouchableOpacity style={styles.buttonView} onPress={()=>{
                        this.newUser(this.state.email,this.state.password)
                    }}>
                        <Text style={styles.buttonText}>Sign Up!</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10
    },
    buttonView:{
        height:30,
        width:90,
        borderWidth:1,
        marginTop:20,
        paddingTop:5,
        borderRadius:7
    },
    buttonText:{
        textAlign:"center",
    }
})