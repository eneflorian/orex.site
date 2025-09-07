'use client'

import { Play, Pause, RotateCcw } from 'lucide-react'
import { useState, useRef } from 'react'

interface VideoPreviewProps {
  videoUrl: string | null
  isGenerating: boolean
}

export default function VideoPreview({ videoUrl, isGenerating }: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  if (isGenerating) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Generez video-ul...</p>
          <p className="text-sm text-gray-500 mt-1">Aceasta poate dura câteva minute</p>
        </div>
      </div>
    )
  }

  if (!videoUrl) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
        <div className="text-center text-gray-500">
          <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="font-medium">Niciun video generat</p>
          <p className="text-sm">Încarcă imagini și generează un video</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Video Player */}
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-contain"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
        
        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-70 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              Pauză
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Redare
            </>
          )}
        </button>
        
        <button
          onClick={resetVideo}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Video Info */}
      <div className="bg-gray-50 rounded-lg p-3">
        <h4 className="font-medium text-gray-900 mb-2">Informații video</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <div>Format: MP4</div>
          <div>Status: Generat cu succes</div>
          <div>Gata pentru descărcare</div>
        </div>
      </div>
    </div>
  )
}
