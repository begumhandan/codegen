import { useEffect, useState } from "react";
import { CreateCmmCard } from "./CMMs/CreateCmmCard";
import { DeleteCmmCard } from "./CMMs/DeleteCmmCard";
import { Label } from "./ui/label";

const InputIconButtonDemo = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setCurrentUser(parsedUser);
    }
  }, []);

  return (
    <>
      <div className="flex justify-between mb-2">
        <Label className="text-left mx-5 my-5">CMM</Label>
        <Label className="text-right capitalize mx-5 my-5">
          {currentUser && `Role: ${currentUser.role}`}
        </Label>
      </div>
      <div className="bg-muted min-h-svh grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10 place-items-center">
        <CreateCmmCard />
        <DeleteCmmCard />
      </div>
    </>
  );
};

export function Cmm() {
  return <InputIconButtonDemo />;
}
