"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Photo {
  id: string;
  image: string;
  category: string;
  seq: number;
  createdAt: string;
}

export default function pictures() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all picture URLs
  const fetchPictures = async () => {
    try {
      const response = await axios.get<Photo[]>(
        `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}/admin/posts`,
      );
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching pictures:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPictures();
  }, []);

  // Delete picture
  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}/admin/delete-posts/${id}`,
      );

      toast.success(response.data);

      setTimeout(() => {
        window.location.reload()
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
      {photos.map((pic) => (
        <div
          key={pic.id}
          className="overflow-hidden rounded-xl border bg-white shadow-md"
        >
          {/* Image */}
          <div className="relative h-60 w-full">
            <Image
              src={pic.image}
              alt="Picture"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw,
                     (max-width: 1024px) 50vw,
                     25vw"
            />
          </div>

          {/* Delete button */}
          <div className="flex justify-end p-3">
            <button
              type="button"
              onClick={() => handleDelete(pic.id)}
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
