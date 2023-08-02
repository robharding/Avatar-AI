import { S3_URL } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface AvatarPreviewProps {
  avatarId: string;
  link?: boolean;
}

const AvatarPreview: FC<AvatarPreviewProps> = ({ avatarId, link = true }) => {
  return (
    <>
      {link ? (
        <div className="relative w-full pt-[100%]">
          <Link href={`/avatar/${avatarId}`}>
            <Image
              src={S3_URL + avatarId}
              alt={`Avatar ${avatarId}`}
              fill
              className="object-cover w-full h-full inset-0 rounded-lg shadow-md"
            />
          </Link>
        </div>
      ) : (
        <div className="relative w-full pt-[100%]">
          <Image
            src={S3_URL + avatarId}
            alt={`Avatar ${avatarId}`}
            fill
            className="object-cover w-full h-full inset-0 rounded-lg shadow-md"
          />
        </div>
      )}
    </>
  );
};

export default AvatarPreview;
