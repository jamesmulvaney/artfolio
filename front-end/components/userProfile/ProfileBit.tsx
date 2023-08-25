import Image from "next/image";
import React from "react";
import Link from "next/link";
import CreatePostModal from "../posts/CreatePostModal";
import EditProfileModal from "./EditProfileModal";
import ToggleFollowButton from "../general/ToggleFollowButton";
import { useGetRelationInfoQuery } from "@/codegen/graphql";
import ProfileBitSkeleton from "./loading/ProfileBitSkeleton";

type ProfileBitProps = {
  avatar: string;
  banner: string;
  bio: string;
  displayName: string;
  username: string;
  followerCount: number;
  followingCount: number;
  id: number;
};

function ProfileBit({
  avatar,
  banner,
  bio,
  displayName,
  followerCount,
  followingCount,
  username,
  id,
}: ProfileBitProps) {
  const { data, loading } = useGetRelationInfoQuery({ variables: { id } });

  if (loading || (!loading && !data)) return <ProfileBitSkeleton />;

  const { isFollowing, isProfileOwner } = data?.getRelationInfo!;

  return (
    <>
      <div className="relative w-full rounded bg-zinc-50 dark:bg-zinc-700 shadow-sm p-1 mt-5 sm:mt-0 z-0">
        <div className="w-full h-40 sm:h-60">
          <Image
            src={banner}
            alt={`${username}'s Banner`}
            height={300}
            width={1600}
            priority
            className="object-cover w-full h-full bg-black"
          />
        </div>
        <div className="flex flex-col items-center -mt-16 mb-12 px-2 sm:px-0 sm:flex-row sm:items-start">
          {/* Avatar */}
          <Image
            src={avatar}
            alt={`${username}'s Avatar`}
            height={128}
            width={128}
            className="w-32 h-32 rounded-full bg-black border-4 border-zinc-50 dark:border-zinc-700 sm:ml-8"
          />
          <div className="mt-2 max-w-xl text-center sm:text-start sm:ml-4 sm:mt-4">
            <h1 className="font-semibold text-xl sm:text-white sm:text-shadow-sm sm:shadow-black">
              {displayName}
            </h1>
            <p className="font-light italic text-sm sm:text-white sm:text-shadow-sm sm:shadow-black">
              @{username}
            </p>
            <p className="font-light">
              {bio || `${displayName} is still deciding what to put here.`}
            </p>
            <div className="inline-flex space-x-3 text-sm mt-2">
              <p>{followerCount} followers</p>
              <p>{followingCount} following</p>
            </div>
            <div className="mt-2">
              {isProfileOwner ? (
                <div>
                  <Link
                    href={`/p/${username}?createPost=1`}
                    role="button"
                    className="px-3 py-2 rounded text-sm font-semibold bg-green-500 dark:bg-green-700 hover:bg-green-600 hover:shadow-sm focus:ring-2 focus:ring-green-400 focus:dark:ring-green-800 transition duration-300 mr-3"
                  >
                    New Post
                  </Link>
                  <Link
                    href={`/p/${username}?editProfile=1`}
                    role="button"
                    className="px-3 py-2 rounded text-sm font-semibold bg-orange-500 dark:bg-orange-700 hover:bg-orange-600 hover:shadow-sm focus:ring-2 focus:ring-orange-400 focus:dark:ring-orange-800 transition duration-300"
                  >
                    Edit Profile
                  </Link>
                </div>
              ) : (
                <ToggleFollowButton
                  isFollowing={isFollowing}
                  targetId={id}
                  username={username}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isProfileOwner && <CreatePostModal username={username} />}
      {isProfileOwner && (
        <EditProfileModal
          avatar={avatar}
          banner={banner}
          bio={bio}
          displayName={displayName}
          username={username}
        />
      )}
    </>
  );
}

export default ProfileBit;
