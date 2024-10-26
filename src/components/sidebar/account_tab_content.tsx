import React from "react";

import UserProfile from "../profile/user_profile";

type TabContentProps = {
  activeTab: string;
};

export default function TabContent({ activeTab }: TabContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <UserProfile />;
      case "My shopping list":
        return (
          <div className="w-full bg-white text-black">My shopping list</div>
        );
      case "Inbox":
        return <div>Inbox Content</div>;
      default:
        return <div>Profile Content</div>;
    }
  };

  return <>{renderContent()}</>;
}
