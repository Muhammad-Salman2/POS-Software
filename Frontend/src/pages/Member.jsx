import React, { useContext, useState } from "react";
import MemberTable from "../components/MemberTable";
import { PlusCircle, Users } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import { UserContext } from "../context/UserContext";
import MemberForm from "../components/MemberForm";

export default function Member() {
  const { user } = useContext(UserContext);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleMemberAdded = () => {
    setRefreshKey(prev => prev + 1);
    setIsSheetOpen(false); 
  };

  return (
    <div className="min-h-screen bg-[#F4F9F9] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#2F4F4F] text-white">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2F4F4F]">Team Members</h1>
              <p className="text-[#2F4F4F]/80">Manage your store team members</p>
            </div>
          </div>

          {user?.role === "admin" && (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="inline-flex cursor-pointer items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#2F4F4F]/90 transition-colors">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  New Member
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md bg-[#F4F9F9]">
                <SheetHeader className="mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#2F4F4F] text-white">
                      <Users className="h-6 w-6" />
                    </div>
                    <SheetTitle className="text-xl font-bold text-[#2F4F4F]">
                      New Team Member
                    </SheetTitle>
                  </div>
                </SheetHeader>
                <MemberForm 
                  onMemberAdded={handleMemberAdded}
                  onClose={() => setIsSheetOpen(false)}
                />
              </SheetContent>
            </Sheet>
          )}
        </div>

        <div className="bg-white rounded-lg border border-[#2F4F4F]/20 shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#2F4F4F]">All Members</h2>
            </div>
            <MemberTable refreshKey={refreshKey} />
          </div>
        </div>
      </div>
    </div>
  );
}