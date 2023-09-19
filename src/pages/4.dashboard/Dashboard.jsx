import React, { useEffect, useRef, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

// const userInfo = [
//   { tag: 'Name', result: 'Users Name' },
//   { tag: 'Email', result: 'Users Email' },
//   { tag: 'College', result: 'Users College' },
//   { tag: 'Department', result: 'Users Department' },
// ];

const Dashboard = () => {
	const navigate = useNavigate();
	const userId = localStorage.getItem("transcript-uid");
	useEffect(() => {
		console.log(userId);
		if (!userId) navigate("/signin");
	}, [userId, navigate]);
	return (
		<>
			<div className="pb-5 bg-gray-50">
				<Navbar />
				<Outlet />
			</div>
		</>
	);
};

export default Dashboard;
