import React from 'react'
import candidateImage from '../../assets/candidate.jpg'
import recuteImage from '../../assets/recute.png'
import { ArrowBigRight } from 'lucide-react'
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <div className='w-full h-full px-20 max-sm:px-6 py-[100px] bg-white'>
      <div className='flex gap-10 max-sm:gap-4 max-sm:flex-col justify-center items-center'>
        <div className='w-[648px] max-sm:w-full h-[290px] bg-black/40 rounded-2xl p-[50px] '
          style={{ backgroundImage: `url(${recuteImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundBlendMode: 'darken' }}
        >
          <h1 className='text-4xl max-sm:text-2xl font-bold text-white mb-6'>Become a Candidate</h1>
          <p className='text-white mb-6'>Join JobPilot today and take the first step towards your dream career. Sign up now to explore thousands of job opportunities tailored just for you!</p>

          <button className='bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-500 flex items-center  gap-1 hover:gap-4 cursor-pointer'>
            
             Register now
              <ArrowRight className="w-5 h-5"/> 
          
          </button>
        </div>
        
        <div className='w-[648px] max-sm:w-full h-[290px] bg-black/40 rounded-2xl p-[50px] '
          style={{ backgroundImage: `url(${candidateImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundBlendMode: 'darken' }}
        >
          <h1 className='text-4xl max-sm:text-2xl font-bold text-white mb-6'>Become a Candidate</h1>
          <p className='text-white mb-6'>Join JobPilot today and take the first step towards your dream career. Sign up now to explore thousands of job opportunities tailored just for you!</p>

          <button className='bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-500 flex items-center  gap-1 hover:gap-4 cursor-pointer'>
            
             Register now
              <ArrowRight className="w-5 h-5"/> 
          
          </button>
        </div>
       

      </div>
    </div>
  )
}

export default CTA