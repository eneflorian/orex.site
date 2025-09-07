'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  images: File[]
  onImagesChange: (images: File[]) => void
}

export default function ImageUpload({ images, onImagesChange }: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.filter(file => 
      file.type.startsWith('image/')
    )
    onImagesChange([...images, ...imageFiles])
  }, [images, onImagesChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: true
  })

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const clearAll = () => {
    onImagesChange([])
  }

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        {isDragActive ? (
          <p className="text-primary-600 font-medium">Lasă imaginile aici...</p>
        ) : (
          <div>
            <p className="text-gray-600 mb-2">
              Trage imaginile aici sau <span className="text-primary-600 font-medium">click pentru a selecta</span>
            </p>
            <p className="text-sm text-gray-500">
              Suportă: JPG, PNG, GIF, BMP, WebP
            </p>
          </div>
        )}
      </div>

      {/* Image List */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">
              Imagini selectate ({images.length})
            </h3>
            <button
              onClick={clearAll}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Șterge toate
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                  {image.name.length > 15 ? `${image.name.substring(0, 15)}...` : image.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <ImageIcon className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Sfaturi pentru rezultate optime:</p>
            <ul className="space-y-1 text-blue-700">
              <li>• Folosește imagini cu aceeași orientare (toate pe verticală sau toate pe orizontală)</li>
              <li>• Rezoluția recomandată: minim 1920x1080</li>
              <li>• Ordinea imaginilor va fi păstrată în video</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
