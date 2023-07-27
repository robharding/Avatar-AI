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
    take: 15,
  });

  return (
    <section className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-semibold">Your Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-6">
        {avatars.map((avatar) => (
          <div key={avatar.id} className="relative w-full pt-[100%]">
            <Image
              src={S3_URL + avatar.id}
              alt={`Avatar ${avatar.id}`}
              fill
              className="object-cover w-full h-full inset-0 rounded-lg"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionPage;
