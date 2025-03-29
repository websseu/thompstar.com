import Image from 'next/image'
import React from 'react'
import { MusicData } from '@/lib/types'

export default function MusicListRow({ koreaData }: { koreaData: MusicData }) {
  return (
    <div>
      {Object.entries(koreaData).map(([platform, songs]) => {
        const top15 = songs.slice(0, 15)

        const grouped = Array.from({ length: 3 }, (_, i) =>
          top15.slice(i * 5, i * 5 + 5)
        )

        return (
          <div key={platform} className='music__box'>
            <div className='title'>
              <h2>{platform} Top100</h2>
            </div>
            <div className='content'>
              {grouped.map((group, groupIdx) => (
                <ul key={groupIdx}>
                  {group.map((item, index) => (
                    <li key={index} className='music__list'>
                      <div className='ranking'>{groupIdx * 5 + index + 1}</div>
                      <div className='image'>
                        <Image
                          src={item.image}
                          width={50}
                          height={50}
                          alt={item.title}
                        />
                      </div>
                      <div className='title'>
                        <p>{item.title}</p>
                        <p>{item.artist}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
