import { useEffect, useState } from "react";
import { CreateETCard } from "./ET/createETCodeCard";
import { DeleteETCard } from "./ET/deleteETCodeCard";
import { Label } from "./ui/label";

const Elektriksel_Test = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setCurrentUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      <div className="flex justify-between mb-2">
        <Label className="text-left mx-5 my-5">ET</Label>
        <Label className="text-right capitalize mx-5 my-5">{currentUser && `Role: ${currentUser.role}`}</Label>
      </div>
      <div className="bg-muted min-h-svh grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10 place-items-center">
        <CreateETCard />
        <DeleteETCard />
      </div>
    </>
  );
};
export function ElektrikselTest() {
  return <Elektriksel_Test />;
}
