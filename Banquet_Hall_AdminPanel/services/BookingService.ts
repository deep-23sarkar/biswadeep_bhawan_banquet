import axiosInstance from "@/lib/axios";

export const fetchAllBookings = async()=>{
    const response = await axiosInstance.get("/fetchbookings")
    return response.data;
}