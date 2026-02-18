import { useState } from "react";
import FollowButton from "../buttons/FollowButton";
import SendMessageButton from "../buttons/SendMessageButton";

export default function ProfileInfo({ userData }) {
  debugger;

  if (!userData)
    return <p className="dark:text-white">Failed to fetch user.</p>;
  return (
    <div className="mt-3 w-full max-w-2xl">
      <div className="flex w-full flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-lg transition-colors duration-300 sm:flex-row sm:items-start dark:bg-[#040303]/90">
        <div className="shrink-0">
          <img
            src={userData.profileUrl || "/placeholder.jpeg"}
            alt="profile picture"
            className="h-24 w-24 rounded-full border border-gray-300 object-cover sm:h-28 sm:w-28 dark:border-[#A13333]/50"
          />
        </div>

        <div className="flex w-full flex-1 flex-col items-center gap-4 sm:items-center">
          <div>
            <h2 className="truncate text-center text-xl font-bold text-gray-900 sm:text-center sm:text-2xl dark:text-gray-100">
              {userData.username}
            </h2>
          </div>
          <div className="flex w-full justify-center gap-8 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Posts
              </p>
              <p>{userData._count.posts}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Followers
              </p>
              <p>{userData._count.followers}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Following
              </p>
              <p>{userData._count.following}</p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-3 gap-x-10 sm:flex-row">
            <FollowButton userData={userData} className="w-full" />
            <SendMessageButton />
          </div>
        </div>
      </div>
    </div>
  );
}
