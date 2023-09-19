import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SignupImg, Welcome } from "../../assets";

const Signup = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	// Department Fetching API
	const [options, setOptions] = useState([]);
	const [selectedOption, setSelectedOption] = useState(null); // Track selected options for Department

	//College Fetching API
	const [collegeOptions, setCollegeOptions] = useState([]);
	const [collegeSelectedOption, setCollegeSelectedOption] = useState(null); // Track selected option

	useEffect(() => {
		fetchOptions(); // Fetch options when the component mounts
	}, []);

	const fetchOptions = async () => {
		try {
			const response = await fetch(`https://dtkapp.com.ng/departments`); // Replace with your API endpoint
			const data = await response.json();
			setOptions(data.data); // Set the received data as options
		} catch (error) {
			console.error("Error fetching options:", error);
		}
	};

	const handleOptionChange = (event) => {
		const selectedValue = event.target.value;
		setSelectedOption(selectedValue); // Update selected option
		// const selected = options.find((option) => option.title === selectedValue);
	};

	useEffect(() => {
		fetchCollegeOptions(); // Fetch options when the component mounts
	}, []);

	const fetchCollegeOptions = async () => {
		try {
			const response = await fetch("http://dtkapp.com.ng/colleges"); // Replace with your API endpoint
			const data = await response.json();
			setCollegeOptions(data.data); // Set the received data as options
		} catch (error) {
			console.error("Error fetching options:", error);
		}
	};

	const handleCollegeChange = (event) => {
		const selectedValue = event.target.value;
		setCollegeSelectedOption(selectedValue); // Update selected option
		// const selected = options.find((option) => option.title === selectedValue);
	};

	const handleSubmit = async function (e) {
		e.preventDefault();
		try {
			console.log({
				name: name,
				email: email,
				username: username,
				password: password,
				confirmPassword: confirmPassword,
				college: collegeSelectedOption,
				department: selectedOption,
				userType: "Student",
				role: "User",
			});
			let res = await fetch("https://dtkapp.com.ng/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: name,
					email: email,
					username: username,
					password: password,
					confirmPassword: confirmPassword,
					college: collegeSelectedOption,
					department: selectedOption,
					userType: "Student",
					role: "User",
				}),
			});
			let resJson = await res.json();
			console.log(res, resJson);
			if (res.status === 201) {
				toast.success(`${resJson?.message}`);
				setTimeout(() => navigate("/signin"), 2000);
			} else {
				if (resJson?.error) toast.error(resJson?.error);
				else toast.error(`Something went wrong`);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="grid place-content-center overflow-hidden md:h-screen bg-gradient-to-r from-[#5d12ad19] to-sky-50">
			<div className="w-full flex md:flex-row-reverse flex-col justify-between md:p-14 rounded-md shadow-2xl">
				<div className="md:w-1/2 w-full md:bg-neutral-50 p-4 flex items-center justify-center">
					<img src={Welcome} alt="" className="md:w-full w-[90%]" />
				</div>

				<div className="md:w-1/2 w-full flex flex-col justify-center  bg-white pl-7 pt-6 md:pb-3 pb-5 rounded-t-3xl md:rounded-none ">
					<h1 className="text-4xl font-semibold text-neutral-600">
						Welcome to{" "}
						<span className="bg-gradient-to-r from-[#ae67fa] to-[#f49867] inline-block text-transparent bg-clip-text">
							Transcript Request
						</span>
					</h1>
					<h6 className="text-lg font-semibold text-neutral-600 pt-1">
						Create your account
					</h6>

					<form
						onSubmit={handleSubmit}
						className="py-4 grid grid-cols-2 gap-x-1 gap-y-4 "
					>
						<div className=" flex flex-col col-start-1 col-end-[-1]">
							<label htmlFor="name" className="text-base pb-1 font-medium">
								Name
							</label>
							<input
								type="text"
								name="name"
								id="name"
								value={name}
								onChange={(e) => {
									const personName = e.target.value;
									setName(personName);
								}}
								placeholder="Your name"
								className="border w-[95%] py-1.5 rounded-[4px] focus:border focus:border-blue-400 px-3 outline-none"
								required
							/>
						</div>

						<div className="flex flex-col col-start-1 col-end-[-1]">
							<label htmlFor="username" className="text-base pb-1 font-medium">
								Username
							</label>
							<input
								type="text"
								name="username"
								id="username"
								value={username}
								onChange={(e) => {
									const personName = e.target.value;
									setUsername(personName);
								}}
								placeholder="Your Username"
								className="border w-[95%] py-1.5  rounded-[4px] focus:border focus:border-blue-400 px-3 outline-none"
								required
							/>
						</div>

						<div className="flex flex-col col-start-1 col-end-[-1]">
							<label htmlFor="email" className=" text-base pb-1 font-medium">
								Email
							</label>
							<input
								type="email"
								name="email"
								id="email"
								value={email}
								placeholder="example@mail.com"
								onChange={(e) => {
									const details = e.target.value;
									setEmail(details);
								}}
								className="border w-[95%] py-1.5 rounded-[4px] focus:border focus:border-blue-400 px-3 outline-none "
								required
							/>
						</div>

						<div className="flex flex-col">
							<label htmlFor="password" className="text-base pb-1 font-medium">
								Password
							</label>
							<input
								type="password"
								name="password"
								value={password}
								placeholder="password"
								onChange={(e) => {
									const details = e.target.value;
									setPassword(details);
								}}
								id="password"
								className="border w-[90%] py-1.5 rounded-[4px] focus:border focus:border-blue-400 px-3 outline-none"
								required
							/>
						</div>

						<div className="flex flex-col">
							<label
								htmlFor="confirm Password"
								className="text-base pb-1 font-medium"
							>
								Confirm Password
							</label>
							<input
								type="password"
								name="confirm Password"
								placeholder="confirm password"
								value={confirmPassword}
								onChange={(e) => {
									const details = e.target.value;
									setConfirmPassword(details);
								}}
								id="password"
								className="border w-[90%] py-1.5 rounded-[4px] focus:border focus:border-blue-400 px-3 outline-none"
								required
							/>
						</div>

						<div className="flex flex-col">
							<label htmlFor="college" className=" text-base pb-1 font-medium">
								College:{" "}
								<span className="text-neutral-500">
									{collegeSelectedOption}
								</span>
							</label>

							<select
								name="college"
								id="college"
								className="border w-[90%] py-1.5 rounded-[4px] focus:border focus:border-blue-400 px-3 outline-none"
								required
								onChange={handleCollegeChange}
							>
								<option value="">Select an option</option>
								{collegeOptions.map((option) => (
									<option key={option.name} value={option.name}>
										{option.name}
									</option>
								))}
							</select>
						</div>

						<div className="flex flex-col">
							<label
								htmlFor="department"
								className=" text-base pb-1 font-medium"
							>
								Department:{" "}
								<span className="text-neutral-500">{selectedOption}</span>
							</label>

							<select
								name="department"
								id="department"
								className="border w-[90%] py-1.5 rounded-[4px] focus:border focus:border-blue-400 px-3 outline-none"
								required
								onChange={handleOptionChange}
							>
								<option value="">Select an option</option>
								{options.map((option) => (
									<option key={option.name} value={option.name}>
										{option.name}
									</option>
								))}
							</select>
						</div>

						{/* <div></div> */}

						<div className="flex flex-col col-start-1 md:col-end-1 col-end-[-1]">
							{/* <div></div> */}
							<button
								type="submit"
								className="md:w-fit w-[95%] text-white transition-all ease-out bg-[#ab60fa] hover:bg-[#9f5fe3] py-2 px-8 rounded-sm"
							>
								Sign up &rarr;
							</button>
						</div>
					</form>

					<h6 className="text-lg text-neutral-600 pt-1">
						Already have an account?{" "}
						<a href="/signin" className="text-indigo-700 underline">
							Sign in
						</a>
					</h6>
				</div>
			</div>
		</div>
	);
};

export default Signup;
