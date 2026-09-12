'use client';

import { useState, useMemo,useEffect } from 'react';

import {DeleteIcon} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { fetchAllBookings } from '@/services/BookingService';
import { BookInstance } from '@/types/Booking';
import axiosInstance from '@/lib/axios';
import toast from 'react-hot-toast';

// interface Booking {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   occasion: string;
//   date: string;
// }



// const bookings: Booking[] = [
//   {
//     id: 1,
//     name: 'Sarah Johnson',
//     email: 'sarah@example.com',
//     phone: '(555) 123-4567',
//     occasion: 'Wedding',
//     date: '2024-06-15',
//   },
//   {
//     id: 2,
//     name: 'Michael Chen',
//     email: 'michael@example.com',
//     phone: '(555) 234-5678',
//     occasion: 'Birthday Party',
//     date: '2024-05-20',
//   },
//   {
//     id: 3,
//     name: 'Emily Davis',
//     email: 'emily@example.com',
//     phone: '(555) 345-6789',
//     occasion: 'Corporate Event',
//     date: '2024-05-10',
//   },
//   {
//     id: 4,
//     name: 'James Wilson',
//     email: 'james@example.com',
//     phone: '(555) 456-7890',
//     occasion: 'Anniversary',
//     date: '2024-04-28',
//   },
//   {
//     id: 5,
//     name: 'Lisa Anderson',
//     email: 'lisa@example.com',
//     phone: '(555) 567-8901',
//     occasion: 'Graduation',
//     date: '2024-06-01',
//   },
//   {
//     id: 6,
//     name: 'David Martinez',
//     email: 'david@example.com',
//     phone: '(555) 678-9012',
//     occasion: 'Wedding',
//     date: '2024-07-05',
//   },
// ];




export default function BookingsPage() {
  const [bookings,setBookings] = useState([]);

  const handleDelete = (email: string)=>{

    console.log(email)
    try{
      axiosInstance.delete(`/delete-booking/${email}`)
      window.location.reload();
    }catch(error){
      toast.error("Something error occured!!")
    }
  }


  useEffect(() => {
    try {
      const fetchBookings = async () => {
        const bookings = await fetchAllBookings();
        setBookings(bookings)
      };
      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  }, []);


  // const filteredAndSortedBookings = useMemo(() => {
  //   let filtered = bookings.filter(
  //     (booking) =>
  //       booking.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       booking.phone.includes(searchTerm) ||
  //       booking.occasion.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //   filtered.sort((a, b) => {
  //     const aValue = a[sortField];
  //     const bValue = b[sortField];

  //     if (typeof aValue === 'string') {
  //       return sortDirection === 'asc'
  //         ? aValue.localeCompare(bValue as string)
  //         : (bValue as string).localeCompare(aValue);
  //     }

  //     return sortDirection === 'asc'
  //       ? (aValue as number) - (bValue as number)
  //       : (bValue as number) - (aValue as number);
  //   });

  //   return filtered;
  // }, [searchTerm, sortField, sortDirection]);

  

  // const SortIcon = ({ field }: { field: SortField }) => {
  //   if (sortField !== field) return null;
  //   return sortDirection === 'asc' ? (
  //     <ChevronUp size={16} className="inline ml-1" />
  //   ) : (
  //     <ChevronDown size={16} className="inline ml-1" />
  //   );
  // };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <p className="mt-2 text-gray-600">Manage all booking requests</p>
      </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="cursor-pointer select-none py-4" >
                  <span className="font-semibold text-gray-700">
                    Name
                    
                  </span>
                </TableHead>
                <TableHead className="cursor-pointer select-none py-4" >
                  <span className="font-semibold text-gray-700">
                    Email
                    
                  </span>
                </TableHead>
                <TableHead className="cursor-pointer select-none py-4" >
                  <span className="font-semibold text-gray-700">
                    Phone
                    
                  </span>
                </TableHead>
                <TableHead className="cursor-pointer select-none py-4" >
                  <span className="font-semibold text-gray-700">
                    Message
                    
                  </span>
                </TableHead>
                <TableHead className="cursor-pointer select-none py-4" >
                  <span className="font-semibold text-gray-700">
                    Date
                    
                  </span>
                </TableHead>
                <TableHead className="cursor-pointer select-none py-4" >
                  <span className="font-semibold text-gray-700">
                    Delete
                    
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((booking: BookInstance) => (
                  <TableRow
                    key={booking.firstname}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 font-medium text-gray-900">
                      {booking.firstname+" "+booking.lastname}
                    </TableCell>
                    <TableCell className="py-4 text-gray-600">{booking.email}</TableCell>
                    <TableCell className="py-4 text-gray-600">{booking.phone}</TableCell>
                    <TableCell className="py-4 text-gray-600">{booking.message}</TableCell>
                    <TableCell className="py-4 text-gray-600">
                      {new Date(booking.createdAt).toLocaleDateString("en-IN", {
  timeZone: "Asia/Kolkata",
})}
                    </TableCell>
                    <TableCell className="py-4 text-gray-600 cursor-pointer" onClick={()=> handleDelete(booking.email)}><DeleteIcon/></TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-gray-500">
                    No bookings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        {/* <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between text-sm text-gray-600">
          <p>Showing {filteredAndSortedBookings.length} of {bookings.length} bookings</p>
        </div> */}
    </div>
  );
}
