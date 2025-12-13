import axios from "axios";

const token = localStorage.getItem("token");
export async function createPost(formdata) {
  const { data } = await axios.post(
    "https://linked-posts.routemisr.com/posts",

    formdata,

    {
      headers: {
        token,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}
