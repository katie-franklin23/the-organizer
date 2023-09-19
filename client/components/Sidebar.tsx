import { AiFillSchedule, AiOutlineDoubleRight } from 'react-icons/ai'
import { WiDayFog } from 'react-icons/wi'
import { useState } from 'react'

function Sidebar() {
  const iconList = [
    { Icon: AiFillSchedule, text: 'Todo' },
    { Icon: WiDayFog, text: 'Weather' },
  ]
  const [open, setOpen] = useState(true)

  return (
    <div className="flex">
      <div
        className={`${
          open ? 'w-72' : 'w-20'
        } h-screen p-5 pt-1 bg-slate-400 relative duration-300`}
      >
        <AiOutlineDoubleRight
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="client/images/logo.png"
            alt="img"
            className={`w-20 h-20 mt-4 ${!open ? 'w-12 h-12' : ''}`}
          ></img>
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 overflow-hidden ${
              !open ? 'scale-0 max-w-0' : 'max-w-md'
            }`}
          >
            Your Dashboard
          </h1>
        </div>
        <ul className="pt-6">
          {iconList.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-x-4 cursor-pointer hover:text-white hover:bg-slate-600 transition rounded-md"
            >
              <item.Icon />
              <span className={`overflow-hidden ${!open ? 'max-w-0' : ''}`}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        <h2>Home Page</h2>
      </div>
    </div>
  )
}

export default Sidebar
