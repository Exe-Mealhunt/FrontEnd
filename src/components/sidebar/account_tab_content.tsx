import React from "react";

interface TabContentProps {
  activeTab: string;
}

export default function TabContent({ activeTab }: TabContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <div>Profile Content</div>;
      case "E-Commerce":
        return <div>E-Commerce Content</div>;
      case "Inbox":
        return <div>Inbox Content</div>;
      default:
        return <div>Profile Content</div>;
    }
  };

  return <div className="p-4 w-full">{renderContent()}</div>;
}
