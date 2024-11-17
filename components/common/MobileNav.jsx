import { AlignJustify } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import Nav from "./Nav";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import Socials from "./Socials";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <AlignJustify className="hover:text-orangeColor hover:dark:text-darkBlueColor transition-all cursor-pointer " />
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col items-center justify-between h-full overflow-auto dark:bg-[#242d3a]">
            <div className="flex flex-col items-center gap-y-20">
              <Link href={"/"} onClick={handleClose}>
                <Image
                  src={"/logo.svg"}
                  alt="Лого"
                  width={40}
                  height={40}
                  className="w-[60px]"
                />
              </Link>

              <Nav
                containerStyles={"flex flex-col items-center gap-y-6"}
                linkStyles={
                  "text-lg hover:text-orangeColor hover:dark:text-darkBlueColor transition-all"
                }
                onLinkClick={handleClose}
              />
            </div>

            <Socials
              containerStyles={"flex items-center gap-x-4 pt-20"}
              iconStyles={
                "text-2xl hover:text-orangeColor hover:dark:text-darkBlueColor transition-all cursor-pointer"
              }
              onLinkClick={handleClose}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
