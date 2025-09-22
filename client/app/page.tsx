"use client"
import Image from "next/image";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { CiHashtag ,CiBookmark} from "react-icons/ci";
import { RiNotification4Line } from "react-icons/ri";
import { FaRegEnvelope } from "react-icons/fa";
import { LiaTwitterSquare } from "react-icons/lia";
import { CgProfile,CgMoreO  } from "react-icons/cg";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";
import toast from "react-hot-toast";
import graphQLClient from "@/clients/api";
import { verifyGoogleToken } from "@/graphql/query/user";

interface TwitterIconProps {
    title: string;
    icon: React.ReactNode;
}

const sidebarMenuIcons: TwitterIconProps[] = [
    {
        title: "Home",
        icon: <IoMdHome />
    },
    {
        title: "Explore",
        icon: <CiHashtag />
    },
    {
        title: "Notifications",
        icon: <RiNotification4Line />
    },
    {
        title: "Messages",
        icon: <FaRegEnvelope />
    },
    {
        title: "Bookmarks",
        icon: <CiBookmark />
    },
    {
        title: "Twitter Blue",
        icon: <LiaTwitterSquare />
    },
    {
        title: "Profile",
        icon: <CgProfile />
    },
    {
        title: "More",
        icon: <CgMoreO  />
    } ,
]

export default function Home() {

const handleLoginWithGoogle =useCallback(async(cred: CredentialResponse) => {
  const googleToken = cred.credential; 
  if(!googleToken) return toast.error("Authentication failed");

  const res = await graphQLClient.request(verifyGoogleToken,{token: googleToken})

  toast.success("Login successful");

  if(res.verifyGoogleToken){
    window.localStorage.setItem("__twitterAccessToken", res.verifyGoogleToken);
  }
  
}, []);
  return (
      <div>
        <div className="grid grid-cols-12 h-screen w-screen px-56">

          <div className="col-span-3 px-4 pt-8">
            <div className="p-2 text-4xl h-fit w-fit hover:bg-gray-500 hover:rounded-full cursor-pointer transition-all">
            <FaSquareXTwitter />
            </div>
            <div className="mt-6  text-2xl font-semibold ">
              <ul>
                {
                  sidebarMenuIcons.map((item, index) => (
                    <li key={index} className=" flex flex-col mt-5">
                      <div className="px-4 py-2 flex align-center gap-5 h-fit w-fit hover:bg-gray-500 hover:rounded-full cursor-pointer transition-all">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-xl">{item.title}</span> 
                      </div>
                      
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
          
          </div>
          <div className="col-span-5 border-l-1 border-r-1 border border-gray-600 ">
                <FeedCard />
          </div>
          <div className="col-span-3 p-5 w-fit">
             <div className="border border-gray-200 p-5 bg-gray-600 rounded-lg">
              <h1 className="text-2xl my-2 ">New to Twitter?</h1>
             <GoogleLogin onSuccess={handleLoginWithGoogle} />
             </div>
          </div>
        </div>
      </div> 
  );
}
