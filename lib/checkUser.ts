import { currentUser } from '@clerk/nextjs/server';
import { db } from './db';

export const checkUser = async () => {
  console.log('🔍 checkUser: Starting...')
  
  const user = await currentUser();
  if (!user) {
    console.log('❌ checkUser: No Clerk user found')
    return null;
  }
  
  console.log('✅ checkUser: Clerk user found:', user.id)

  try {
    console.log('🔍 checkUser: Looking for existing user in database...')
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });
    
    console.log('🔍 checkUser: Database search result:', loggedInUser)

    if (loggedInUser) {
      console.log('✅ checkUser: User exists in database')
      return loggedInUser;
    }

    console.log('➕ checkUser: Creating new user in database...')
    console.log('➕ checkUser: User data:', {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0]?.emailAddress,
    })

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0]?.emailAddress,
      },
    });
    
    console.log('✅ checkUser: New user created:', newUser)
    return newUser;
  } catch (error) {
    console.error('❌ checkUser: Database error:', error)
    if (error instanceof Error) {
      console.error('❌ checkUser: Error message:', error.message)
      console.error('❌ checkUser: Error stack:', error.stack)
    }
    throw error
  }
};
























// import { currentUser } from "@clerk/nextjs/server";
// import {db} from "./db";

// export const checkUser = async () => {
//     const user = await currentUser();
//     if (!user) {
//         return null;
//     }

//     const loggedInUser = await db.user.findUnique({
//         where: {
//             clerkUserId: user.id,   
//         },
// });
//     if (!loggedInUser) {

//     return loggedInUser;
// }

// const newUser = await db.user.create({
//     data: {
//         clerkUserId: user.id,
//         name : `${user.firstName} ${user.lastName}`,
//         imageUrl: user.imageUrl,
//         email: user.emailAddresses[0]?.emailAddress,
        
//     },
// });
// return newUser;
// }