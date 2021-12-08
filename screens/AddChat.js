import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input} from 'react-native-elements'

import { AntDesign } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'
import { db } from '../firebase'

const AddChat = () => {
  const navigation = useNavigation()

  const [input, setInput] = useState()

  async function createChat(){
    await db.collection('chats').add({
      chatName: input
    }).then(() => {
      navigation.goBack()
    }).catch(err => alert(err))
  }

  useEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats"
    })
  }, [])

  return (
    <View style={styles.container}>
      <Input 
        placeholder="Enter a chat name"
        value={input}
        onChangeText={setInput}
        onSubmitEditing={createChat}
        leftIcon={
          <AntDesign name="wechat" size={24} color="black" />
        }
      />

      <Button title="Create new chat" onPress={createChat} />
    </View>
  )
}

export default AddChat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30
  }
})
