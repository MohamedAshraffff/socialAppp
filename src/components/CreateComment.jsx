import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { postComment } from "../Api/postComment.api";

export default function CreateComment({id}) {
  const queryClient = useQueryClient()

  const {isPending, data, mutate, } = useMutation({mutationFn:postComment,onSuccess:()=>queryClient.invalidateQueries({ queryKey: ['comments',id] })
})
  function addComment(e) {
    if (e.key ==="Enter" ){
      mutate({content:e.target.value,post:id})
    } 
  }
  console.log(data);
  
   return (
    <>
       {isPending&& <h5 className="px-2">Posting...</h5>}
      <div className="p-5">
        <textarea 
          onKeyDown={addComment}
          className=" w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 ease-in-out"
          rows={1}
          placeholder="Write your comment here..."
          defaultValue={""}
        />
        <div className="flex justify-end">
          <button onClick={addComment} className="xl:hidden mt-3 bg-purple-600 hover:bg-purple-700  text-white font-bold py-2 px-4 rounded-lg transition duration-150 ease-in-out">
            Post Comment
          </button>
        </div>
      </div>
    </>
  );
}
