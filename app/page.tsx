import { checkUser } from '@/lib/checkUser'
import { currentUser } from '@clerk/nextjs/server'

export default async function Page() {
  console.log('=== PAGE STARTED ===')
  
  try {
    // First check if Clerk user exists
    const clerkUser = await currentUser()
    console.log('Clerk user:', clerkUser ? 'Found' : 'Not found')
    console.log('Clerk user ID:', clerkUser?.id)
    console.log('Clerk user email:', clerkUser?.emailAddresses[0]?.emailAddress)
    
    // Then try checkUser
    console.log('About to call checkUser...')
    const dbUser = await checkUser()
    console.log('Database user result:', dbUser)
    
  } catch (error) {
    console.error('Detailed error:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
  }

  return (
    <div className="text-red-400">
      <h1>Welcome to the Home Page</h1>
      <p>This is a simple page component.</p>
    </div>
  )
}


























// import { checkUser } from '@/lib/checkUser'

// export default async function Page() {

//   console.log('Page loading, about to check user...')
  
//   try {
//     const user = await checkUser()
//     console.log('User check result:', user)
//   } catch (error) {
//     console.error('Error in checkUser:', error)
//   }

//   return (
//     <div className="text-red-400">
//       <h1>Welcome to the Home Page</h1>
//       <p>This is a simple page component.</p>
//     </div>
//   );
// } 