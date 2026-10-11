import axiosInstance from "@/lib/axios";

export const fetchAllComments = async()=>{
    const response = await axiosInstance.get("/fetchcomments")
    return response.data;
}