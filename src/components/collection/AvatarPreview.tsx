import { S3_URL } from "@/constants";
import Image from "next/image";
import { FC } from "react";

interface AvatarPreviewProps {
  avatarId: string;
}

const AvatarPreview: FC<AvatarPreviewProps> = ({ avatarId }) => {
  return (
    <div className="relative w-full pt-[100%]">
      <Image
        src={S3_URL + avatarId}
        alt={`Avatar ${avatarId}`}
        fill
        className="object-cover w-full h-full inset-0 rounded-lg shadow-md"
      />
    </div>
  );
};

export default AvatarPreview;
