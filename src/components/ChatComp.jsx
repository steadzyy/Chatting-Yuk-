import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../lib/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Messages";

const ChatComp = () => {
  const [user ] = useAuthState(auth);

  // Referensi koleksi pesan di Firestore
  const messagesRef = collection(db, "messages");
  
  // Query untuk mengurutkan pesan berdasarkan timestamp
  const queryRef = query(messagesRef, orderBy("timestamp", "asc"));

  // Menggunakan useCollection untuk mendapatkan data pesan
  const [messages, loading, error] = useCollection(queryRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  console.log(messages, loading, error);

  return (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Chat Loading...</span>}

      <div className="flex flex-col p-[10px]">
        {messages &&
          messages.docs.map((doc) => (
            <Message
              key={doc.id}
              message={doc.data()}
              currentUser={user} // Mengirimkan currentUser ke Message Component
            />
          ))}
      </div>
    </>
  );
};

export default ChatComp;



//YANG ASLI
// import React, { useEffect, useRef, useState } from "react";
// import Message from "./Messages";
// import { db } from "../lib/firebase";
// import { collection, orderBy, query } from "firebase/firestore";
// import { useCollection } from "react-firebase-hooks/firestore";
// import SendMessage from "./SendMessages";

// // const ChatComp = () => {
// //   const [messages, loading, error] = useCollection(collection(db, "messages"), {
// //     snapshotListenOptions: { includeMetadataChanges: true },
// //   });
// //   console.log(messages, loading, error);
// //   return (
// //     <>
// //       {error && <strong>Error: {JSON.stringify(error)}</strong>}
// //       {loading && <span>Chat Loading...</span>}

// //       <div className="flex flex-col p-[10px]">
// //         {messages && messages.docs.map((doc) => (
// //           <Message key={doc.id} message={doc.data()} />
// //         ))}
// //       <SendMessage scroll={scroll}/>
// //       <span ref={scroll}></span>
// //       </div>
// //     </>
// //   )
// // };

// const ChatComp = () => {
//   const messagesRef = collection(db, "messages");
//   const queryRef = query(messagesRef, orderBy("timestamp", "asc"));
//   const [messages, loading, error] = useCollection(queryRef, {
//     snapshotListenOptions: { includeMetadataChanges: true },
//   });

//   console.log(messages, loading, error);

//   return (
//     <>
//       {error && <strong>Error: {JSON.stringify(error)}</strong>}
//       {loading && <span>Chat Loading...</span>}

//       <div className="flex flex-col p-[10px]">
//         {messages && messages.docs.map((doc) => (
//           <Message key={doc.id} message={doc.data()} />
//         ))}
//       </div>
        
//     </>
//   );
// };

// export default ChatComp;