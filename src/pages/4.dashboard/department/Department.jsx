import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Department = () => {
	const [department, setDepartment] = useState([]);
	const [addDepartment, setAddDepartment] = useState("");
	const [collegeOptions, setCollegeOptions] = useState([]);
	const [collegeSelectedOption, setCollegeSelectedOption] = useState(null);
	const [hide, setHide] = useState(false);
	const [search, setSearch] = useState("");
	// const [college, setCollege] = useState([]);

	// Department Fetching
	useEffect(() => {
		fetchDepartments();
	}, []);

	const fetchDepartments = async () => {
		try {
			const res = await fetch(`https://dtkapp.com.ng/departments`);

			if (!res.status === 200) throw new Error("Couldn't fetch API");
			const resJson = await res.json();
			setDepartment(resJson.data);
			console.log(resJson.data);
		} catch (err) {
			console.error(err);
		}
	};

	// Creating Department
	const handleCreateDepartment = async function (e) {
		e.preventDefault();

		try {
			let res = await fetch("https://dtkapp.com.ng/create-department", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: addDepartment,
					college: collegeSelectedOption,
				}),
			});
			if (res.status === 200) {
				toast.success("Department created Successfully");
				setHide(false);
				fetchDepartments();
			}
		} catch (err) {
			toast.error(err);
			setHide(false);
		}
	};

	//College Fetching API
	useEffect(() => {
		fetchCollegeOptions();
	}, []);

	const fetchCollegeOptions = async () => {
		try {
			const response = await fetch("https://dtkapp.com.ng/colleges");
			const data = await response.json();
			// setCollege(data.data);
			setCollegeOptions(data.data);
			console.log(data);
		} catch (error) {
			console.error("Error fetching options:", error);
		}
	};

	const handleCollegeChange = (event) => {
		const selectedValue = event.target.value;
		setCollegeSelectedOption(selectedValue);
	};

	return (
		<div className="max-w-screen-xl mx-auto px-4 md:px-8 pt-10">
			<div className="items-start justify-between md:flex">
				<div className="max-w-lg">
					<h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
						Manage Departments
					</h3>
					<p className="text-gray-600 mt-2">
						Select and Edit any department of your choice
					</p>
				</div>
				<div className="mt-3 md:mt-0">
					<button
						onClick={() => setHide((prev) => !prev)}
						className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
					>
						Add Department
					</button>
				</div>
			</div>

			<div className="flex justify-end">
				{hide === true ? (
					<form
						onSubmit={handleCreateDepartment}
						className="flex flex-col space-y-4 border border-green-600 p-4"
					>
						<select
							name="college"
							id="college"
							className="border focus:outline-none px-3 text-base focus:border-green-400"
							required
							onChange={handleCollegeChange}
						>
							<option value="">Select a College</option>
							{collegeOptions.map((option) => (
								<option key={option.name} value={option.name}>
									{option.name}
								</option>
							))}
						</select>

						<input
							type="text"
							value={addDepartment}
							onChange={(e) => {
								const details = e.target.value;
								setAddDepartment(details);
							}}
							className="border focus:outline-none px-3 text-base focus:border-green-400"
							placeholder="Add Department"
						/>
						<button
							type="submit"
							className="bg-green-400 text-white px-5 rounded-md py-1.5"
						>
							Create
						</button>
					</form>
				) : (
					""
				)}
			</div>

			<div className="pt-2">
				<input
					type="text"
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search Department"
					className="border w-full px-4 rounded-md py-1.5 focus:outline-none focus:border-blue-400 "
				/>
			</div>

			<div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
				<table className="w-full table-auto text-sm text-left">
					<thead className="bg-gray-50 text-gray-600 font-medium border-b">
						<tr>
							<th className="py-3 px-6">Department Name</th>
							<th className="py-3 px-6">Department ID</th>
							<th className="py-3 px-6">College Name</th>
							<th className="py-3 px-6">College ID</th>
							<th className="py-3 px-6"></th>
						</tr>
					</thead>
					<tbody className="text-gray-600 divide-y">
						{department
							.filter((item) => {
								return search.toLowerCase() === ""
									? item
									: item.name.toLowerCase().includes(search.toLowerCase());
							})
							.map((dept, idx) => (
								<tr key={idx}>
									<td className="px-6 py-4 whitespace-nowrap">{dept.name}</td>
									<td className="px-6 py-4 whitespace-nowrap">{dept.id}</td>

									{/*  */}
									<td className="px-6 py-4 whitespace-nowrap">
										{dept.collegeName}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{dept.collegeId}
									</td>

									<td className="text-right px-6 whitespace-nowrap">
										<a
											href=""
											className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
										>
											Edit
										</a>
										<button className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
											Delete
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Department;
