import { useEffect, useState } from "react";

const Users = () => {
	const [userData, setUserData] = useState([]);
	// const userId = localStorage.getItem('transcript-uid');
	// console.log(userId);

	useEffect(() => {
		fetchColleges();
	});

	const fetchColleges = async function () {
		try {
			const res = await fetch(`https://api.transcript.dtkapp.com.ng/users`);

			if (!res.status === 200) throw new Error("Couldn't fetch API");
			const resJson = await res.json();
			setUserData(resJson.data);
			console.log(userData);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="max-w-screen-xl mx-auto px-4 md:px-8 pt-10">
			<div className="">
				<div className="max-w-lg">
					<h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Users</h3>
					<p className="text-gray-600 mt-2">Below is a Table of all Users</p>
				</div>
			</div>

			<div className="mt-12 relative h-max overflow-auto">
				<table className="w-full table-auto text-sm text-left">
					<thead className="text-gray-600 font-medium border-b">
						<tr>
							<th className="py-3 pr-6">Name</th>
							<th className="py-3 pr-6">Username</th>
							<th className="py-3 pr-6">Email</th>
							<th className="py-3 pr-6">College</th>
							<th className="py-3 pr-6">College ID</th>
							<th className="py-3 pr-6">Department</th>
							<th className="py-3 pr-6">Department ID</th>
							<th className="py-3 pr-6"></th>
						</tr>
					</thead>
					<tbody className="text-gray-600 divide-y">
						{userData.map((item, idx) => (
							<tr key={item.id}>
								<td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
								<td className="pr-6 py-4 whitespace-nowrap">{item.username}</td>
								<td className="pr-6 py-4 whitespace-nowrap">{item.email}</td>
								<td className="pr-6 py-4 whitespace-nowrap">{item.college}</td>

								<td className="pr-6 py-4 whitespace-nowrap">
									{item.collegeID}
								</td>
								<td className="pr-6 py-4 whitespace-nowrap">
									{item.department}
								</td>
								<td className="pr-6 py-4 whitespace-nowrap">
									{item.departmentID}
								</td>

								<td className="text-right whitespace-nowrap">
									<a
										href=""
										className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
									>
										Manage
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Users;
