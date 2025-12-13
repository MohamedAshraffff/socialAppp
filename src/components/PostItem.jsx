import React, { useContext, useState } from "react";
import formateDate from "../lib/formatDate";
import { Link, useLocation } from "react-router-dom";
import Comments from "./Comments";
import CreateComment from "./CreateComment";
import { auth } from "../Context/auth.context.jsx";
import { deletePost } from "../Api/deletePost.api.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function PostItem({ post }) {
  const { user } = useContext(auth);
  // console.log(user);
  const queryClient = useQueryClient();

  const {
    image,
    body,

    _id,
    createdAt,
    user: { name, photo, _id: userId },
  } = post;
  const Location = useLocation().pathname.startsWith("/posts");
  const [isOpen, setOpen] = useState(Location);
  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post Removed");
    },
  });
  return (
    <div className="flex justify-center items-center flex-col my-4 px-4">
      <div className="relative w-full max-w-2xl">
        <article className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Header Section */}
          <div className="profile flex flex-row justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <img
                src={photo}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500 hover:scale-105 transition-transform duration-200"
                alt="User profile"
              />
              <div className="info">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {name}
                </h3>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  {formateDate(createdAt)}
                </time>
              </div>
            </div>
            {user && user._id === userId && (
              <button
                onClick={() => mutate(_id)}
                className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-950 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 group"
                aria-label="Delete post"
              >
                <i className="fa-solid fa-trash text-sm group-hover:scale-110 transition-transform"></i>
              </button>
            )}
          </div>

          {/* Content Section */}
          {body && (
            <div className="px-4 py-3">
              <p className="text-gray-800 dark:text-gray-100 text-base leading-relaxed whitespace-pre-wrap">
                {body}
              </p>
            </div>
          )}

          {/* Image Section */}
          {image && (
            <div className="relative bg-gray-100 dark:bg-gray-800">
              <img
                className="w-full h-auto object-cover hover:opacity-95 transition-opacity duration-200"
                src={image}
                alt={`Post by ${name}`}
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}

          {/* Actions Section */}
          <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex justify-around items-center gap-2">
              <button className="flex items-center gap-2 flex-1 justify-center py-2 px-3 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 group">
                <i className="fa-solid fa-heart text-lg group-hover:scale-110 transition-transform"></i>
                <span className="font-medium text-sm hidden sm:inline">
                  Like
                </span>
              </button>

              <button
                onClick={() => setOpen(!isOpen)}
                className="flex items-center gap-2 flex-1 justify-center py-2 px-3 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 group"
              >
                <i className="fa-solid fa-comment text-lg group-hover:scale-110 transition-transform"></i>
                <span className="font-medium text-sm hidden sm:inline">
                  Comment
                </span>
              </button>

              <button className="flex items-center gap-2 flex-1 justify-center py-2 px-3 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 group">
                <i className="fa-solid fa-share text-lg group-hover:scale-110 transition-transform"></i>
                <span className="font-medium text-sm hidden sm:inline">
                  Share
                </span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          {isOpen && (
            <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
              <CreateComment id={_id} />
              <Comments id={_id} />
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
