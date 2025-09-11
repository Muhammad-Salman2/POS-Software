import React, { useContext, useState } from "react";
import CategoryTable from "../components/CategoryTable";
import { PlusCircle, Tag } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import { UserContext } from "../context/UserContext";
import CategoryForm from "../components/CategoryForm";

export default function Category() {
  const { user } = useContext(UserContext);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCategoryAdded = () => {
    setRefreshKey(prev => prev + 1);
    setIsSheetOpen(false); 
  };

  return (
    <div className="min-h-screen bg-[#F4F9F9] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#2F4F4F] text-white">
              <Tag className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2F4F4F]">Categories</h1>
              <p className="text-[#2F4F4F]/80">Organize your products into categories</p>
            </div>
          </div>

          {user?.role === "admin" && (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="inline-flex items-center cursor-pointer px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#2F4F4F]/90 transition-colors">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  New Category
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md bg-[#F4F9F9]">
                <SheetHeader className="mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#2F4F4F] text-white">
                      <Tag className="h-6 w-6" />
                    </div>
                    <SheetTitle className="text-xl font-bold text-[#2F4F4F]">
                      New Category
                    </SheetTitle>
                  </div>
                </SheetHeader>
                <CategoryForm 
                  onCategoryAdded={handleCategoryAdded}
                  onClose={() => setIsSheetOpen(false)}
                />
              </SheetContent>
            </Sheet>
          )}
        </div>
          
            
            <CategoryTable refreshKey={refreshKey} />
      </div>
    </div>
  );
}