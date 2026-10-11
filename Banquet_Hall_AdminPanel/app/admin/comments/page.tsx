
"use client";

import { useEffect, useState } from "react";
import { Trash2, MessageCircle, User } from "lucide-react";
import { fetchAllComments } from "@/services/CommentService";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

interface Comment {
  id: string;
  name: string;
  text: string;
  createdAt: string;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchAllComments();
        setComments(data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        toast.error("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, []);

  const handleDelete = async (id: string) => {
    
    setDeletingId(id);

    try {
      // Ensure this endpoint matches your Spring Boot controller.
      await axiosInstance.delete(`/delete-comment/${id}`);

      setComments((prev) =>
        prev.filter((comment) => comment.id !== id)
      );

      toast.success("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Comments
        </h1>
        <p className="mt-2 text-gray-600">
          Manage comments submitted by your guests.
        </p>
      </div>

      {/* Comment count */}
      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
        <MessageCircle className="h-6 w-6 text-amber-700" />

        <div>
          <p className="text-sm text-gray-500">
            Total comments
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {comments.length}
          </p>
        </div>
      </div>

      {/* Comments feed */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
        {loading ? (
          <p className="py-10 text-center text-gray-500">
            Loading comments...
          </p>
        ) : comments.length === 0 ? (
          <div className="py-12 text-center">
            <MessageCircle className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <p className="font-medium text-gray-700">
              No comments yet
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Guest comments will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map((comment, index) => (
              <article
                key={comment.id}
                className="flex gap-3 border-b border-gray-100 pb-5 last:border-b-0 last:pb-0"
              >
                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                  <User className="h-5 w-5" />
                </div>

                {/* Comment content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h3 className="font-semibold text-gray-900">
                      {comment.name}
                    </h3>
                  </div>

                  <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-700">
                    {comment.text}
                  </p>

                  {/* Delete button */}
                  <div className="mt-3">
                    <button
                      type="button"
                      disabled={deletingId === comment.id}
                      onClick={() => handleDelete(comment.id)}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />

                      {deletingId === comment.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>

                {/* Serial number */}
                <span className="pt-1 text-xs text-gray-400">
                  #{index + 1}
                </span>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
