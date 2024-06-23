// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const firestore = firebase.firestore();
const auth = firebase.auth();

const handleGoogleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user] = useAuthState(auth);

  useEffect(() => {
    const unsubscribe = firestore.collection('messages')
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messages);
      });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const { uid, displayName, photoURL } = auth.currentUser;
      await firestore.collection('messages').add({
        text: newMessage,
        userId: uid,
        userName: displayName,
        userPhoto: photoURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setNewMessage('');
    }
  };

  const handleDeleteMessage = async (id) => {
    await firestore.collection('messages').doc(id).delete();
  };

  const handleDeleteAllMessages = async () => {
    const batch = firestore.batch();
    const snapshot = await firestore.collection('messages').get();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      {!user && (
        <div className="flex justify-center">
          <button 
            onClick={handleGoogleSignIn} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-4 py-2 px-4 rounded">
            Sign In with Google
          </button>
        </div>
      )}
      {user && (
        <div className="w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Chat Room</h2>
            <button 
              onClick={handleDeleteAllMessages} 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete All
            </button>
          </div>
          <div className="flex flex-col space-y-4 overflow-y-auto h-80 bg-gray-100 p-4 rounded-lg shadow-lg">
            {messages.map(msg => (
              <div key={msg.id} className="flex items-start space-x-4 relative">
                <img src={msg.userPhoto} alt={msg.userName} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="bg-white p-2 rounded shadow">{msg.text}</p>
                  <span className="text-xs text-gray-600">{new Date(msg.createdAt?.toDate()).toLocaleString()}</span>
                </div>
                {msg.userId === auth.currentUser.uid && (
                  <button 
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-grow p-2 border border-gray-300 rounded-l-lg"
            />
            <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-700">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
