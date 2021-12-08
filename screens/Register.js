import React, { useLayoutEffect, useState } from 'react'

import { Button, Input, Text } from 'react-native-elements'
import { KeyboardAvoidingView, ScrollView, StyleSheet, View, Platform } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { auth } from '../firebase'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const navigation = useNavigation()

  function register(){
    auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => {
      authUser.user.updateProfile({
        displayName: name,
        photoURL: imageUrl || 'https://bundlespace.com/data/catalog/premium-graphics/telegram/png/telegram-ui-avatar-man.png'
      })
    }).catch(error => alert(error.message))
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login'
    })
  }, [navigation])

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
      >

        <Text h3 style={{marginBottom: 50}}>Create a Signal account</Text>

        <View style={styles.inputContainer}>
          <Input 
            placeholder='Full Name'
            type="text"
            value={name}
            onChangeText={setName}
          />
          <Input 
            placeholder='Email'
            type="email"
            value={email}
            onChangeText={setEmail}
          />
          <Input 
            placeholder='Password'
            type="password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <Input 
            placeholder='Profile Picture URL(Optional)'
            type="text"
            value={imageUrl}
            onChangeText={setImageUrl}
            onSubmitEditing={register}
          />
        </View>

        <Button 
          title="Register"
          onPress={register}
          raised
          containerStyle={styles.button}
        />
        <View style={{height: 100}} />
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white'
  },
  inputContainer: {
    width: 300,
  },
  button: { 
    width: 200,
    marginTop: 10
  }
})
