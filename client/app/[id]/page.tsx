"use client"

import TwitterLayout from '@/components/Layout/twitterLayout'
import { useCurrentUser } from '@/hooks/user';
import { NextPage } from 'next'
import React from 'react'
import { BsArrowLeft } from "react-icons/bs";
import Image from 'next/image';
import FeedCard from '@/components/FeedCard';
import { Tweet } from '@/gql/graphql';
import { useRouter } from 'next/router';

const UserProfilePage: NextPage= () => {


  const { user } = useCurrentUser();
const router = useRouter();
console.log(router.query)
  return (
    <div>
      <TwitterLayout>
            <div className=''>
                <nav className='flex items-center gap-6  px-2 py-3'>
                    <BsArrowLeft className='text-2xl' />
                    <div>
                      { user && <h3 className='text-white text-2xl font-bold'>{user.firstName}</h3>}
                        <h3 className='text-lg text-slate-500 font-medium'>{user?.tweets?.length} tweets  </h3>
                    </div>
                </nav>
                <div className=' border-b border-slate-800 p-4'>
                 {
                  user?.profileImageUrl && <Image src={user?.profileImageUrl} width={100} height={100} alt="Profile Image" className="rounded-full " />
                 }
                 <h3 className='text-white text-2xl font-bold mt-4' >{user?.firstName} {user?.lastName}</h3>
                </div>
                <div>
                  {
                  user?.tweets?.map(tweet => <FeedCard key={tweet?.id} data={tweet as Tweet} />)
                  }
                </div>
            </div>
        </TwitterLayout> 
    </div>
  )
}

export default UserProfilePage
