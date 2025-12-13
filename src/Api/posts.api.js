import axios from "axios";

const token = localStorage.getItem("token");

export async function getPosts() {
  const { data } = await axios.get("https://linked-posts.routemisr.com/posts?sort=-createdAt", {
    headers: { token },
  });
  return data;
}
