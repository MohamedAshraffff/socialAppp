import React from "react";
import formateDate from "../lib/formatDate";

export default function CommentItem({ comment }) {
  const {
    commentCreator: { name, _id },
    content,
    createdAt,
    id,
    post,
  } = comment;
  return (
    <div className="bg-neutral-primary-soft border-default rounded-base shadow-xs p-3 mb-2 dark:bg-gray-900">
      <div className="flex flex-row items-start gap-3">
        {/* User Photo */}
        <img
          src={

            "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(name) +
              "&background=random"
          }
          className="size-10 rounded-full flex-shrink-0"
          alt={`${name}'s photo`}
        />

        {/* Comment Content */}
        <div className="flex-1 ">
          <div className="  flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm dark:text-white">
              {name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formateDate(createdAt)}
            </span>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 mx">{content}</p>
        </div>
      </div>
    </div>
  );
}
