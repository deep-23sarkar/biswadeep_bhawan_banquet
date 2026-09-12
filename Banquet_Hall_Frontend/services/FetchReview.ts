import axiosInstance from "@/lib/axios";

const fetchAllReviews = async () =>{
    const res = await axiosInstance.get("/reviews");
    return res.data;
}

export default fetchAllReviews;