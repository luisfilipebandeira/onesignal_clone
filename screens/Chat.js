import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'react-native-elements'

import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { auth, db } from '../firebase'
import firebase from 'firebase'

const Chat = ({route}) => {
  const navigation = useNavigation()

  const [input, setInput] = useState('')
  const [message, setMessage] = useState([])

  async function sendMessage(){
    Keyboard.dismiss()

    db.collection('chats').doc(route.params.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL
    })

    setInput('')
  }

  useEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Avatar 
            rounded 
            source={{ uri: message[0]?.data.photoURL }}
          />
          <Text style={{ color: 'white', marginLeft: 10, fontWeight: 'bold', fontSize: 18}}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 80,
          marginRight: 20
        }}>
          <TouchableOpacity>
            <Ionicons name="camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [message])

  useEffect(() => {
    const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages')
    .orderBy('timestamp', 'asc').onSnapshot(snapshot => setMessage(
      snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
    ))

    return unsubscribe
  }, [])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }} showsVerticalScrollIndicator={false}>
              {message.map((item, index) => (
                item.data.email === auth.currentUser.email ? (
                  <View key={item.id} style={styles.reciever}>
                    <Avatar
                      rounded
                      position="absolute"
                      containerStyle={{
                        position: 'absolute',
                        bottom: -15,
                        right: -5
                      }}
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{ uri: item.data.photoURL }}
                    />
                    <Text style={styles.recieverText}>
                      {item.data.message}
                    </Text>
                  </View>
                ) : (
                  <View key={item.id} style={styles.sender}>
                    <Avatar
                      rounded
                      position="absolute"
                      containerStyle={{
                        position: 'absolute',
                        bottom: -15,
                        left:  5
                      }}
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{ uri: item.data.photoURL }}
                    />
                    <Text style={styles.senderMessage}>
                      {item.data.message}
                    </Text>
                  </View>
                )
              ))}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Signal Message"
                onSubmitEditing={sendMessage}
                style={styles.textInput}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  reciever: {
    padding: 15,
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative'
  },
  sender: {
    padding: 15,
    backgroundColor: '#2B68E6',
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: '#ECECEC',
    padding: 10,
    color: "gray",
    borderRadius: 30
  },
  senderMessage: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10
  },
  recieverText: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 10
  }
})
