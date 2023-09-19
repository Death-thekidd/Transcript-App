import React, { useState, useEffect } from "react";
import { Avatar, userWelcome } from "../../assets";
import {
	BuildingLibraryIcon,
	BuildingOffice2Icon,
	RectangleStackIcon,
	RocketLaunchIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const UserProfile = () => {
	const userId = localStorage.getItem("transcript-uid");
	const [user, setUser] = useState({});
	// User Fetching
	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		try {
			const res = await fetch(
				`http://api.transcript.dtkapp.com.ng/user/${userId}`
			);

			if (!res.status === 200) throw new Error("Couldn't fetch API");
			const resJson = await res.json();
			setUser(resJson.data);
			console.log(resJson.data);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div className="flex justify-center gap-5 items-center m-4 ">
			<div className=" w-[30%] h-[90%] bg-gray-100 rounded-md rounded-t-3xl">
				<div className="flex mx-auto px-4 items-center pt-9 gap-4 bg-gray-700 p-12  rounded-t-3xl">
					<div className="relative w-20 h-20">
						<span className="absolute -bottom-[0.3px] right-2 w-[14px] h-[14px] rounded-full border-white bg-green-500"></span>
						<img
							src={Avatar}
							alt="avatar-img"
							className=" rounded-full  w-full h-full"
						/>
					</div>

					<div>
						<h3 className=" text-xl font-semibold pt-3 text-gray-100">
							{user?.name}
						</h3>
						<h2 className=" text-gray-100 text-sm">{user?.email}</h2>
					</div>
				</div>

				<div>
					<div className="pt-6 px-6 cursor-pointer">
						<div className="flex items-center space-x-3 border-b pb-2">
							<BuildingLibraryIcon className="w-8 " color="rgb(82 82 82)" />
							<h1 className="text-lg">Colleges</h1>
						</div>
					</div>
					<div className="pt-6 px-6 cursor-pointer">
						<div className="flex items-center space-x-3 border-b pb-2">
							<BuildingOffice2Icon className="w-8 " color="rgb(82 82 82)" />
							<h1 className="text-lg">Departments</h1>
						</div>
					</div>
					<div className="pt-6 px-6 cursor-pointer">
						<div className="flex items-center space-x-3 border-b pb-2">
							<UserGroupIcon className="w-8 " color="rgb(82 82 82)" />
							<h1 className="text-lg">Users</h1>
						</div>
					</div>
					<div className="pt-6 px-6 cursor-pointer">
						<div className="flex items-center space-x-3 border-b pb-2">
							<RectangleStackIcon className="w-8 " color="rgb(82 82 82)" />
							<h1 className="text-lg">Request Transcript</h1>
						</div>
					</div>
					<div className="pt-6 px-6 cursor-pointer">
						<div className="flex items-center space-x-3 border-b pb-2">
							<RocketLaunchIcon className="w-8 " color="rgb(82 82 82)" />
							<h1 className="text-lg">Request Destination</h1>
						</div>
					</div>
					<div className="py-6 px-6 cursor-pointer">
						<div className="flex items-center space-x-3 ">
							<ShoppingCartIcon className="w-8 " color="rgb(82 82 82)" />
							<h1 className="text-lg">Checkout</h1>
						</div>
					</div>
					{/* <div className="pt-6 px-6 cursor-pointer">
          <div className="flex items-center space-x-3 border-b pb-2">
            <UserGroupIcon className="w-8 " color="rgb(82 82 82)" />
            <h1 className="text-lg">my Requests</h1>
          </div>
        </div>
        <div className="pt-6 px-6 cursor-pointer">
          <div className="flex items-center space-x-3 ">
            <UserGroupIcon className="w-8 " color="rgb(82 82 82)" />
            <h1 className="text-lg">Checkout</h1>
          </div>
        </div> */}
				</div>
			</div>

			<div
				className="bg-sky-100
     w-[70%] h-[90%] rounded-3xl"
			>
				<div className="p-5 flex justify-between">
					<div>
						<h1 className="text-4xl font-semibold  pt-1.5">
							<span className="bg-gradient-to-r from-[#ae67fa] to-[#f49867] inline-block text-transparent bg-clip-text">
								Welcome
							</span>{" "}
							RayTech,
						</h1>

						<h4 className="pt-4 text-xl text-gray-600">Profile Details</h4>
						<div className="space-y-8 pt-8">
							<h1 className="flex justify-between">
								<span className="text-lg text-neutral-600 font-semibold">
									Name
								</span>
								{user?.name}
							</h1>
							<h1 className="flex justify-between">
								<span className="text-lg text-neutral-600 font-semibold">
									Email
								</span>
								{user?.email}
							</h1>
							<h1 className="flex justify-between ">
								<span className="text-lg text-neutral-600 font-semibold">
									College
								</span>
								{user?.college}
							</h1>
							<h1 className="flex justify-between">
								<span className="text-lg text-neutral-600 font-semibold">
									Department
								</span>
								{user?.department}
							</h1>
						</div>
					</div>

					<div className="">
						<img src={userWelcome} alt="" className=" bg-transparent" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
