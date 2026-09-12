import axiosInstance from "@/lib/axios";
import { PostReview } from "@/types/PostReview";

const uploadVideos = async (reviewData: PostReview) => {
  const response = await axiosInstance.post("/postreview",reviewData)
  return response.data;
}

export default uploadVideos;