'use client'

import { useState } from 'react'
import { Upload, Play, Download, Settings, Image, Video } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'
import VideoSettings from '@/components/VideoSettings'
import VideoPreview from '@/components/VideoPreview'

export default function Home() {
  const [images, setImages] = useState<File[]>([])
  const [videoSettings, setVideoSettings] = useState({
    duration: 3,
    transition: 'fade',
    quality: 'high',
    fps: 30
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)

  const handleGenerateVideo = async () => {
    if (images.length === 0) return
    
    setIsGenerating(true)
    try {
      const formData = new FormData()
      images.forEach((image, index) => {
        formData.append(`image_${index}`, image)
      })
      formData.append('settings', JSON.stringify(videoSettings))

      const response = await fetch('/api/generate-video', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const blob = await response.blob()
        const videoUrl = URL.createObjectURL(blob)
        setGeneratedVideo(videoUrl)
      } else {
        console.error('Eroare la generarea video-ului')
      }
    } catch (error) {
      console.error('Eroare:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (generatedVideo) {
      const a = document.createElement('a')
      a.href = generatedVideo
      a.download = 'video-generat.mp4'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Video Generator
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Creează video-uri uimitoare din pozele tale cu efecte și tranziții profesionale
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <Image className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold">Încarcă Imagini</h2>
            </div>
            <ImageUpload 
              images={images} 
              onImagesChange={setImages}
            />
          </div>

          {/* Video Settings */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold">Setări Video</h2>
            </div>
            <VideoSettings 
              settings={videoSettings}
              onSettingsChange={setVideoSettings}
            />
          </div>

          {/* Generate Button */}
          <div className="card">
            <button
              onClick={handleGenerateVideo}
              disabled={images.length === 0 || isGenerating}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generez video-ul...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Generează Video
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <Video className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold">Previzualizare</h2>
            </div>
            <VideoPreview 
              videoUrl={generatedVideo}
              isGenerating={isGenerating}
            />
          </div>

          {generatedVideo && (
            <div className="card">
              <button
                onClick={handleDownload}
                className="w-full btn-secondary flex items-center justify-center gap-2 py-3 text-lg"
              >
                <Download className="w-5 h-5" />
                Descarcă Video
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{images.length}</div>
          <div className="text-gray-600">Imagini încărcate</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">
            {images.length > 0 ? (images.length * videoSettings.duration).toFixed(1) : '0'}
          </div>
          <div className="text-gray-600">Secunde video</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{videoSettings.fps}</div>
          <div className="text-gray-600">FPS</div>
        </div>
      </div>
    </div>
  )
}
