'use client'

import React from 'react'
import { useMusic } from '@/context/music-context'
import { Button } from '../ui/button'
import { FolderPlus } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from 'sonner'

interface PlayAddProps {
  chartData: {
    youtubeID?: string
    title: string
    artist: string
  }[]
}

export default function PlayListAdd({ chartData }: PlayAddProps) {
  const { addToBottomList } = useMusic()

  const handleAddAll = () => {
    const validSongs = chartData.filter((song) => song.youtubeID)

    validSongs.forEach((song) =>
      addToBottomList({
        youtubeId: song.youtubeID!,
        title: song.title,
        artist: song.artist,
      })
    )

    toast(`🎵 ${validSongs.length}곡이 재생목록에 추가되었습니다.`)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleAddAll} variant='outline' size='cal'>
            <FolderPlus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>재생목록에 추가하기</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
