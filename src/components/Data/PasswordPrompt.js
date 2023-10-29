import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseConfig } from '../Authentication/firebase.js';

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();

function SubmittedForms() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [correctPassword, setCorrectPassword] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setLoading(true);
        try {
          const formsSnapshot = await firestore
            .collection('loan')
            .orderBy('Date', 'desc')
            .get();
          const formsData = formsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setForms(formsData);
        } catch (error) {
          console.error('Error fetching forms:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  const handlePasswordSubmit = () => {
    const correctdata = process.env.REACT_APP_FIREBASE_API_KEY;
    const correctValue =correctdata.slice(0,10);
    if (password === correctValue) {
      setCorrectPassword(true);
      setIncorrectPassword(false);
    } else {
      setCorrectPassword(false);
      setIncorrectPassword(true);
      setTimeout(() => {
        setIncorrectPassword(false);
      }, 4000);
    }
  };

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
    <div className="flex justify-center font-bold mt-2 text-2xl">Admin Panel</div>
    <div className="max-w-3xl mx-auto mt-8 p-4">
      {loading && <div>Loading...</div>}
      {!user && (
        <div className="flex justify-center">
          <button 
            onClick={handleGoogleSignIn} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign In with Google
          </button>
        </div>
      )}
      {user && !correctPassword && (
        <div className="mb-4">
          <p className="font-bold text-xl mb-2">Welcome, {user.displayName}</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="rounded p-2 mr-2 border border-gray-300 mb-2"
          />
          {incorrectPassword && <p className="text-red-500 text-sm mb-2">Incorrect Password</p>}
          <button onClick={handlePasswordSubmit} className="ml- 2 bg-blue-500 text-white rounded p-2 hover:bg-blue-700">
            Submit
          </button>
        </div>
      )}
      {user && correctPassword && forms.length > 0 && (
        <div className="space-y-4">
           {forms.map((form) => (
            <div key={form.id} className="bg-white p-4 shadow rounded">
              <p><span className="font-bold">Name:</span> {form.name}</p>
              <p><span className="font-bold">Mobile Number:</span> {form.mobileNumber}</p>
              <p><span className="font-bold">Loan Amount:</span> {form.loanAmount}</p>
              <p><span className="font-bold">Email:</span> {form.email}</p>
              <p><span className="font-bold">Income Source:</span> {form.incomeSource}</p>
              <p><span className="font-bold">Monthly Income :</span> {form.monthlyIncome}</p>
              <p><span className="font-bold">City:</span> {form.city}</p>
              <p><span className="font-bold">Date:</span> {new Date(form.Date.toDate()).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default SubmittedForms;
