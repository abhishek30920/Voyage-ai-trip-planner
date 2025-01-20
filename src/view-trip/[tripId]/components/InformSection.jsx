import { Button } from '@/components/ui/button'
import { Share } from 'lucide-react'


function InformSection({trip}) {
 
  return (
    <div  >
      <img src='/c.jpg' className='h-[340px] w-full object-cover'/>
      <div className=' flex justify-between items-center'>
      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip?.userSelectedData?.location?.label}</h2>
        <div className='flex  gap-4'>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip?.userSelectedData?.noofDays} day</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💸{trip?.userSelectedData?.budget} budget</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🎉 No. of traveler {trip?.userSelectedData?.traveler}</h2>
          </div>
      
        </div>
        
      </div>
    
    </div>
  )
}

export default InformSection
