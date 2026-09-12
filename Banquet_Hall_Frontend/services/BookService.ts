import axiosInstance from "@/lib/axios";
import { BookInstance } from "@/types/Booking";

const bookServices = async(bookings: BookInstance)=>{
    const response = await axiosInstance.post("/booking",bookings)
    return response.data;
}

export default bookServices