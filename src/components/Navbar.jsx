import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import Swal from "sweetalert2";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";

export function Navbar() {
  const [signOut, loading, error] = useSignOut(auth);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [value] = useDocument(doc(db, "users", localStorage.uid), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  let userProfile = value?.data();
  console.log(userProfile);

  return (
    <>
      <div>
        <div className="navbar bg-sky-900 text-white">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl font-sans">Chatting Yuk!</a>
          </div>
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      userProfile?.avatar ||
                      "https://cdl.ucf.edu/wp-content/uploads/2021/07/Blank-ID-avatar.png"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <button
                    className="text-neutral"
                    onClick={async () => {
                      localStorage.clear()
                      const success = await signOut();
                      if (success) {
                        Swal.fire({
                          text: "You are logged out",
                          icon: "success",
                        });
                        navigate("/login");
                      }
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
