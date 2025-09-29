"use client"
import Image from "next/image";
import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import FeedCard from "@/components/FeedCard";
import { useCurrentUser } from "@/hooks/user";

import { IoImageOutline } from "react-icons/io5";
import { HiOutlineGif } from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import TwitterLayout from "@/components/Layout/twitterLayout";


interface TwitterIconProps {
  title: string;
  icon: React.ReactNode;
}



export default function Home() {
  const queryClient = useQueryClient();
  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweets();//initial value
  const { mutateAsync: createTweet } = useCreateTweet();
  const [content, setContent] = useState('');



  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
  }, []);

  const handleCreateTweet = useCallback(() => {
    createTweet({ content })

  }, [content, createTweet]);


  return (
    <div>
      <TwitterLayout>
        <div>
            <div className=' border border-r-0 border-b-0 border-l-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer' >
              <div className='grid grid-cols-12 gap-4 '>
                <div className='col-span-1'>
                  {user && user.profileImageUrl && <Image src={user.profileImageUrl} alt="Profile Image" width={50} height={50} className="rounded-full" />}
                </div>
                <div className='col-span-11'>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-transparent text-xl px-3 border-b border-gray-600 outline-none"
                    placeholder="What is on your mind?"
                    rows={4}>

                  </textarea>
                  <div className="flex justify-between items-center mt-2 ">
                    <div className=" flex gap-8 text-xl">
                      <IoImageOutline onClick={handleSelectImage} />
                      <HiOutlineGif />
                      <BsEmojiSmile />
                      <GoTasklist />
                      <CiLocationOn />
                    </div>
                    <div>
                      <button
                        onClick={handleCreateTweet}
                        className="px-4 py-2 bg-blue-400 font-bold hover:bg-blue-500 rounded-full cursor-pointer transition-all">
                        Tweet
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
          {
            tweets?.map((tweet: any) => (
              tweet ? <FeedCard key={tweet.id} data={tweet as Tweet} /> : null
            ))
          }

</TwitterLayout>
    </div>
  );
}
