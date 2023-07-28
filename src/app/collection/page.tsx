import AvatarCollection from "@/components/AvatarCollection";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import type { NextPage } from "next";
import { redirect } from "next/navigation";

interface CollectionPageProps {}

const CollectionPage: NextPage<CollectionPageProps> = async ({}) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const avatars = await db.avatar.findMany({
    where: { userId: session.user.id },
  });

  return (
    <section className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-semibold">Your Collection</h1>
      <h2 className="text-xl">You&apos;ve generated {avatars.length} Icons</h2>
      <AvatarCollection avatars={avatars} />
    </section>
  );
};

export default CollectionPage;
