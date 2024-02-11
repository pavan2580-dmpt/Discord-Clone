import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/themeToggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
     <div className=" h-[100vh] w-full text-white">
     <h1>Dicord-clone</h1>

      <UserButton afterSignOutUrl="/"/>
      <ModeToggle/>
     </div>
    </>
  )
}
