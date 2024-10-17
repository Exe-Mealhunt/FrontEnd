"use client";
import React, { useState } from "react";

import AccountSidebar from "@/components/sidebar/account_sidebar";
import TabContent from "@/components/sidebar/account_tab_content";

export default function Page() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="flex">
      <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <TabContent activeTab={activeTab} />
    </div>
  );
}
