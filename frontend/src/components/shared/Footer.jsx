import { ArrowRight, BaggageClaim, BriefcaseBusiness, MoveRight } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
   <div className='px-20 max-sm:px-10 py-[100px] bg-gray-950'>
         <div className='w-full h-full  flex max-sm:flex-col gap-10'>
            <div className='w-[30%]  max-sm:w-full space-y-6'>
                <div className='text-start '>
                    <h1 className='flex items-center gap-3 text-2xl max-sm:text-4xl text-white'> <BriefcaseBusiness className="h-8 w-8 max-sm:w-10 max-sm:h-10 text-white" /> JobPilot</h1>
                </div>
                <div className='space-y-2'>
                    <h3 className='text-lg max-sm:text-xl text-white/70'>Call now: <span className='text-white font-bold'>+92 3003636186</span></h3>
                    <h3 className='text-md max-sm:text-xl text-white/70'>6391 Elgin St. Celina, Delaware 10299, New York, United States of America</h3>
                </div>
            </div>
            <div className='w-[70%] max-sm:w-full flex max-sm:flex-col justify-between px-10 max-sm:px-0 max-sm:gap-10 '>
                <div className='space-y-4 text-start'>
                    <h2 className='text-xl text-white/90 font-bold'>Quick Link</h2>
                    <div className='space-y-2 '>
                        <p className='flex gap-2 group hover:text-white cursor-pointer transition-all duration-700'> <MoveRight className='w-5 text-white/80 group-hover:text-white hidden group-hover:block  ' /> <span className='text-white/80 group-hover:text-white'>About</span></p>

                        <p className='flex gap-2 group hover:text-white cursor-pointer transition-all duration-700'> <MoveRight className='w-5 text-white/80 group-hover:text-white hidden group-hover:block' /> <span className='text-white/80 group-hover:text-white'>Contact</span></p>

                        <p className='flex gap-2 group hover:text-white cursor-pointer transition-all duration-500'> <MoveRight className='w-5 text-white/80 group-hover:text-white hidden group-hover:block' /> <span className='text-white/80 group-hover:text-white'>Pricing</span></p>

                        <p className='flex gap-2 group hover:text-white cursor-pointer transition-all duration-500'> <MoveRight className='w-5 text-white/80 group-hover:text-white hidden group-hover:block' /> <span className='text-white/80 group-hover:text-white'>Blog</span></p>

                        
                    </div>
                </div>
            
                <div className='space-y-4'>
                    <h2 className='text-xl text-white/90 font-bold'>Candidate</h2>
                    <div className='space-y-2'>
                        <p className='flex gap-2 group hover:text-white cursor-pointer transition-all duration-700'> <MoveRight className='w-5 text-white/80 group-hover:text-white hidden group-hover:block' /> <span className='text-white/80 group-hover:text-white'>Browse Jobs</span></p>

                        <p className='flex gap-2 group hover:text-white cursor-pointer transition-all duration-700'> <MoveRight className='w-5 text-white/80 group-hover:text-white hidden group-hover:block' /> <span className='text-white/80 group-hover:text-white'>Browse Employers</span></p>

                        <p className='flex gap-2 group hover:text-white cursor-pointer transition-all duration-500'> <MoveRight className='w-5 text-white/80 group-hover:text-white hidden group-hover:block' /> <span className='text-white/80 group-hover:text-white'>Candidate Dashboard</span></p>

                        <p className='flex gap-2 group hover:text-white cursor-pointer transition-all duration-500'> <MoveRight className='w-5 text-white/80 group-hover:text-white hidden group-hover:block' /> <span className='text-white/80 group-hover:text-white'>Saved Jobs</span></p>

                        
                    </div>
                </div>

                <div className='space-y-4'>
                    <h2 className='text-xl text-white/90 font-bold'>Employers</h2>
                    <div className='space-y-2'>
                        <p className='flex gap-2 group hover:text-white cursor-pointer transition-all duration-700'> <MoveRight className='w-5 text-white/80 group-hover:text-white hidden group-hover:block' /> <span className='text-white/80 group-hover:text-white'>Post a Job</span></p>

                        <p className='flex gap-2 group hover:text-white cursor-pointer transition-all duration-700'> <MoveRight className='w-5 text-white/80 group-hover:text-white hidden group-hover:block' /> <span className='text-white/80 group-hover:text-white'>Browse Candidates</span></p>

                        <p className='flex gap-2 group hover:text-white cursor-pointer transition-all duration-500'> <MoveRight className='w-5 text-white/80 group-hover:text-white hidden group-hover:block' /> <span className='text-white/80 group-hover:text-white'>Employers Dashboard</span></p>

                        <p className='flex gap-2 group hover:text-white cursor-pointer transition-all duration-500'> <MoveRight className='w-5 text-white/80 group-hover:text-white hidden group-hover:block' /> <span className='text-white/80 group-hover:text-white'>Applications</span></p>

                        
                    </div>
                </div>

                <div className='space-y-4'>
                    <h2 className='text-xl text-white/90 font-bold'>Support</h2>
                    <div className='space-y-2'>
                        <p className='flex gap-2 group hover:text-white cursor-pointer transition-all duration-700'> <MoveRight className='w-5 text-white/80 group-hover:text-white hidden group-hover:block' /> <span className='text-white/80 group-hover:text-white'>Faqs</span></p>

                        <p className='flex gap-2 group hover:text-white cursor-pointer transition-all duration-700'> <MoveRight className='w-5 text-white/80 group-hover:text-white hidden group-hover:block' /> <span className='text-white/80 group-hover:text-white'>Privacy Policy</span></p>

                        <p className='flex gap-2 group hover:text-white cursor-pointer transition-all duration-500'> <MoveRight className='w-5 text-white/80 group-hover:text-white hidden group-hover:block' /> <span className='text-white/80 group-hover:text-white'>Terms & Conditions</span></p>



                        
                    </div>
                </div>

            </div>
        </div>
   </div>
    )
}

export default Footer


