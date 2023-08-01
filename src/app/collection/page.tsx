import AvatarCollection from "@/components/collection/AvatarCollection";
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
    orderBy: {
      id: "desc",
    },
  });

  return (
    <section className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-semibold">Your Collection</h1>
      <h2 className="text-xl">
        You&apos;ve generated{" "}
        <span className="text-accent font-semibold">{avatars.length}</span>{" "}
        avatars
      </h2>
      <AvatarCollection avatars={avatars} user={session.user} />
    </section>
  );
};

export default CollectionPage;
