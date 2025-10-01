
"use client"
import React, { useCallback, useMemo } from 'react'
import Image from "next/image";
import Link from 'next/link';

import { FaSquareXTwitter } from 'react-icons/fa6';
import { IoMdHome } from 'react-icons/io';
import { CiHashtag, CiBookmark } from 'react-icons/ci';
import { RiNotification4Line } from 'react-icons/ri';
import { FaRegEnvelope } from 'react-icons/fa';
import { LiaTwitterSquare } from 'react-icons/lia';
import { CgProfile, CgMoreO } from 'react-icons/cg';


import { useQueryClient } from '@tanstack/react-query';
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from 'react-hot-toast';

import { useCurrentUser } from '@/hooks/user';
import graphQLClient from '@/clients/api';
import { verifyGoogleToken } from '@/graphql/query/user';



interface TwitterLayoutProps {
    children: React.ReactNode;
}
interface TwitterIconProps {
    title: string;
    icon: React.ReactNode;
    link :string
}



const TwitterLayout: React.FC<TwitterLayoutProps> = ({ children }) => {
    const queryClient = useQueryClient();
    const { user } = useCurrentUser();

    const sidebarMenuIcons: TwitterIconProps[] = useMemo(() => 
        [
            {
                title: "Home",
                icon: <IoMdHome />,
                link: "/",
            },
            {
                title: "Explore",
                icon: <CiHashtag />,
                link: "/explore",
            },
            {
                title: "Notifications",
                icon: <RiNotification4Line />   ,
                link: "/notifications",
            },
            {
                title: "Messages",
                icon: <FaRegEnvelope />,
                link: "/messages",
            },
            {
                title: "Bookmarks",
                icon: <CiBookmark />,
                link: "/bookmarks",
            },
            {
                title: "Twitter Blue",
                icon: <LiaTwitterSquare />,
                link: "/twitter-blue",
            },
            {
                title: "Profile",
                icon: <CgProfile />,
                link: `/${user?.id}`,
            },
            {
                title: "More",
                icon: <CgMoreO />,
                link: "/more",
            },
        ], [user?.id]);

    const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {

        const googleToken = cred.credential;
        if (!googleToken) return toast.error("Authentication failed");

        const res = await graphQLClient.request(verifyGoogleToken, { token: googleToken })

        toast.success("Login successful");

        if (res.verifyGoogleToken) {
            window.localStorage.setItem("__twitterAccessToken", res.verifyGoogleToken);

        }
        //automatic
        await queryClient.invalidateQueries({
            queryKey: ['current-user'],
        });

    }, []);

    return (
        <div className="grid grid-cols-12 h-screen w-screen px-56">

            <div className="col-span-3  pt-8 flex justify-end px-32 relative">
                <div className=''>
                    <div className="p-2 text-4xl h-fit w-fit hover:bg-gray-500 hover:rounded-full cursor-pointer transition-all relative">
                        <FaSquareXTwitter />
                    </div>
                    <div className="mt-6  text-2xl font-semibold ">
                        <ul>
                            {
                                sidebarMenuIcons.map((item, index) => (
                                    <li key={index} className=" flex flex-col mt-5">
                               
                                            <Link  href={item.link} className="px-4 py-2 flex align-center gap-5 h-fit w-fit hover:bg-gray-500 hover:rounded-full cursor-pointer transition-all">
                                            <span className="text-2xl">{item.icon}</span>
                                            <span className="text-xl">{item.title}</span>
                                            </Link>
                                       

                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="flex justify-center mt-5 text-2xl ">
                        <button className="px-12 py-2 bg-blue-400 hover:bg-blue-500 rounded-full cursor-pointer transition-all">
                            Tweet
                        </button>
                    </div>
                    {
                        user &&
                        <div className="absolute bottom-4 flex items-center gap-3  bg-slate-900 px-3 py-2 rounded-xl">
                            {user?.profileImageUrl && <Image src={user?.profileImageUrl} alt="Profile Image" width={50} height={50} className="rounded-full" />}
                            <div className="flex gap-2">
                                <h3 className="text-xl">{user?.firstName}</h3>
                                <h3 className="text-xl">{user?.lastName}</h3>
                            </div>
                        </div>
                    }
                </div>

            </div>
            <div className="col-span-5 border-l-1 border-r-1 border border-gray-600 ">

                {children}
            </div>
            <div className="col-span-3 p-5 w-fit">
                {
                    !user &&
                    <div className="border border-gray-200 p-5 bg-gray-600 rounded-lg">
                        <h1 className="text-2xl my-2 ">New to Twitter?</h1>
                        <GoogleLogin onSuccess={handleLoginWithGoogle} />

                    </div>
                }
            </div>
        </div>
    )
}

export default TwitterLayout
