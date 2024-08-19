import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { auth, db } from '../lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore'



const SendMessage = ({scroll}) => {
    const [input, setInput] = useState("")
    const [user, loading, error] = useAuthState(auth);
    const [value] = useDocument(
      doc(db, 'users', localStorage.uid),
      {
        snapshotListenOptions: { includeMetadataChanges: true },
      }
    );
    const userProfile = value?.data()
      console.log(user);
    const sendMessage = async (e) => {
        e.preventDefault()
        if(input === ''){
            alert('please enter a valid messages')
            return
        }
        const {uid, displayName} = auth.currentUser
        // console.log(auth.currentUser);
        await addDoc(collection(db, 'messages'), {
            text: input,
            name: userProfile?.firstName + ' ' + userProfile?.lastName,
            uid : user.uid,
            timestamp: serverTimestamp()
        })
        setInput('')
    }
    
  return (
    <>
    <form onSubmit={sendMessage} className=' w-full h-full flex text-sm'>
        <input value={input} onChange={(e) => setInput(e.target.value)} className='w-[100%] text-xl p-3 bg-white text-black outline-none border-none' type='text' placeholder='Message'></input>
        <button className='w-[20%] bg-indigo-500 hover:bg-indigo-950 text-black container-fluid'>Send</button>
    </form>
    </>
  )
}

export default SendMessage