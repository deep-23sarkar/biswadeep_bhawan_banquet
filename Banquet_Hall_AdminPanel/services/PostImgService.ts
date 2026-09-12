import axiosInstance from "@/lib/axios";
import { PostImg } from "@/types/PostImg";

export const uploadImg = async(data: PostImg) => {
    const result = await axiosInstance.post('/postphoto', data);
    return result.data;
}