/* eslint-disable react/no-unescaped-entities */
import { type ReactElement } from 'react'
import logo from '../../../public/greenfield.svg'

export default function Footer (): ReactElement {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <div className="col-span-1 md:col-span-6">
            <img src={logo} alt="Greenfield Times" className="h-8 mb-4 mx-auto md:mx-0" />
          </div>
          <div>
            <h3 className="text-[#333] text-[13px] font-bold leading-[15px]">News</h3>
            <ul className="mt-4 space-y-2">
              {[...Array(12)].map((_, index) => (
                <li key={index} className="text-black text-[14px] font-medium leading-[16px] hover:underline transition-all cursor-pointer">Home Page</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#333] text-[13px] font-bold leading-[15px]">Arts</h3>
            <ul className="mt-4 space-y-2">
              {[...Array(12)].map((_, index) => (
                <li key={index} className="text-black text-[14px] font-medium leading-[16px] hover:underline transition-all cursor-pointer">Best Sellers Book List</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#333] text-[13px] font-bold leading-[15px]">Lifestyle</h3>
            <ul className="mt-4 space-y-2">
              {[...Array(12)].map((_, index) => (
                <li key={index} className="text-black text-[14px] font-medium leading-[16px] hover:underline transition-all cursor-pointer">Restaurant Reviews</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#333] text-[13px] font-bold leading-[15px]">Opinion</h3>
            <ul className="mt-4 space-y-2">
              {[...Array(12)].map((_, index) => (
                <li key={index} className="text-black text-[14px] font-medium leading-[16px] hover:underline transition-all cursor-pointer">Today's Opinion</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#333] text-[13px] font-bold leading-[15px]">More</h3>
            <ul className="mt-4 space-y-2">
              {[...Array(12)].map((_, index) => (
                <li key={index} className="text-black text-[14px] font-medium leading-[16px] hover:underline transition-all cursor-pointer">The Learning Network</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#333] text-[13px] font-bold leading-[15px]">News</h3>
            <ul className="mt-4 space-y-2">
              {[...Array(12)].map((_, index) => (
                <li key={index} className="text-black text-[14px] font-medium leading-[16px] hover:underline transition-all cursor-pointer">Gift Subscriptions</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 justify-center">
          <div className="mt-2 text-center text-gray-400 text-sm flex flex-col">
           <div className='text-center text-gray-400 text-sm flex flex-row justify-between'>
           <p className='text-[10px] text-[#666] hover:underline transition-all cursor-pointer'>© 2024 The GreenField Company</p>
            <p className='text-[10px] text-[#666] hover:underline transition-all cursor-pointer'>NyTCo</p>
            <p className='text-[10px] text-[#666] hover:underline transition-all cursor-pointer'>Contact Us</p>
            <p className='text-[10px] text-[#666] hover:underline transition-all cursor-pointer'>Accessibility</p>
            <p className='text-[10px] text-[#666] hover:underline transition-all cursor-pointer'>Work with us</p>
            <p className='text-[10px] text-[#666] hover:underline transition-all cursor-pointer'>Advertise</p>
            <p className='text-[10px] text-[#666] hover:underline transition-all cursor-pointer'>T Brand Studio</p>
            <p className='text-[10px] text-[#666] hover:underline transition-all cursor-pointer'>Your Ad Choices</p>
            <p className='text-[10px] text-[#666] hover:underline transition-all cursor-pointer'>Privacy Policy</p>
            <p className='text-[10px] text-[#666] hover:underline transition-all cursor-pointer'>Terms of Service</p>
            <p className='text-[10px] text-[#666] hover:underline transition-all cursor-pointer'>Terms of Sale</p>
            <p className='text-[10px] text-[#666] hover:underline transition-all cursor-pointer'>Site Map</p>
            <p className='text-[10px] text-[#666] hover:underline transition-all cursor-pointer'>Help</p>
            <p className='text-[10px] text-[#666] hover:underline transition-all cursor-pointer'>Subscriptions</p>
           </div>
            <p className='mt-4 text-[10px] text-[#666] hover:underline transition-all cursor-pointer'>Please do not leak our hard work. Engineering at Umbriel appreciates it.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
