import axios from "axios";

const token = localStorage.getItem("token");

export async function postComment({ content, post }) {
  const { data } = await axios.post(
    `https://linked-posts.routemisr.com/comments`,
    { content, post },
    {
      headers: { token },
    }
  );
  return data;
}
