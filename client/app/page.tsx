"use client"
import Image from "next/image";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { CiHashtag ,CiBookmark} from "react-icons/ci";
import { RiNotification4Line } from "react-icons/ri";
import { FaRegEnvelope } from "react-icons/fa";
import { LiaTwitterSquare } from "react-icons/lia";
import { CgProfile,CgMoreO  } from "react-icons/cg";

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
  return (
      <div>
        <div className="grid grid-cols-12 h-screen w-screen px-56">

          <div className="col-span-3 border border-red-500  px-4  pt-8">
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
          <div className="col-span-6 border-x-1 border-slate-600">
                
          </div>
          <div className="col-span-3 ">
            
          </div>
        </div>
      </div>
  );
}
