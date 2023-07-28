import { S3_URL } from "@/constants";
import { db } from "@/lib/db";
import type { NextPage } from "next";
import Image from "next/image";

interface CommunityPageProps {}

const CommunityPage: NextPage<CommunityPageProps> = async ({}) => {
  const avatars = await db.avatar.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <section className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-semibold">Community Avatars</h1>
      <h2 className="text-xl">
        The community has generated{" "}
        <span className="text-accent font-semibold">{avatars.length}</span>{" "}
        avatars
      </h2>
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

export default CommunityPage;
