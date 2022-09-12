import React, { useRef, useState, useEffect, useContext } from "react";
import { authContext } from "../handlers/persistance/context.js";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import "./homepage.css";
function Homepage({ accessToken }) {
	const { jwtToken, setJwtToken } = useContext(authContext);
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState({});
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const formData = new FormData();




	const searchHandle = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/search/alpha/search",
				JSON.stringify({ query: searchText ,userID: "6316389a31d514a5a3402460" }),
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + jwtToken,
					},
					withCredentials: true,
				}
			);
			setSearchText("");
			console.log(JSON.stringify(response.data.hits.hits));
			setSearchResults(JSON.stringify(response.data.hits.hits));

		} catch (err) {
			console.log(err);
		}
	};

	const uploadFiles = async (e) => {
		e.preventDefault();
		console.log(uploadFiles);

		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/upload/alpha/upload/?userID=631d24be05ada5869272b14b",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: "Bearer " + jwtToken,
					},
					withCredentials: true,
				}
			);
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};

	const handleUploadFiles = (files) => {
		// const uploaded = [...uploadedFiles];
		// files.some((file) => {
		// 	uploaded.push(file);
		// });
		// setUploadedFiles(uploaded);
		files.some((file) => {
			formData.append("files", file);
		});
	};

	const handleFileEvent = (e) => {
		const chosenFiles = Array.prototype.slice.call(e.target.files);
		handleUploadFiles(chosenFiles);
	};


	return (
		<div class="container">
			<div class="row height d-flex justify-content-center align-items-center">
				
				<div class="form">
				
				<h1 class="text-center mt-10">Search Files</h1>
				<i class="fa fa-search"></i>
				<input 
					
					type="text" 
					class="form-control form-input gap-2" 
					placeholder="Search anything..."
					onChange={(e) => setSearchText(e.target.value)}
				></input>
				<span class="left-pan"><i class="fa fa-microphone">
				
					</i></span>
					<div className="d-grid gap-1 mt-5">
					<button class="btn btn-outline-primary" onClick={searchHandle}>
					Search
					</button>
					</div>
				
				
				<div class="form gap-5 mt-5 d-flex justify-content-center">
				<input
					
					type="file"
					multiple
					name="file"
					id="file"
					onChange={handleFileEvent}
				/>
				<button class="btn btn-danger" onClick={uploadFiles}>Upload Now</button>
				</div>

				</div>
				
				
			</div>
			<div>
				
			</div>
		</div>
	);
}

export default Homepage;
