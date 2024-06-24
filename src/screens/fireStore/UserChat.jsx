import React, {useRef, useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UserChat = ({navigation, route}) => {
  const {userData, myId: currentUserId} = route.params;
  const [allMessages, setAllMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const flatListRef = useRef();

  useEffect(() => {
    const chatId = [userData.userId, currentUserId].sort().join('_');

    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllMessages(messages);
      });

    return () => unsubscribe();
  }, [userData, currentUserId]);

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      const chatId = [userData.userId, currentUserId].sort().join('_');
      await firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
          message: inputMessage,
          sender: currentUserId,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      setInputMessage('');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: 10}}
          ref={flatListRef}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({animated: true})
          }
          keyExtractor={item => item.id}
          style={styles.messagesList}
          data={allMessages}
          renderItem={({item}) => (
            <View
              style={[
                styles.messageContainer,
                {
                  borderBottomLeftRadius:
                    item.sender === currentUserId ? 10 : 0,
                  borderBottomRightRadius:
                    item.sender === currentUserId ? 0 : 10,
                  backgroundColor:
                    item.sender === currentUserId ? 'blue' : '#ffff',
                  alignSelf:
                    item.sender === currentUserId ? 'flex-end' : 'flex-start',
                },
              ]}>
              <Text
                style={{
                  fontSize: 16,
                  color: item.sender === currentUserId ? '#fff' : '#000',
                }}>
                {item.message}
              </Text>
            </View>
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type a message..."
          placeholderTextColor={'Gray'}
        />
        <TouchableOpacity
          disabled={!inputMessage}
          onPress={sendMessage}
          style={[
            styles.sendButton,
            {backgroundColor: inputMessage ? 'green' : 'gray'},
          ]}>
          <Text style={{color: '#fff'}}>send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7EE',
    borderTopWidth: 0.6,
    borderColor: 'gray',
  },
  messagesList: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 5,
    gap: 6,
  },
  input: {
    borderRadius: 30,
    flex: 1,
    borderWidth: 0.8,
    borderColor: 'gray',
    paddingHorizontal: 25,
    color: '#000',
    fontSize: 16,
    backgroundColor: '#fff',
  },
  sendButton: {
    height: 45,
    width: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    maxWidth: '80%',
    paddingVertical: 8,
    marginVertical: 9,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
