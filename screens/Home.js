import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import CustomListItem from '../components/CustomListItem'

import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'

import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import { StatusBar } from 'expo-status-bar'

const Home = () => {
  const navigation = useNavigation()

  const [chats, setChats] = useState([])

  function signOut(){
    auth.signOut().then(() => {
      navigation.replace('Login')
    })
  }
 
  useEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: { backgroundColor: '#ffffff' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{marginLeft: 0, marginRight: 10, marginLeft: 10}}>
          <TouchableOpacity onPress={signOut}>
            <Avatar rounded source={{uri: auth?.currentUser?.photoURL}} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View 
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 80,
          marginRight: 10
        }}>
          <TouchableOpacity>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AddChat')}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [])

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
      setChats(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    ))
  }, [])

  function enterChat(id, chatName){
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {chats.map((item, index) => (
          <CustomListItem 
            id={item.id} 
            chatName={item.data.chatName} 
            key={index} 
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
