import TwitterLayout from '@/components/Layout/twitterLayout'
import { NextPage } from 'next'
import React from 'react'

const UserProfilePage: NextPage= () => {
  return (
    <div>
      <TwitterLayout>
            <div>
                Profile page
            </div>
        </TwitterLayout> 
    </div>
  )
}

export default UserProfilePage
