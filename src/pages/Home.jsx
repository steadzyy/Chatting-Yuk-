import { useCollection } from "react-firebase-hooks/firestore";
import ChatComp from "../components/ChatComp";
import SendMessage from "../components/SendMessages";
import "./app.css";
import { collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { IoInvertMode } from "react-icons/io5";
import { useContext } from "react";
import { themeContext } from "./ThemeContext";

export default function HomePage() {
  const [value, loading, error] = useCollection(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const {theme, toggleTheme, themes} = useContext(themeContext)
  const activeTheme = themes[theme]
  console.log(activeTheme);

  return (
    <div data-theme={activeTheme} className="flex items-center justify-center h-full">
      
      <div className="container bg-secondary flex justify-center" style={{ height: "85vh"}}>
        <div className="bg-neutral w-1/4 border-r-2 border-gray-50 flex flex-col text-center">
        <h1 className="text-xl font-bold mb-4 mt-2 text-center py-5">Registered Users:</h1>
        <div className="flex flex-col justify-start">
          {value &&
            value.docs.map((el) => {
              const dataUser = el.data();
              return (
                <div className="flex flex-row items-center ms-5 p-2 gap-2">
                  <img src={dataUser.avatar} style={{borderRadius: '50%', height:30, width:30, objectFit:"cover"}}/>
                <h4 key={el.id}>{dataUser.firstName} {dataUser.lastName}</h4>
                </div>
              );
            })}
            </div>
        </div>

        {/* Bagian Tengah */}
        <div className="flex-grow relative">
          {/* Navbar di Bagian Kanal */}
          <nav className="bg-accent p-4 flex justify-between">
            <ul className="flex">
              <li className="mr-4">
                <a href="#" className="text-blue-500 hover:text-blue-700">ChattingYuk!</a>
              </li>
            </ul>
            <ul className="flex justify-end">
              <button onClick={() => {
                toggleTheme()
              }} className="mr-4 flex justify-end mt-1"> <IoInvertMode /> </button>
            </ul>
          </nav>
          
          {/* Chat Component */}
          <div className="overflow-auto" style={{height:"82%"}}>
            <ChatComp />
          </div>

          {/* Send Message Component */}
          <div className="absolute bottom-0 w-full p-4 ">
            <SendMessage />
          </div>
        </div>
      </div>
    </div>
  );
}

//YANG ASLI
// import { useCollection } from "react-firebase-hooks/firestore";
// import ChatComp from "../components/ChatComp";
// import SendMessage from "../components/SendMessages";
// import "./app.css";
// import { collection } from "firebase/firestore";
// import { db } from "../lib/firebase";

// export default function HomePage() {
//   const [value, loading, error] = useCollection(collection(db, "users"), {
//     snapshotListenOptions: { includeMetadataChanges: true },
//   });
//   return (
//     <>
//       <div className="flex items-center justify-center h-full">
//         <div
//           className="container flex justify-center"
//           style={{ height: "85vh" }}
//         >
//           <div className="w-1/4">
//             {console.log(value && value.docs, "UHUYYY")}
//             {value &&
//               value.docs.map((el) => {
//                 const dataUser = el.data();
//                 return(<h2>{dataUser.firstName} {dataUser.lastName}</h2>)
//               })}
            
//           </div>

//           <hr className="border-t border-gray-300 h-full" />

//           {/* Bagian kanan */}

//           <div className="grow flex flex-col">
//             <div className="overflow-auto">
//               <ChatComp />
//             </div>
//             <div className="flex justify-center">
//               <SendMessage />
//               <span ref={scroll}></span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
