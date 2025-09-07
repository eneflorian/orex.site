'use client'

interface VideoSettingsProps {
  settings: {
    duration: number
    transition: string
    quality: string
    fps: number
  }
  onSettingsChange: (settings: {
    duration: number
    transition: string
    quality: string
    fps: number
  }) => void
}

export default function VideoSettings({ settings, onSettingsChange }: VideoSettingsProps) {
  const updateSetting = (key: string, value: string | number) => {
    onSettingsChange({
      ...settings,
      [key]: value
    })
  }

  return (
    <div className="space-y-6">
      {/* Duration per image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Durată per imagine (secunde)
        </label>
        <input
          type="range"
          min="1"
          max="10"
          step="0.5"
          value={settings.duration}
          onChange={(e) => updateSetting('duration', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1s</span>
          <span className="font-medium text-primary-600">{settings.duration}s</span>
          <span>10s</span>
        </div>
      </div>

      {/* Transition type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tip tranziție
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'fade', label: 'Fade', desc: 'Tranziție lină' },
            { value: 'slide', label: 'Slide', desc: 'Alunecare' },
            { value: 'zoom', label: 'Zoom', desc: 'Mărire/micșorare' },
            { value: 'none', label: 'Fără', desc: 'Tăiere directă' }
          ].map((transition) => (
            <button
              key={transition.value}
              onClick={() => updateSetting('transition', transition.value)}
              className={`
                p-3 rounded-lg border text-left transition-colors
                ${settings.transition === transition.value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="font-medium text-sm">{transition.label}</div>
              <div className="text-xs text-gray-500">{transition.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quality */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Calitate video
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 'low', label: 'Scăzută', desc: '720p' },
            { value: 'medium', label: 'Medie', desc: '1080p' },
            { value: 'high', label: 'Înaltă', desc: '4K' }
          ].map((quality) => (
            <button
              key={quality.value}
              onClick={() => updateSetting('quality', quality.value)}
              className={`
                p-3 rounded-lg border text-center transition-colors
                ${settings.quality === quality.value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="font-medium text-sm">{quality.label}</div>
              <div className="text-xs text-gray-500">{quality.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* FPS */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          FPS (Frame Rate)
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[24, 30, 60].map((fps) => (
            <button
              key={fps}
              onClick={() => updateSetting('fps', fps)}
              className={`
                p-3 rounded-lg border text-center transition-colors
                ${settings.fps === fps
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="font-medium">{fps}</div>
              <div className="text-xs text-gray-500">FPS</div>
            </button>
          ))}
        </div>
      </div>

      {/* Preview info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Previzualizare setări</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <div>Durată totală: ~{settings.duration * 5} secunde (pentru 5 imagini)</div>
          <div>Rezoluție: {settings.quality === 'high' ? '4K' : settings.quality === 'medium' ? '1080p' : '720p'}</div>
          <div>Frame rate: {settings.fps} FPS</div>
          <div>Tranziție: {settings.transition === 'fade' ? 'Fade' : settings.transition === 'slide' ? 'Slide' : settings.transition === 'zoom' ? 'Zoom' : 'Fără'}</div>
        </div>
      </div>
    </div>
  )
}
