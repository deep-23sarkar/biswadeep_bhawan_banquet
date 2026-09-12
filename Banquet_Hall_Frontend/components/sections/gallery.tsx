"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { fetchAllPhotos } from "@/services/FetchPosts";
import { PostImg } from "@/types/PostImg";

const categories = ["All", "WEDDING", "BIRTHDAY", "RECEPTION", "OTHERS"];

// const galleryItems = [
//   {
//     id: 1,
//     category: "Wedding",
//     title: "Romantic Wedding Setup",
//     color: "from-blush to-cream",
//     image:
//       "https://images.wallpapersden.com/image/download/mahendra-singh-dhoni-cricket-india_Z2ZuaWuUmZqaraWkpJRmaWllrWZpaWU.jpg",
//   },
//   {
//     id: 2,
//     category: "Birthday",
//     title: "Grand Birthday Celebration",
//     color: "from-primary/20 to-accent/20",
//     image:
//       "https://images.wallpapersden.com/image/download/mahendra-singh-dhoni-cricket-india_Z2ZuaWuUmZqaraWkpJRmaWllrWZpaWU.jpg",
//   },
//   {
//     id: 3,
//     category: "Reception",
//     title: "Elegant Reception Hall",
//     color: "from-cream-dark to-blush-dark",
//     image:
//       "https://images.wallpapersden.com/image/download/mahendra-singh-dhoni-cricket-india_Z2ZuaWuUmZqaraWkpJRmaWllrWZpaWU.jpg",
//   },
//   {
//     id: 4,
//     category: "Wedding",
//     title: "Floral Wedding Decor",
//     color: "from-accent/30 to-cream",
//     image:
//       "https://images.wallpapersden.com/image/download/mahendra-singh-dhoni-cricket-india_Z2ZuaWuUmZqaraWkpJRmaWllrWZpaWU.jpg",
//   },
//   {
//     id: 5,
//     category: "Corporate",
//     title: "Corporate Gala Event",
//     color: "from-foreground/10 to-muted",
//     image:
//       "https://images.wallpapersden.com/image/download/mahendra-singh-dhoni-cricket-india_Z2ZuaWuUmZqaraWkpJRmaWllrWZpaWU.jpg",
//   },
//   {
//     id: 6,
//     category: "Birthday",
//     title: "Kids Birthday Party",
//     color: "from-blush to-primary/20",
//     image:
//       "https://images.wallpapersden.com/image/download/mahendra-singh-dhoni-cricket-india_Z2ZuaWuUmZqaraWkpJRmaWllrWZpaWU.jpg",
//   },
//   {
//     id: 7,
//     category: "Wedding",
//     title: "Traditional Ceremony",
//     color: "from-primary/30 to-cream-dark",
//     image:
//       "https://images.wallpapersden.com/image/download/mahendra-singh-dhoni-cricket-india_Z2ZuaWuUmZqaraWkpJRmaWllrWZpaWU.jpg",
//   },
//   {
//     id: 8,
//     category: "Reception",
//     title: "Dinner Reception",
//     color: "from-cream to-champagne",
//     image:
//       "https://images.wallpapersden.com/image/download/mahendra-singh-dhoni-cricket-india_Z2ZuaWuUmZqaraWkpJRmaWllrWZpaWU.jpg",
//   },
// ];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryItems, setGalleryItems] = useState<PostImg[]>([]);


  //Fetch all photos from backend
  useEffect(() => {
    try {
      const fetchData = async () => {
        const galleryItems = await fetchAllPhotos();
        setGalleryItems(galleryItems);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
    // console.log("Gallery component mounted, fetching photos...");
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const currentIndex =
    selectedImage !== null
      ? filteredItems.findIndex((item) => item.seq === selectedImage)
      : -1;

  const navigateImage = (direction: "prev" | "next") => {
    if (currentIndex === -1) return;
    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + filteredItems.length) % filteredItems.length
        : (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[newIndex].seq);
  };

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 text-sm font-medium tracking-widest uppercase text-primary border border-primary/30 rounded-full mb-6"
          >
            Our Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Moments We&apos;ve{" "}
            <span className="text-gold-gradient">Created</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            আমাদের নানান অনুষ্ঠান ও উদযাপনের সুন্দর মুহূর্তগুলো
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(item.seq)}
              >
                <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-center transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Placeholder gradient */}
                  <div className= "absolute inset-0 bg-linear-to-br" />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 duration-300">
                    <span className="text-sm font-medium text-white uppercase tracking-wider mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-serif text-white text-center">
                      {item.title}
                    </h3>
                  </div>

                  {/* Zoom indicator */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-75">
                    <svg
                      className="w-5 h-5 text-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-md p-4"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close button */}
              <button
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-cream hover:bg-card/40 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation buttons */}
              <button
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-cream hover:bg-card/40 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("prev");
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-cream hover:bg-card/40 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("next");
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image container */}
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl w-full aspect-4/3 rounded-2xl overflow-hidden text-white"
                onClick={(e) => e.stopPropagation()}
              >
                {filteredItems.find((item) => item.seq === selectedImage) && (
                  <div
                    className={`w-full h-full bg-linear-to-br flex items-center justify-center`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={
                          filteredItems.find(
                            (item) => item.seq === selectedImage,
                          )?.image || "/fallback.jpg"
                        }
                        alt="image"
                        fill
                        className="object-cover rounded-xl opacity-50"
                      />
                      <div className="text-center p-8 w-full h-full flex flex-col justify-center items-center">
                        <span className="text-2xl font-bold uppercase tracking-wider mb-2 block">
                          {
                            filteredItems.find(
                              (item) => item.seq === selectedImage,
                            )?.category
                          }
                        </span>
                        <p className="text-5xl font-bold md:text-3xl font-serif">
                          {
                            filteredItems.find(
                              (item) => item.seq === selectedImage,
                            )?.title
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
