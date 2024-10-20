import React from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AccountSidebar({
  activeTab,
  setActiveTab,
}: SidebarProps) {
  const MENU_ITEMS = [
    {
      title: "Profile",
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      title: "E-Commerce",
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      title: "Inbox",
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
            clipRule="evenodd"
          />
        </svg>
      ),
      notificationCount: 14,
    },
  ];

  return (
    <div className="relative flex h-screen w-full max-w-[20rem] flex-col bg-white p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
      <div className="p-4 mb-2">
        <h5 className="block text-xl font-semibold text-blue-gray-900">
          Account Managerment
        </h5>
      </div>
      <nav className="flex flex-col gap-1 p-2 text-base font-normal text-blue-gray-700">
        {MENU_ITEMS.map((item, index) => (
          <div
            key={index}
            role="button"
            onClick={() => setActiveTab(item.title)}
            className={`flex items-center p-3 transition-all rounded-lg hover:bg-blue-gray-50 hover:text-blue-gray-900 cursor-pointer ${
              activeTab === item.title ? "bg-secondary text-white" : ""
            }`}
          >
            <div
              className={`grid mr-4 text-${activeTab === item.title ? "white" : "black"} place-items-center ${activeTab === item.title ? "" : ""}`}
            >
              {item.icon()}
            </div>
            <span>{item.title}</span>
            {item.notificationCount && (
              <div className="ml-auto bg-blue-gray-500/20 text-blue-gray-900 rounded-full px-2 py-1 text-xs font-bold">
                {item.notificationCount}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
