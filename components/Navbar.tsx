import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../utils/tiktik-logo.png";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineLayout } from "react-icons/ai";

const Navbar = () => {
	//const user = false;

	const { userProfile, addUser, removeUser } = useAuthStore();

	return (
		<div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
			<Link href="/">
				<div className="w-[100px] md:w-[130px]">
					<Image
						className="cursor-pointer"
						src={Logo}
						alt="TikTok"
						layout="responsive"
					></Image>
				</div>
			</Link>
			<div>Search</div>
			<div>
				{userProfile ? (
					<div className="flex gap-5 md:gap-10">
						<Link href="/Upload">
							<button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
								<IoMdAdd className="text-xl" />{" "}
								<span className="hidden md:block">Upload</span>
							</button>
						</Link>
						{userProfile.image && (
							<Link href="/">
								<>
									<Image
										width={40}
										height={40}
										className="rounded-full cursor-pointer"
										src={userProfile.image}
										alt="Profile Picture"
									></Image>
								</>
							</Link>
						)}
						<button type="button"
							className="px-2"
							onClick={() => {googleLogout(); removeUser()}}
						>
							<AiOutlineLayout color="red" fontSize={21}/>
						</button>
					</div>
				) : (
					<GoogleLogin
						onSuccess={(response) => createOrGetUser(response, addUser)}
						onError={() => console.log("Login Failed")}
					/>
				)}
			</div>
		</div>
	);
};

export default Navbar;
