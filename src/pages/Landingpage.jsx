import { Link } from "react-router-dom";
import VideoBG from "../assets/VideoBG.mp4";

export function Landingpage() {
  return (
    <>
      <div className="hero min-h-screen">
        <div className="video">
          <video className="main" src={VideoBG} autoPlay loop muted />
        </div>
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <div className="box-content bg-slate-900/90 rounded-2xl p-10">
              <h1 className="mb-5 text-5xl font-bold text-white">Hello There!</h1>
              <h3 className="mb-5 text-3xl text-white">Welcome to ChattingYuk!</h3>
              <hr/>
              <p className="mb-5 mt-5 text-white">
                ChattingYuk! adalah aplikasi yang dirancang untuk
                berinteraksi dengan orang lain. 
              </p>
              <p className="mb-6 mt-5 text-white">
                Dengan ChattingYuk, Anda dapat memperluas jaringan
                sosial Anda, menemukan teman baru, dan berbagi pengalaman
                menarik setiap hari!
              </p>
              <Link to={"/register"}>
                <button className="btn btn-primary text-center m-1">
                  Get Started
                </button>
              </Link>
              <Link to={"/login"}>
                <button className="btn btn-secondary text-center m-1">
                  Login Here
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
