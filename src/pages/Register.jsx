import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import upload from "../lib/upload";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import GoogleButton from "react-google-button";

export default function RegisterPage() {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })
    const navigate = useNavigate()
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

    const googleSignIn = async () => {
        try {
            const res = await signInWithGoogle()
            localStorage.setItem('uid', res.user.uid)
            await setDoc(doc(db, "users", res.user.uid), {
                avatar: res.user.photoURL,
                username: "",
                firstName: res.user.displayName.split(' ')[0],
                lastName: res.user.displayName.split(' ')[1],
                email: res.user.email,
                birthDate: "",
                id: res.user.uid
            });
            navigate('/app')
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Oops...",
                text: error.message,
                icon: "error"
            });
        }

    };

    const handleAvatar = e => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const {username, firstName, lastName, email, password, birthDate} = Object.fromEntries(formData)
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const profilePicture = await upload(avatar.file)
            await setDoc(doc(db, "users", res.user.uid), {
                avatar: profilePicture,
                username,
                firstName,
                lastName,
                email,
                password,
                birthDate,
                id: res.user.uid
              });
            Swal.fire({
                text: "Account successfully created!",
                icon: "success"
              });
              navigate('/login')
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Oops...",
                text: error.message,
                icon: "error"
              });
        }
    }

    return (
        <>
            <div className="hero bg-neutral min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-center">
                        <h1 className="text-5xl font-bold">Register</h1>
                        <p className="py-6">
                            Welcome to ChattingYuk! Sign up to experience what our app can offer you.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleRegister}>
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Profile Picture</span>
                                </label>
                                <div className="flex gap-3 items-center">
                                    <img src={avatar.url || "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"} style={{ borderRadius: '50%', height: 70, width: 70, objectFit: "cover" }} />
                                    <input type="file" onChange={handleAvatar} placeholder="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg" name="profilePicture" required className="file-input file-input-ghost" />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input type="text" placeholder="username" name="username" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input type="text" placeholder="first name" name="firstName" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input type="text" placeholder="last name" name="lastName" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" name="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Birthday</span>
                                </label>
                                <input type="date" placeholder="01/01/1970" name="birthDate" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </div>
                            <label className="label" style={{ fontSize: 13 }}>
                                <span>Already have an account? <Link to={'/login'} className="link link-hover">Login here</Link></span>
                            </label>
                        </form>
                        <div className="flex justify-center mb-5">
                            <GoogleButton label='Continue with Google' style={{ borderRadius: 5 }} onClick={googleSignIn} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}