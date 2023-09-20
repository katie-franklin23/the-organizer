import {
  AiOutlineCaretUp,
  AiOutlineCaretDown,
  AiFillSchedule,
  AiOutlineBars,
  AiOutlineLineChart,
  AiOutlineControl,
  AiOutlineTeam,
} from 'react-icons/ai'
import { useState } from 'react'

function SideBar() {
  const [open, setOpen] = useState(true)

  const toggleSidebar = () => {
    setOpen(!open)
  }

  const iconList = [
    { Icon: AiFillSchedule, text: 'Dashboard' },
    { Icon: AiOutlineBars, text: 'Categories' },
    { Icon: AiOutlineLineChart, text: 'Reports' },
    { Icon: AiOutlineControl, text: 'Settings' },
    { Icon: AiOutlineTeam, text: 'Contacts' },
  ]

  return (
    <aside
      className={`fixed z-10 top-0 h-screen ${
        open ? 'w-1/5 border-r' : 'w-16'
      } md:w-4/12 lg:w-1/4 xl:w-1/5 2xl:w-1/6 transition-all duration-300 ease-in-out bg-white`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className={`logo ${open ? 'w-32' : 'w-16'}`}>
          <img
            src="https://i.imgur.com/AigCHoh.png"
            alt="The Organizers logo"
          />
        </div>
        <div
          className="toggle-button cursor-pointer p-2 rounded-full shadow-md"
          onClick={toggleSidebar}
        >
          {open ? (
            <AiOutlineCaretUp className="icon text-dark-purple" />
          ) : (
            <AiOutlineCaretDown className="icon text-dark-purple" />
          )}
        </div>
      </div>
      {open && (
        <div className="text-center">
          <div className="mt-8">
            <img
              src="https://www.milkround.com/advice/wp-content/uploads/how-to-take-a-good-linkedin-photo.jpg"
              alt="user profileshot"
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
            <h5 className="mt-4 text-xl font-semibold text-gray-600 lg:block">
              Evan Smith
            </h5>
            <span className="text-gray-400 lg:block">Admin</span>
          </div>
          <ul className="mt-8 space-y-2 tracking-wide">
            {iconList.map((item, index) => (
              <li className="hover:bg-blue-500 transition" key={index}>
                <button className="px-4 py-3 flex items-center space-x-4 rounded-xl">
                  <span className="hover:text-white flex ml-1">
                    <item.Icon className="ml-2 h-6 w-6 mr-2" />
                    {item.text}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-between items-center border-t px-6 pt-4">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          ></svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default SideBar
