import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  function signIn(){
    auth.signInWithEmailAndPassword(email, password).catch(error => alert(error))
  }

  function register(){
    navigation.navigate('Register')
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        navigation.replace('Home')
      }
    })

    return unsubscribe
  }, [])

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
    > 
      <StatusBar style="light" />
      <Image source={{
        uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png'
      }}
        style={{ width: 200, height: 200 }}  
      />
      <View style={styles.inputContainer}>
        <Input 
          placeholder="Email"
          type="email" 
          value={email} 
          onChangeText={setEmail} 
        />
        <Input 
          placeholder="Password"  
          type="password" 
          value={password}
          secureTextEntry
           onChangeText={setPassword}
          onSubmitEditing={signIn}
        />
      </View>

      <Button 
        containerStyle={styles.button} 
        onPress={signIn} 
        title="Login" 
      />
      <Button containerStyle={styles.button} onPress={register} title="Register" type="outline" />
      <View style={{height: 100}} />
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white'
  },
  inputContainer: {
    width: 300
  },
  button: {
    width: 200,
    marginTop: 10
  }
})
