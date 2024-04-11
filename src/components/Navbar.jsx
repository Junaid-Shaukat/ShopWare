import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
const NavButton = ({
  title, customfunc, icon, color, dotcolor
}) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button type='button' onClick={customfunc}
      style={{ color }}
      className='relative text-xl rounded-full p-3 hover:bg-light-gray'
    >
      <span style={{ background: dotcolor }} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'></span>
        {icon}
      
    </button>
  </TooltipComponent>
)
const Navbar = () => {
  const { activeMenu, setActiveMenu, isClicked, setisClicked, handleClick, ScreenSize, setScreenSize } = useStateContext();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return ()=>window.removeEventListener('resize',handleResize);
  }, [])
  useEffect(() => {
   if(ScreenSize<=900)
   {
    setActiveMenu(false);
   }
   else {
    setActiveMenu(true);
   }
  }, [ScreenSize])
  
  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton title="Menu" customfunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color="blue" icon={<AiOutlineMenu />} />
      <div className='flex'>
        <NavButton title="Cart"
          color="blue"
          customfunc={() => handleClick('Cart')}
          icon={<FiShoppingCart />} />
        <NavButton title="Chat"
          dotcolor="#03C9D7"
          customfunc={() => handleClick('Chat')}
          color="blue"
          icon={<BsChatLeft />} />
        <NavButton title="Notification"
          customfunc={() => handleClick('notification')}
          color="blue"
          dotcolor="#03C9D7"
          icon={<RiNotification3Line />} />
        <TooltipComponent
          content="Profile"
          position='BottomCenter'>
          <div className='flex items-center gap-2 cursor-pointer
            p-1 hover:bg-light-gray rounded-lg'
          >
            <img className='rounded-full w-8 h-8' src={avatar} />
            <p><span className='text-gray-400 text-14'>Hi, </span>{' '}
              <span className='text-gray-400 font-bold ml-1 text-14' >Michael</span>
            </p>
            <MdKeyboardArrowDown className='text-gray-400 text-14' />
          </div>
        </TooltipComponent>
        {isClicked.Cart && <Cart />}
        {isClicked.Chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.UserProfile && <UserProfile />}
      </div>
    </div>
  )
}

export default Navbar