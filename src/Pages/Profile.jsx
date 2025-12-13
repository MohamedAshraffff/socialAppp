import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserData } from "../Api/getUserData";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../Api/profile.api";
import PostItem from "../components/PostItem";

export default function Profile() {
  const { id } = useParams();

  const { data: userData } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getUserData(),
    refetchOnWindowFocus: false,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => getUserProfile(id),
    refetchOnWindowFocus: false,
  });

  console.log("Posts data:", data);
  console.log("User data:", userData);

  return (
    <>
      <div className="min-h-screen dark:bg-black bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="w-full lg:w-80 lg:sticky lg:top-8 lg:self-start">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-8">
                  <div className="text-center">
                    <img
                      className="h-32 w-32 rounded-full border-4 border-purple-500 dark:border-purple-600 mx-auto mb-4"
                      src={
                        userData?.user?.photo ||
                        "https://via.placeholder.com/150"
                      }
                      alt="Profile"
                    />
                    <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-2">
                      {userData?.user?.name || "Loading..."}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                      {userData?.user?.dateOfBirth || "No date"}
                    </p>

                    <div className="py-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-center">
                        <p className="font-bold text-3xl text-purple-600 dark:text-purple-500 mb-1">
                          {data?.posts?.length || 0}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Posts
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <main className="flex-1 min-w-0">
              <div className="space-y-6">
                {isLoading && (
                  <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400">
                      Loading posts...
                    </p>
                  </div>
                )}

                {!isLoading && data?.posts?.length === 0 && (
                  <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg shadow">
                    <p className="text-gray-600 dark:text-gray-400">
                      No posts yet
                    </p>
                  </div>
                )}

                {data?.posts?.map((post) => (
                  <PostItem key={post._id} post={post} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
