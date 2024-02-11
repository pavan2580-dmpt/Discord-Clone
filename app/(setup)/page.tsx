import createPrismaClient from "@/lib/initialProfile";
import { redirect } from "next/navigation";

interface UserProfile {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
}

async function page() {
  const {db} = await createPrismaClient();
  await db.connect();

  try {
   const profile = await createPrismaClient();
   
    // finding the user based on the id 
    const server = await db.collection("server").findOne({
      profileId: profile.userId,
    })
    if(server){
      return redirect(`/servers/${server.id}`)
    }
    return (
      <div>
        <h1>create server</h1>

      </div>
    );
  } finally {
    await db.disconnect();
  }
}

export default page;
