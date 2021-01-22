import React from "react";
import { Alert,StyleSheet,Image, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from "react-native";
import * as firebase from "firebase";
import {SearchBar,Header} from 'react-native-elements'
export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
        }
    }
    loginCheck=async(email,password)=>{
        if(email&&password){
            console.log("Login Executed")
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email,password);
                if(response){
                    console.log("Navigation Executed")
                    
                    this.props.navigation.navigate('ReadStory')
                }
            }
            catch(error){
                switch(error.code){
                    case 'auth/user-not-found': Alert.alert("User Does Not Exist")
                    console.log("doesn't exist") 
                    break;
                    case 'auth/invalid-email': Alert.alert("Incorrect Email or Password")
                    console.log('invaild')
                    break;
                }
            }
        }
        else{
            Alert.alert("Enter Email and Password")
        }
    }

   

    newUserScreen=()=>{
        this.props.navigation.navigate('SignUpScreen')
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
                 <Text style={{fontSize:20,textAlign:"center"}}>Please Login To Continue To StoryHub</Text>
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
                        this.loginCheck(this.state.email,this.state.password)
                    }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{color:"#add8e6",fontSize:20,alignItems:"center", marginTop:30}}>Don't Have An Account?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonView2} onPress={()=>{
                        this.newUserScreen()
                    }}>
                        <Text style={styles.buttonText}>Create Account!</Text>
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
        borderRadius:7,
        alignSelf:"center"
    },
    buttonView2:{
        height:50,
        width:90,
        borderWidth:1,
        marginTop:20,
        paddingTop:5,
        borderRadius:7,
        alignSelf:"center",
        marginTop:30
    },
    buttonText:{
        textAlign:"center",
    }
})