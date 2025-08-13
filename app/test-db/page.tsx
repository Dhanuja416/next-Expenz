import { db } from '@/lib/db'

export default async function TestDB() {
  try {
    // Simple database test
    const result = await db.$queryRaw`SELECT 1 as test`
    console.log('Database connection test:', result)
    
    return <div>Database connection: SUCCESS</div>
  } catch (error) {
    console.error('Database test failed:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return <div>Database connection: FAILED - {errorMessage}</div>
  }
}