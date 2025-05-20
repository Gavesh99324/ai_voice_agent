import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "./(main)/_components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import WelcomeContainer from "./(main)/dashboard/_components/WelcomeContainer";

export default function Home({ children }) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div className={"w-full"}>
          {/*<SidebarTrigger /> */}
          <WelcomeContainer />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
