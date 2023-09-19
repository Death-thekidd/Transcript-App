import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/1.home/Home";
import Signin from "./pages/2.signin/Signin";
import Signup from "./pages/3.signup/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/4.dashboard/Dashboard";
import Department from "./pages/4.dashboard/department/Department";
import TranscriptReq from "./pages/4.dashboard/transcriptReq/transcriptReq";
import Destination from "./pages/4.dashboard/destination/destination";
import Users from "./pages/4.dashboard/users/Users";
import Checkout from "./pages/4.dashboard/checkout/Checkout";
import College from "./pages/4.dashboard/college/college";
import UserProfile from "./pages/user-profile/userProfile";

function App() {
	return (
		<div className="">
			<ToastContainer />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/dashboard" element={<Dashboard />}>
					<Route index element={<UserProfile />} />
					<Route path="college" element={<College />} />
					<Route path="destination" element={<Destination />} />
					<Route path="department" element={<Department />} />
					<Route path="transcript-req" element={<TranscriptReq />} />
					<Route path="users" element={<Users />} />
					<Route path="checkout" element={<Checkout />} />
				</Route>
				{/* <Route path="/dashboard/department" element={<Department />} /> */}
			</Routes>
		</div>
	);
}

export default App;
