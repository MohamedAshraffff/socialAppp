import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "../Api/getUserData";
import { createPost } from "../Api/createPost.api";
import toast from "react-hot-toast";

export default function AddPost() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error, data } = useMutation({
    mutationFn: createPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Your Post is uploaded");
      setBody("");
      setImage("");
      setImgSrc("");
      const fileInput = document.getElementById("fileInput");
      if (fileInput) fileInput.value = "";
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Error! try again");
    }
  }, [isError]);

  useEffect(() => {
    let loadingToast;
    if (isPending) {
      loadingToast = toast.loading("Posting...");
    }
    return () => {
      if (loadingToast) {
        toast.dismiss(loadingToast);
      }
    };
  }, [isPending]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImgSrc(file);
      setImage(URL.createObjectURL(file));
    }
  };
  function handleAddPost(e) {
    e.preventDefault();
    const formdata = new FormData();
    if (body) formdata.append("body", body);
    if (imgSrc) formdata.append("image", imgSrc);
    mutate(formdata);
  }
  return (
    <>
      <form onSubmit={handleAddPost} className="m-3">
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg max-w-2xl mx-auto border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <img
              src={userData?.user?.photo}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500"
            />
            <input
              type="text"
              onChange={(e) => setBody(e.target.value)}
              value={body}
              placeholder={`What's on your mind, ${
                userData?.user?.name?.split(" ")[0] || "User"
              }?`}
              className="flex-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-100 rounded-full px-6 py-3 outline-none focus:bg-gray-200 dark:focus:bg-gray-700 transition placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer text-purple-500 hover:text-purple-600 transition"
            >
              <i className="fa-solid fa-photo-film text-2xl"></i>
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 my-3 transition-all duration-200"
            >
              Post
            </button>
          </div>
          {imgSrc && (
            <div className="mt-4 relative">
              <img
                src={image}
                alt="Preview"
                className="w-full rounded-lg max-h-96 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setImage("");
                  setImgSrc("");
                  document.getElementById("fileInput").value = "";
                }}
                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
