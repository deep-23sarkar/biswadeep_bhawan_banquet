import axiosInstance from "@/lib/axios";
import { CommentInstance } from "@/types/Comment";

export const commentServices = async(comments: CommentInstance)=>{
    const response = await axiosInstance.post("/comments",comments)
    return response.data;
}

export const fetchAllComments = async()=>{
    const response = await axiosInstance.get("/fetchcomments")
    return response.data;
}
