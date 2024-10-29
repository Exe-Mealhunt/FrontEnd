import React from "react";

import UserProfile from "../profile/user_profile";
import ShoppingList from "../shopping_list";

type TabContentProps = {
  activeTab: string;
};

export default function TabContent({ activeTab }: TabContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <UserProfile />;
      case "My shopping list":
        return <ShoppingList />;

      default:
        return <div>Profile Content</div>;
    }
  };

  return <>{renderContent()}</>;
}
