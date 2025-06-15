import { Button } from '@/components/ui/button'
import React from 'react'

function page() {
  return (
    <div className='text-center'>
    <h1 className="text-3xl font-bold mb-4">Upgrade to Pro</h1>
    <p className="mb-6 text-lg">
      Unlock premium features and take your experience to the next level.
    </p>
    <Button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
      Upgrade Now
    </Button>
    </div>
  )
}

export default page
