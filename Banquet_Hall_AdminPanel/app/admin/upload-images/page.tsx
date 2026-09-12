"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { uploadImg } from "@/services/PostImgService";

// interface UploadedImage {
//   category: string;
//   description: string;
//   files: File[];
// }

const categories = ["WEDDING", "BIRTHDAY", "RECEPTION", "OTHERS"];


export default function UploadImagesPage() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // const [previews, setPreviews] = useState<string[]>([]);
  // const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  // const [imageUrl,setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );
    setSelectedFiles((prev) => [...prev, ...newFiles]);

    //   // Generate previews
    //   newFiles.forEach((file) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       setPreviews((prev) => [...prev, reader.result as string]);
    //     };
    //     reader.readAsDataURL(file);
    //   });
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
    // setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    // setPreviews((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles([]);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category.trim() || selectedFiles.length === 0) {
      alert("Please fill in all fields and select at least one image");
      return;
    }

    setUploading(true);

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // const newUpload: UploadedImage = {
    //   id: Date.now().toString(),
    //   title,
    //   description,
    //   files: selectedFiles,
    //   previews,
    //   uploadedAt: new Date().toLocaleString(),
    // };

    // setUploadedImages((prev) => [newUpload, ...prev]);

    //Sending data in backend
    try {
      const formData = new FormData();
      formData.append("file", selectedFiles[0]);
      formData.append("upload_preset", "banquet_hall_images");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const response = await res.json();
      const uploadUrl = await response.secure_url;
      console.log("Cloudinary Response:", uploadUrl);
      // setImageUrl(uploadUrl)

      const data = await uploadImg({
        category: category.toUpperCase(),
        title: description,
        image: uploadUrl,
      });
      console.log(data);

      // alert(`Successfully uploaded ${selectedFiles.length} image(s)!`);
      toast.success("Successfully post uploaded");
    } catch (error) {
      console.log(error);
    }

    // Reset form
    setCategory("");
    setDescription("");
    setSelectedFiles([]);
    setUploading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upload Images</h1>
        <p className="mt-2 text-gray-600">Add new images to your gallery</p>
      </div>

      {/* Upload Form */}
      <Card className="border-0 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Image Upload Form
          </h2>

          <form onSubmit={handleUpload} className="space-y-6">
            {/* Title Field */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={uploading}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

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
                placeholder="Enter image gallery description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={uploading}
                rows={4}
              />
            </div>

            {/* File Upload Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images *
              </label>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50"
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  disabled={uploading}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload size={32} className="mx-auto mb-3 text-gray-400" />
                <p className="text-sm font-medium text-gray-700">
                  Drag and drop images here or click to browse
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>

            <div>
              {selectedFiles.length == 1 ? (
                <div>
                  <Button
                    className="bg-red-600 hover:bg-red-400"
                    onClick={removeFile}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            {/* Preview Grid */}
            {/* {previews.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Selected Images ({previews.length})
                </h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={uploading || selectedFiles.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              {uploading
                ? "Uploading..."
                : `Upload ${selectedFiles.length > 0 ? selectedFiles.length : ""} Image(s)`}
            </Button>
          </form>
        </div>
      </Card>

      {/* Uploaded Images */}
      {/* {uploadedImages.length > 0 && (
        <Card className="border-0 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Uploaded Images ({uploadedImages.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-100">
            {uploadedImages.map((upload) => (
              <div key={upload.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex gap-4">
                  
                  <div className="flex gap-2">
                    {upload.previews.slice(0, 3).map((preview, index) => (
                      <div key={index} className="rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={preview}
                          alt={`Uploaded ${index + 1}`}
                          className="w-16 h-16 object-cover"
                        />
                      </div>
                    ))}
                    {upload.previews.length > 3 && (
                      <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                        +{upload.previews.length - 3}
                      </div>
                    )}
                  </div>

                 
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{upload.category}</h3>
                    {upload.description && (
                      <p className="mt-1 text-sm text-gray-600">{upload.description}</p>
                    )}
                    <div className="mt-3 flex items-center gap-4">
                      <span className="text-xs text-gray-500">
                        {upload.previews.length} images
                      </span>
                      <span className="text-xs text-gray-500">{upload.uploadedAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )} */}

      {/* Empty State
      {uploadedImages.length === 0 && (
        <Card className="border-0 shadow-sm">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ImageIcon size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-600">No images uploaded yet</p>
            <p className="text-sm text-gray-500 mt-1">Upload your first images above to get started</p>
          </div>
        </Card>
      )} */}
    </div>
  );
}
