'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'

interface Photo {
  id: number
  src: string
  alt: string
  description: string
}

// Sample photo data - you can add more photos following this structure
const photos: Photo[] = [
  {
    id: 20,
    src: "/images/home20.webp",
    alt: "house-20",
    description: "Kitchen"
  },
  {
    id: 5,
    src: "/images/home5.webp",
    alt: "house-5",
    description: "Kitchen"
  },
  {
    id: 18,
    src: "/images/home18.webp",
    alt: "house-18",
    description: "Kitchen"
  },
  {
    id: 10,
    src: "/images/home10.webp",
    alt: "house-10",
    description: "Kitchen"
  },
  {
    id: 11,
    src: "/images/home11.webp",
    alt: "house-11",
    description: "Kitchen"
  },
  {
    id: 9,
    src: "/images/home9.webp",
    alt: "house-9",
    description: "Living Room"
  },
  {
    id: 15,
    src: "/images/home15.webp",
    alt: "house-15",
    description: "Hallway"
  },
  {
    id: 17,
    src: "/images/home17.webp",
    alt: "house-17",
    description: "Hallway"
  },
  {
    id: 7,
    src: "/images/home7.webp",
    alt: "house-7",
    description: "Bathroom 1"
  },
  {
    id: 1,
    src: "/images/home1.webp",
    alt: "house-1",
    description: "Bedroom 1"
  },
  {
    id: 2,
    src: "/images/home2.webp",
    alt: "house-2",
    description: "Bedroom 1"
  },
  {
    id: 19,
    src: "/images/home19.webp",
    alt: "house-19",
    description: "Bedroom 2"
  },
  {
    id: 4,
    src: "/images/home4.webp",
    alt: "house-4",
    description: "Bedroom 3"
  },
  {
    id: 8,
    src: "/images/home8.webp",
    alt: "house-8",
    description: "Bedroom 3"
  },
  {
    id: 3,
    src: "/images/home3.webp",
    alt: "house-3",
    description: "Front View"
  },
  {
    id: 6,
    src: "/images/home6.webp",
    alt: "house-6",
    description: "Front View"
  },
  {
    id: 14,
    src: "/images/home14.webp",
    alt: "house-14",
    description: "Front View"
  },
  {
    id: 13,
    src: "/images/home13.webp",
    alt: "house-13",
    description: "Garage"
  },
];



export default function PhotosPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      <header className="py-8 px-4 border-b">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center leading-tight">
          1130 S Side Ave
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 text-center">
          Pittsburgh, PA 15212 
          <span className="ml-2 inline-block" aria-hidden="true">🏡</span>
        </p>
      </div>
    </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              layoutId={`photo-${photo.id}`}
              className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.img
                src={photo.src}
                alt={photo.alt}
                className="object-cover w-full h-full"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-lg font-semibold">{photo.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              layoutId={`photo-${selectedPhoto.id}`}
              className="relative max-w-5xl w-full aspect-auto bg-white rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-lg">{selectedPhoto.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

