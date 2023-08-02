import AvatarPreview from "@/components/collection/AvatarPreview";
import type { NextPage } from "next";

interface AvatarPageProps {
  params: {
    avatarId: string;
  };
}

const AvatarPage: NextPage<AvatarPageProps> = ({ params: { avatarId } }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <AvatarPreview avatarId={avatarId} link={false} />
    </div>
  );
};

export default AvatarPage;
