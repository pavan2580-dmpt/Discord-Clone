import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
     <div className=" h-[100vh] w-full text-white">
     <h1>Dicord-clone</h1>

      <UserButton afterSignOutUrl="/"/>
      <Button>Click me</Button>
     </div>
    </>
  )
}
