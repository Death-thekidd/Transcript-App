import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const College = () => {
	const [college, setCollege] = useState([]);
	const [addCollege, setAddCollege] = useState("");
	const [hide, setHide] = useState(false);
	const [search, setSearch] = useState("");
	const [collegeId, setCollegeId] = useState("");
	// console.log(search);

	useEffect(() => {
		fetchColleges();
	}, []);

	const fetchColleges = async () => {
		try {
			const res = await fetch("https://dtkapp.com.ng/colleges");

			if (!res.status === 200) throw new Error("Couldn't fetch API");
			const resJson = await res.json();
			setCollege(resJson.data);
			console.log(resJson.data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleCreateCollege = async function (e) {
		e.preventDefault();

		try {
			let res = await fetch(
				"https://dtkapp.com.ng/create-college",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: addCollege,
					}),
				}
			);

			if (res.status === 200) {
				toast.success("College created Successfully");
				setHide(false);
				fetchColleges();
			}
		} catch (err) {
			toast.error(err);
			setHide(false);
		}
	};

	const onDelete = async function (id) {
		try {
			let res = await fetch(
				`https://dtkapp.com.ng/delete-college/${id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id: id,
					}),
				}
			);

			if (res.status === 204) {
				toast.success("Ypu have deleted a College");
			}
		} catch (err) {
			toast.error(err);
			// setHide(false);
		}
	};

	return (
		<div className="max-w-screen-xl mx-auto px-4 md:px-8 pt-10">
			<div className="items-start justify-between md:flex">
				<div className="max-w-lg">
					<h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
						Manage Colleges
					</h3>
					<p className="text-gray-600 mt-2">
						Select and Edit any college of your choice
					</p>
				</div>
				<div className="mt-3 md:mt-0">
					<button
						onClick={() => setHide((prev) => !prev)}
						className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
					>
						Add College
					</button>
				</div>
			</div>

			<div className="pt-5 flex justify-end ">
				{hide === true ? (
					<form
						onSubmit={handleCreateCollege}
						className="flex flex-row space-x-2"
					>
						<input
							type="text"
							value={addCollege}
							onChange={(e) => {
								const details = e.target.value;
								setAddCollege(details);
							}}
							placeholder="Add College"
							className="border focus:outline-none px-3 text-base focus:border-green-400"
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
					placeholder="Search Colleges"
					className="border w-full px-4 rounded-md py-1.5 focus:outline-none focus:border-blue-400 "
				/>
			</div>

			<div className="mt-9 shadow-sm border rounded-lg overflow-x-auto">
				<table className="w-full table-auto text-sm text-left">
					<thead className="bg-gray-50 text-gray-600 font-medium border-b">
						<tr>
							<th className="py-3 px-6">College Name</th>
							<th className="py-3 px-6">College ID</th>

							<th className="py-3 px-6"></th>
						</tr>
					</thead>
					<tbody className="text-gray-600 divide-y">
						{college
							.filter((item) => {
								return search.toLowerCase() === ""
									? item
									: item.name.toLowerCase().includes(search);
							})
							.map((item, idx) => (
								<tr key={idx + 1}>
									<td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
									<td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
									<td className="text-right px-6 whitespace-nowrap">
										<a
											href=""
											className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
										>
											Edit
										</a>
										<button
											onClick={() => {
												// setCollegeId(item.id);
												onDelete(item.id);
												// console.log(idx);
											}}
											className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
										>
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

export default College;
