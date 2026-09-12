import axiosInstance from "@/lib/axios";

export const fetchAllPhotos = async () => {
    const res = await axiosInstance.get('/posts');
    return res.data;
}