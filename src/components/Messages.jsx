import { doc } from "firebase/firestore";
import { auth, db} from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { FaUserCircle } from "react-icons/fa";

const Messages = ({ message }) => {
  // console.log(message.timestamp);
  const [user] = useAuthState(auth); // Mengambil informasi pengguna yang sedang login

  const [value, loading, error] = useDocument(
    doc(db, 'users', user.uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const userProfile = value?.data()


  let date = new Date();

  if (message.timestamp) {
    date = new Date(
      message.timestamp.seconds * 1000 + message.timestamp.nanoseconds / 1000000
    );
  }
  const atTime = date.toLocaleTimeString();

  return (
    <>
    {message.uid !== user.uid ? (
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://cdl.ucf.edu/wp-content/uploads/2021/07/Blank-ID-avatar.png"
                />
              </div>
            </div>
            <div className="chat-header">
              {message.name }
            </div>
            <div className="chat-bubble">{message.text}</div>
            <div className="chat-footer"><time className="text-xs opacity-50">{atTime}</time></div>
          </div>
  ) : (
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={userProfile?.avatar|| "https://cdl.ucf.edu/wp-content/uploads/2021/07/Blank-ID-avatar.png"} 
                />
              </div>
            </div>
            <div className="chat-header">
              {userProfile?.firstName + ' ' + userProfile?.lastName || message.name}
            </div>
            <div className="chat-bubble">{message.text}</div>
            <div className="chat-footer"><time className="text-xs opacity-50">{atTime}</time></div>
          </div>
       )}
        {/* <div className="chat chat-start">
          <div
            className="flex items-center shadow-xl ms-4 me-4 mt-4 px-3"
            style={{ borderRadius: 15 }}
          >
            <p className="relative mt-[-4rem] text-white text-sm">
              {message.name}
            </p>
            <p className="text-md text-white py-3">{message.text}</p>
          </div>
          <p className="ms-6 mb-3 me-5 self-end text-sm">{atTime}</p>
        </div>
    
        <div className="chat chat-end">
          <div
            className="flex items-center shadow-xl ms-4 me-4 mt-4 px-3"
            style={{ borderRadius: 15 }}
          >
            <p className="relative mt-[-4rem] text-white text-sm">
              {message.name}
            </p>
            <p className="text-md text-white py-3">{message.text}</p>
          </div>
          <p className="ms-6 mb-3 me-5 self-end text-sm">{atTime}</p>
        </div>
      */}
    </>
  );
};

export default Messages;
