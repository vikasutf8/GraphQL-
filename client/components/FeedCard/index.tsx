import Image from 'next/image'
import React from 'react'
import { CiHeart,CiShare2 } from "react-icons/ci";
import { FaRetweet } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";
import { HiSaveAs } from "react-icons/hi";
import { Tweet } from '@/gql/graphql';
import Link from 'next/link';

interface FeedCardIconProps {
    title: string;
    icon: React.ReactNode;
}

const FeedCartIcons: FeedCardIconProps[] = [
    {
        title: "Comment",
        icon: <FaComments />,
    },
    {
        title: "Like",
        icon: <CiHeart />
    },
    {
        title: "Retweet",
        icon: <FaRetweet />
    },
    {
        title: "Share",
        icon: <CiShare2 />
    },
    {
        title: "Save",
        icon: <HiSaveAs />
    },
]

interface FeedCardProps {
    data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = ({data}) => {
    // console.log(data,"data at feed card")
    return (
        <>
        <div className=' border border-r-0 border-b-0 border-l-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer' >
            <div className='grid grid-cols-12 gap-4 '>
                <div className='col-span-1'>
                {
                    data.auther.profileImageUrl && <Image src={data.auther.profileImageUrl} alt="user-avatar" width={65} height={65} className='rounded-full' />
                }
                </div>
                <div className='col-span-11'>
                  <Link href={`/${data.auther.id}`}>
                 {data.auther.firstName} {data.auther.lastName} 
                  </Link>
                    <p>
                       {data.content}
                    </p>
                    <div className='flex justify-between mt-5 text-xl items-center p-2 w-[90%]'>
                        {
                            FeedCartIcons.map((item, index) => (
                                <div key={index}>
                                    {item.icon}
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
            
        </div>
       
       </>
    )
}

export default FeedCard
