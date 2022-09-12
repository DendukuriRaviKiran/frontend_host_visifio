import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import { authContext } from "../handlers/persistance/context.js";

import "bootstrap/dist/css/bootstrap.min.css"
import "./loginpage.css"

const LoginPage = ({ tokenRecieve }) => {
	const { setAuth } = useContext(AuthContext);
	const userRef = useRef();
    const errRef = useRef();
	const [user, setUser] = useState("");
	const [pwd, setPwd] = useState("");
	const [email, setEmail] = useState("");
	const [fullName, setFullName] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [success, setSuccess] = useState(false);
	const [registerBool, setRegisterBool] = useState(false);
	const [accessToken, setAccessToken] = useState(null);




	useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

	const { jwtToken, setJwtToken } = useContext(authContext);
	const loginHandle = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/auth/sign-in/",
				JSON.stringify({ user, pwd }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			console.log(response.data.jwt["access_token"]);
			setJwtToken(response.data.jwt["access_token"]);
			setUser("");
			setPwd("");
			setSuccess(true);
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 400) {
				setErrMsg("Missing Username or Password");
			} else if (err.response?.status === 406) {
				setErrMsg("Unauthorized");
			} else {
				setErrMsg("Login Failed");
			}
		}
	};

	const registerHandle = async (e) => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/auth/sign-up/",
				JSON.stringify({ user, pwd, email, fullName }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			setAccessToken(response.data.jwt["access_token"]);
			const roles = response?.data?.roles;
			setUser("");
			setPwd("");
			setEmail("");
			setFullName("");
			setSuccess(true);
			tokenRecieve(accessToken);
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 400) {
				setErrMsg("Missing Username or Password");
			} else if (err.response?.status === 406) {
				setErrMsg("Unauthorized");
			} else {
				setErrMsg("Login Failed");
			}
		}
	};

	const RegisterButton = () => {
		return <div className="d-grid gap-2 mt-3"><button type="submit" className="btn btn-primary" onClick={registerHandle}>Register</button> </div>;
	};

	const LoginButton = () => {
		return <div className="d-grid gap-2 mt-3"><button type="submit" className="btn btn-primary" onClick={loginHandle}>Login</button> </div>;
	};

	return (
		<section>
			<p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
				{errMsg}
			</p>
			<div className="Auth-form-container">
      		<form className="Auth-form">
        	<div className="Auth-form-content">
			{registerBool ? <h1 className="Auth-form-title">Register Now</h1> : <h1 className="Auth-form-title">Sign In</h1>}
			{registerBool ? (
			<div className="form-group mt-3">
				<p>Full Name:</p>
				<input
					type="text"
					className="form-control mt-1"
              		placeholder="Enter first name"
					value={fullName}
					required
					onChange={(e) => setFullName(e.target.value)}
				/>
				<div className="form-group mt-3">
				<p>Email :</p>
				<input
					type="text"
					className="form-control mt-1"
              		placeholder="Enter email"
					value={email}
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
				</div>
			</div>
		): null}
			<div className="form-group mt-3">
			<p>Username:</p>
			<input
				type="text"
				className="form-control mt-1"
              	placeholder="Enter username"
				value={user}
				required
				onChange={(e) => setUser(e.target.value)}
			/>
			</div>
			<div className="form-group mt-3">
			<p>Password:</p>
			<input
				type="password"
				className="form-control mt-1"
                placeholder="Enter password"
				value={pwd}
				required
				onChange={(e) => setPwd(e.target.value)}
			/>
			</div>
			<div className="d-grid gap-2 mt-3">
			<p>
				{registerBool ? (
					<RegisterButton></RegisterButton>
				) : (
					<LoginButton></LoginButton>
				)}
				<br />
				<span className="line">
					<div className="d-grid gap-1 mt-1"
						onClick={() => {
							setRegisterBool(!registerBool);
							console.log(registerBool);
						}}
					>
						{registerBool ? <button type="submit" className="btn btn-warning"> Sign in here </button> : <button type="submit" className="btn btn-warning">Register here</button>}
					</div>
				</span>
			</p>
			</div>
			</div>
			</form>
			</div>
		</section>
	);
};

export default LoginPage;
