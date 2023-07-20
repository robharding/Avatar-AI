import { db } from "@/lib/db";
import type { NextPage } from "next";

interface CollectionPageProps {}

const CollectionPage: NextPage<CollectionPageProps> = async ({}) => {
  const avatars = await db.avatar.findMany({ take: 10 });

  return (
    <div>
      {avatars.map((avatar) => (
        <div key={avatar.id}>{avatar.id}</div>
      ))}
    </div>
  );
};

export default CollectionPage;
