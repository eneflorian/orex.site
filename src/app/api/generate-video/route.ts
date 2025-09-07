import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, rm, readFile } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegStatic from 'ffmpeg-static'

// Set ffmpeg path
if (ffmpegStatic) {
  ffmpeg.setFfmpegPath(ffmpegStatic)
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const settings = JSON.parse(formData.get('settings') as string)
    
    // Create temporary directory
    const tempDir = join('/tmp', `video-${uuidv4()}`)
    await mkdir(tempDir, { recursive: true })
    
    try {
      // Save uploaded images
      const imageFiles: string[] = []
      let imageIndex = 0
      
      while (formData.has(`image_${imageIndex}`)) {
        const imageFile = formData.get(`image_${imageIndex}`) as File
        const imageBuffer = await imageFile.arrayBuffer()
        const imagePath = join(tempDir, `image_${imageIndex}.jpg`)
        
        await writeFile(imagePath, Buffer.from(imageBuffer))
        imageFiles.push(imagePath)
        imageIndex++
      }
      
      if (imageFiles.length === 0) {
        throw new Error('Nu au fost găsite imagini')
      }
      
      // Generate video
      const outputPath = join(tempDir, 'output.mp4')
      
      await new Promise<void>((resolve, reject) => {
        let command = ffmpeg()
        
        // Add images with duration
        imageFiles.forEach((imagePath) => {
          command = command.input(imagePath)
        })
        
        // Configure video settings
        const qualitySettings = {
          low: { size: '1280x720', bitrate: '1M' },
          medium: { size: '1920x1080', bitrate: '2M' },
          high: { size: '3840x2160', bitrate: '5M' }
        }
        
        const quality = qualitySettings[settings.quality as keyof typeof qualitySettings] || qualitySettings.medium
        
        command
          .complexFilter([
            // Create slideshow with transitions
            ...imageFiles.map((_, index) => {
              const duration = settings.duration
              const startTime = index * duration
              
              if (settings.transition === 'fade' && index > 0) {
                return `[${index}:v]fade=t=in:st=${startTime}:d=0.5,fade=t=out:st=${startTime + duration - 0.5}:d=0.5[v${index}]`
              } else if (settings.transition === 'slide' && index > 0) {
                return `[${index}:v]crop=iw:ih,scale=${quality.size},setpts=PTS-STARTPTS[v${index}]`
              } else if (settings.transition === 'zoom' && index > 0) {
                return `[${index}:v]scale=${quality.size},zoompan=z='min(zoom+0.0015,1.5)':d=${duration * settings.fps}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${quality.size}[v${index}]`
              } else {
                return `[${index}:v]scale=${quality.size},setpts=PTS-STARTPTS[v${index}]`
              }
            }),
            // Concatenate all videos
            imageFiles.map((_, index) => `[v${index}]`).join('') + 
            `concat=n=${imageFiles.length}:v=1:a=0[outv]`
          ])
          .outputOptions([
            '-map', '[outv]',
            '-c:v', 'libx264',
            '-r', settings.fps.toString(),
            '-pix_fmt', 'yuv420p',
            '-b:v', quality.bitrate,
            '-preset', 'medium'
          ])
          .output(outputPath)
          .on('end', () => resolve())
          .on('error', (err) => reject(err))
          .run()
      })
      
      // Read generated video
      const videoBuffer = await readFile(outputPath)
      
      // Clean up temporary files
      await rm(tempDir, { recursive: true, force: true })
      
      // Return video
      return new NextResponse(videoBuffer, {
        headers: {
          'Content-Type': 'video/mp4',
          'Content-Disposition': 'attachment; filename="video-generat.mp4"'
        }
      })
      
    } catch (error) {
      // Clean up on error
      await rm(tempDir, { recursive: true, force: true })
      throw error
    }
    
  } catch (error) {
    console.error('Eroare la generarea video-ului:', error)
    return NextResponse.json(
      { error: 'Eroare la generarea video-ului' },
      { status: 500 }
    )
  }
}
