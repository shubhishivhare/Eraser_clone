import React, { useEffect } from "react";
import { ChevronDown, LogOut, Settings, Users } from "lucide-react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { query } from "@/convex/_generated/server";
import { api } from "@/convex/_generated/api";

function SideNavTopSection({user}:any) {
    const menu = [
        {
            id:1,
            name:'Create Team',
            path:'/team/create',
            icon:Users,
        },
        {
            id:2,
            name:'Settings',
            path:'',
            icon:Settings,
        }
    ]
    const convex= useConvex();

    useEffect(()=>{
        user && getTeamList();
    },[user])
    const getTeamList = async ()=>{
        const result= await convex.query(api.teams.getTeam,{email:user?.email})
        console.log(result)
    }
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-3 hover:bg-slate-200 p-3 rounded-lg cursor-pointer">
          <Image src={"/logo-1.png"} alt="logo" width={40} height={40} />
          <h2 className="flex gap-2 items-center font-bold text-[17px]">
            Team Name
            <ChevronDown />
          </h2>
        </div>
      </PopoverTrigger>
      <PopoverContent className="ml-7 p-4">
        {/* Team Section*/}
        <div>
            <h2>Team Name</h2>
        </div>

        <Separator className="mt-2"/>

        {/* Option Section*/}
        <div>
            {menu.map((item,index)=>(
                <h2 key={index} className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg text-sm">
                    <item.icon className="h-4 w-4"/>
                    {item.name}
                </h2>       
            ))}

            <LogoutLink>
            <h2 className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg text-sm">
                 <LogOut className="h-4 w-4"/>
                 Logout
            </h2>
            </LogoutLink>
        </div>
        <Separator className="mt-2"/>

        {/* User Info Section */}
        {user && <div className="mt-2 flex gap-2 items-center">
            <Image src={user?.picture} alt='user' width={30} height={30}
            className="rounded-full"/>
            <div>
                <h2 className="font-bold text-[14px]">{user?.given_name} {user?.family_name}</h2>
                <h2 className="text-[12px] text-gray-500">{user?.email}</h2>
            </div>

        </div>}

      </PopoverContent>
    </Popover>
  );
}

export default SideNavTopSection;
