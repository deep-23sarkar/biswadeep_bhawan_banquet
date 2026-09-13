"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Videos } from "@/types/Videos";


export default function reviews() {
  const [videos, setVideos] = useState<Videos[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all picture URLs
  const fetchReviews = async () => {
    try {
      const response = await axios.get<Videos[]>(
        `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}/reviews`,
      );
      setVideos(response.data);
    //   console.log(videos);
    } catch (error) {
      console.error("Error fetching pictures:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Delete picture
  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}/delete-reviews/${id}`,
      );

      toast.success(response.data);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error deleting picture:", error);
    }
  };

  // window.location.reload();
  if (loading) {
    return <div className="flex justify-center p-10">Loading pictures...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <div
          key={video.id}
          className="overflow-hidden rounded-xl border bg-white shadow-md"
        >
          {/* Image */}
          <div className="relative h-60 w-full">
            <video
              src={video.video}
              controls
              className="h-60 w-full rounded-lg object-cover"
            />
          </div>

          {/* Delete button */}
          <div className="flex justify-end p-3">
            <button
              type="button"
              onClick={() => handleDelete(video.id)}
              className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
              title="Delete picture"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
