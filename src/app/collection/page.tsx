import { S3_URL } from "@/constants";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import type { NextPage } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

interface CollectionPageProps {}

const CollectionPage: NextPage<CollectionPageProps> = async ({}) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const avatars = await db.avatar.findMany({
    where: { userId: session.user.id },
    take: 10,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-10">
      {avatars.map((avatar) => (
        <div key={avatar.id} className="relative w-full pt-[100%]">
          <Image
            src={S3_URL + avatar.id}
            alt={`Avatar ${avatar.id}`}
            fill
            className="object-cover w-full h-full inset-0"
          />
        </div>
      ))}
    </div>
  );
};

export default CollectionPage;
