

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import {Bars, Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";
import { BiComment, BiHistory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaUserSecret } from "react-icons/fa";
import { GrAnalytics, GrTransaction } from "react-icons/gr";
import { RiUser2Fill } from "react-icons/ri";

export default async function DashboardSidebar() {
    const session = await auth.api.getSession({
        headers: await headers(), 
    });
    const user = session?.user;
    const role = user?.role || "user";
    const dashboardItems = {
        lawyer: [
            {icon: House, label: "Home", link: "/dashboard/lawyer"},
            {icon: BiHistory, label: "Hiring History", link: "/dashboard/lawyer/hiring-history"},
            {icon: CgProfile, label: "Manage Profile", link: "/dashboard/lawyer/manage-legal-profile"},
        ],
        user: [
            {icon: House, label: "Home", link: "/dashboard/user"},
            {icon: BiHistory, label: "Hiring History", link: "/dashboard/user/hiring-history"},
            {icon: CgProfile, label: "Update Profile", link: "/dashboard/user/update-profile"},
            {icon: BiComment, label: "Comments", link: "/dashboard/user/comments"},
        ],
        admin: [
            {icon: House, label: "Home", link: "/dashboard/admin"},
            {icon: RiUser2Fill, label: "Manage Users", link: "/dashboard/admin/manage-users"},
            {icon: FaUserSecret, label: "Manage Lawyers", link: "/dashboard/admin/manage-lawyers"},
            {icon: GrTransaction, label: "All Transactions", link: "/dashboard/admin/all-transactions"},
            {icon: GrAnalytics, label: "Analytics", link: "/dashboard/admin/analytics"},
        ],

    };
//   const navItems= [
//     {icon: House, label: "Home"},
//     {icon: Magnifier, label: "Search"},
//     {icon: Bell, label: "Notifications"},
//     {icon: Envelope, label: "Messages"},
//     {icon: Person, label: "Profile"},
//     {icon: Gear, label: "Settings"},
//   ];

    const navItems = dashboardItems[role];
    console.log("Navigation Items:", navItems);

  return (
    <Drawer>
      <Button variant="secondary" className="md:hidden sm:block">
        <Bars />
        Menu
      </Button>
      <nav className="flex flex-col gap-1 w-52 border-r pt-5 md:block hidden">
                {navItems.map((item) => (
                  <Link
                    href={item.link}
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm w-full text-white transition-colors hover:bg-default hover:text-black"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                ))}
              </nav>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}