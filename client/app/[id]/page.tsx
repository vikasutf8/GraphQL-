

import TwitterLayout from '@/components/Layout/twitterLayout'
import { useCurrentUser } from '@/hooks/user';
import { GetServerSideProps, NextPage } from 'next'
import React, { useCallback, useMemo } from 'react'
import { BsArrowLeft } from "react-icons/bs";
import Image from 'next/image';
import FeedCard from '@/components/FeedCard';
import { Tweet, User } from '@/gql/graphql';
import { useRouter } from 'next/router';
import graphQLClient from '@/clients/api';
import { getUserByIdQuery } from '@/graphql/query/user';
import { followUserMutation } from '@/graphql/mutation/user';
import { useQueryClient } from '@tanstack/react-query';


// interface ServerSideProps {
//   user?: User
// }

const UserProfilePage: NextPage<{ params: { id: string } }> = async ({ params }) => {
  const data = useCurrentUser();
  const queryClient = useQueryClient();
  const currentUser =data?.user;
  console.log(currentUser); 
  const id = params.id as string;
  const userInfo = await graphQLClient.request(getUserByIdQuery, { id });
  // nagivate 404
  if (!userInfo?.getUserById) {
    return <div>404 Not Found</div>;
  }

  const user = userInfo.getUserById;



  // const amIFollowing = useMemo(() => {
  //   if (!currentUser || !user) {
  //     return false;
  //   }
  //   // return currentUser.following.some(follower => follower.id === user.id);

  //   return (
  //     user.followers?.findIndex((follower) => follower.id === currentUser.id) ?? -1) 
  //   )
  // }, [currentUser, user]);


  const handleFollowUser = useCallback( async() => {
    if (!currentUser || !user) {
      return;
    }
    const data = await graphQLClient.request(followUserMutation, { to: user?.id });
    queryClient.invalidateQueries(["current-user"]);
  }, [currentUser, user,queryClient ]);


  const handleUnfollowUser = useCallback( async() => {
    if (!currentUser || !user) {
      return;
    }
    const data = await graphQLClient.request(unfollowUserMutation, { to: user?.id });
    queryClient.invalidateQueries(["current-user"]);
  }, [currentUser, user,queryClient ]);

  return (
    <div>
      <TwitterLayout>
        <div className=''>
          <nav className='flex items-center gap-6  px-2 py-3'>
            <BsArrowLeft className='text-2xl' />
            <div>
              {user && <h3 className='text-white text-2xl font-bold'>{user.firstName}</h3>}
              <h3 className='text-lg text-slate-500 font-medium'>{user?.tweets?.length} tweets  </h3>
              
            </div>
          </nav>
          <div className=' border-b border-slate-800 p-4'>
            {
              user?.profileImageUrl && <Image src={user?.profileImageUrl} width={100} height={100} alt="Profile Image" className="rounded-full " />
            }
            <h3 className='text-white text-2xl font-bold mt-4' >{user?.firstName} {user?.lastName}</h3>
          <div className=' flex justify-between items-center'>
          <div className='flex gap-4 mt-2'>
            <h5 className='text-md text-slate-500 font-medium'>{user?.followers?.length} followers</h5>
            <h5 className='text-md text-slate-500 font-medium'>{user?.following?.length} following</h5>
           </div> 
           {
            currentUser?.id !== user?.id && (
              <>
              {
                currentUser?.followers?.some(follower => follower.id === user?.id) ? (
                  <button
                  onClick={handleUnfollowUser}
                  className='bg-blue-500 text-white px-4 py-2 rounded-lg text-md font-medium'>
                  Unfollow
                 </button>
                ) : (
                  <button
                  onClick={handleFollowUser}
                   className='bg-blue-500 text-white px-4 py-2 rounded-lg text-md font-medium'>
                  Follow
                 </button>
                )
              }
              </> 
            )
           } 
          </div>
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

// SSR
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const id = context.query.id as string | undefined;
//   if (!id) {
//     return { notFound: true }
//   }
//   const userInfo = await graphQLClient.request(getUserByIdQuery, { id });

//   if (!userInfo) {
//     return { notFound: true }
//   }
//   return { props: { user: userInfo.getUserById as User } }
// }


export default UserProfilePage
