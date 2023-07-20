import { S3_URL } from "@/constants";
import { db } from "@/lib/db";
import type { NextPage } from "next";
import Image from "next/image";

interface CommunityPageProps {}

const CommunityPage: NextPage<CommunityPageProps> = async ({}) => {
  const avatars = await db.avatar.findMany({ take: 10 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-10">
      {avatars.map((avatar) => (
        <div key={avatar.id} className="relative w-40 h-40 mx-auto">
          <Image
            src={S3_URL + avatar.id}
            alt={`Avatar ${avatar.id}`}
            fill
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default CommunityPage;
