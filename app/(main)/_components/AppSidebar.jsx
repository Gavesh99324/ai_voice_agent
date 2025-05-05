'use client';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
  } from "@/components/ui/sidebar"

  import { motion } from 'framer-motion';
  import { IoIosMic } from "react-icons/io";
  import { TypeAnimation } from 'react-type-animation';
  import { Button } from "@/components/ui/button";
  import { Plus } from "lucide-react";
  import { SideBarOptions } from "@/services/Constants";
  import Link from "next/link";
  
  
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader className={'flex items-center mt-5'}>
        <div className='flex items-center gap-3 relative'>
          <motion.div
            className="absolute w-11 h-11 rounded-full border-2 border-green-300"
            animate={{ scale: [1, 1.5, 2], opacity: [1, 0.6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
          />

          <IoIosMic size={50} color="#A3EB1E" className="relative z-10" />

          <TypeAnimation
            sequence={['Voxicruit']}
            wrapper="span"
            speed={20}
            style={{ fontSize: '30px', fontWeight: 'bold', display: 'inline-block' }}
            repeat={0}
            cursor={false}
          />
          <span className="blinking-dot">.</span>
        </div>
        <Button className="bg-[#A3EB1E] text-black hover:bg-[#94d91b] w-full mt-5"> <Plus />Create New Interview</Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarContent>
              <SidebarMenu>
                {SideBarOptions.map((option, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <Link href={option.path}>
                        <option.icon />
                        <span>{option.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </SidebarGroup>

        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  };
