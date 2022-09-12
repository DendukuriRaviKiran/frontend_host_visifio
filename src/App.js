import React, { useRef, useState, useEffect, useContext } from "react";
import LoginPage from "./components/loginpage.js";
import Homepage from "./components/homepage.js";
import { authContext } from "./handlers/persistance/context.js";

function App() {
	const [jwtToken, setJwtToken] = useState(null);

	return (
		<div>
			<authContext.Provider value={{ jwtToken, setJwtToken }}>
				{jwtToken ? <Homepage /> : <LoginPage />}
			</authContext.Provider>
		</div>
	);
}

export default App;
