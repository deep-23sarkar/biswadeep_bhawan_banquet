"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import uploadVideos from "@/services/PostReviewService";

export default function UploadVideosPage() {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [videoUrl, setVideoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const file = files[0];
    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file");
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    setUploading(true);

    try {
      //Upload in the cloudinary

      if (!selectedFile) {
        toast.error("Please select a file first");
        return;
      }
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("upload_preset", "banquet_Hall_Reviews");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/video/upload`,
        {
          method: "POST",
          body: data,
        },
      );

      const response = await res.json();
      const uploadUrl = await response.secure_url;
      console.log("Cloudinary Response:", uploadUrl);
      // setVideoUrl(uploadUrl);

      //Upload in database
      const reviewRes = await uploadVideos({
        name: name,
        comment: description,
        video: uploadUrl,
      });
      console.log("Response:", reviewRes);
      toast.success("Successfully video uploaded!");
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      toast.error("Failed to upload video. Please try again.");
    }

    // Reset form
    setName("");
    setDescription("");
    setSelectedFile(null);
    setUploading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upload Videos</h1>
        <p className="mt-2 text-gray-600">Add and manage your video content</p>
      </div>

      {/* Upload Form */}
      <Card className="border-0 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Video Upload Form
          </h2>

          <form onSubmit={handleUpload} className="space-y-6">
            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Client's Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Client's name"
                value={name}
                className="w-full py-1.5 rounded-sm border-2 border-gray-200 text-sm pl-3 transition-colors"
                onChange={(e) => setName(e.target.value)}
                disabled={uploading}
              />
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Enter video description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={uploading}
                rows={4}
              />
            </div>

            {/* File Upload Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video File *
              </label>
              {!selectedFile ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="relative rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50"
                >
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    disabled={uploading}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload size={32} className="mx-auto mb-3 text-gray-400" />
                  <p className="text-sm font-medium text-gray-700">
                    Drag and drop your video here or click to browse
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    MP4, WebM, OGG up to 500MB
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
                  <div className="flex items-start gap-4">
                    {/* File Info */}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove Video
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={uploading || !selectedFile}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              {uploading ? "Uploading..." : "Upload Video"}
            </Button>
          </form>
        </div>
      </Card>

      {/* Uploaded Videos Grid */}
      {/* {uploadedVideos.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Uploaded Videos ({uploadedVideos.length})
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {uploadedVideos.map((video) => (
              <Card key={video.id} className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden"> */}
      {/* Video Thumbnail
                <div className="relative bg-gray-900 aspect-video">
                  <video
                    src={video.preview}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors cursor-pointer">
                    <Play size={48} className="text-white fill-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div> */}

      {/* Video Info */}
      {/* <div className="p-4">
                  {video.description && (
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {video.description}
                    </p>
                  )} */}
      {/* <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>{video.uploadedAt}</span>
                  </div> */}
      {/* </div>
              </Card>
            ))}
          </div>
        </div>
      )} */}

      {/* Empty State
      {uploadedVideos.length === 0 && (
        <Card className="border-0 shadow-sm">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Film size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-600">No videos uploaded yet</p>
            <p className="text-sm text-gray-500 mt-1">Upload your first video above to get started</p>
          </div>
        </Card>
      )} */}
    </div>
  );
}
