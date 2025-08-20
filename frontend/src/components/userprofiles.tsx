import { User, Settings, Bell, LogOut, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogOut } from "@/components/hooks/useLogOut";
import { Label } from "@/components/ui/label";
import { GoPrevButton } from "@/components/prevbutton";

const listItems = [
  {
    icon: LogOut,
    property: "Sign Out",
  },
];

const DropdownMenuUserMenuDemo = () => {
  const logout = useLogOut();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setCurrentUser(parsedUser);
    }
  }, []);

  return (
    <div className="w-full grid grid-cols-11 gap-4">
      <div className="col-span-9">
        <GoPrevButton />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="p-[2px] flex justify-end-safe size-15 overflow-hidden rounded-full"
          >
            <img src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png" alt="Hallie Richards" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-100 p-2">
          <DropdownMenuLabel>
            <div className="flex flex-cols-2 gap-2">
              <Label className="font-normal text-gray-500 text-right capitalize mx-5 my-5">
                {currentUser && `Role: ${currentUser.role}`}
              </Label>
              <Label className="font-normal text-gray-500 text-right mx-5 my-5">
                {currentUser && ` ${currentUser.email}`}
              </Label>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuGroup
            className="
          w-full h-15"
          >
            {listItems.map((item, index) => (
              <DropdownMenuItem
                className="w-full bg-gray-100 text-popover-foreground p-5 rounded-2xl"
                key={index}
                onClick={() => {
                  const isConfirmed = confirm("çıkış mı yapmak istiyorsunuz?");
                  if (isConfirmed) {
                    const success = logout();
                    alert(success ? "çıkış başarılı" : "çıkış başarısız");
                  }
                }} //çıkış yapma
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.property}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenuUserMenuDemo;
