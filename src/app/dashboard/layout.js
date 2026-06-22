import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen bg-[#0F172A] text-white">
            <div className="flex flex-1 overflow-hidded">
                {/* sidebar */}
                <DashboardSidebar />
                <div className="flex flex-1 flex-col overflow-y-auto">
                    {/* navbar */}
                    <div className="border border-red-400">
                        Navbar
                    </div>
                    <main className="p-5">{children}</main>
                </div>
            </div>
        </div>
    );
}
