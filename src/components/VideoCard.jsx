import React, { useEffect, useState } from 'react'
import { YOUTUBE_CHANNEL_DATA_API, YOUTUBE_VIDEO_BY_ID_API } from '../utils/constants';
import moment from 'moment'
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const VideoCard = ({ info }) => {
  const [channelLogo, setChannelLogo] = useState([]);
  const [views, setViews] = useState(null);
  const [imageLoaded,setImageLoaded] = useState(false);
  const [duration,setDuration] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds*1000).format("mm:ss")

  const { id, snippet } = info;
  const { publishedAt, channelId, channelTitle, title, thumbnails } = snippet;

  let _videoId;
  if (id?.videoId === undefined) {
    _videoId = id;
  }
  else {
    _videoId = id?.videoId;
  }
  // id?.videoId;
  // console.log(thumbnails)
  // console.log(views)

  useEffect(() => {
    getVideoDetails();
  }, [_videoId])

  useEffect(() => {
    getChannels();
  }, [channelId])

  const getVideoDetails = async () => {
    const data = await fetch(YOUTUBE_VIDEO_BY_ID_API + _videoId);
    const json = await data.json();
    // console.log(json?.items[0]);
    setDuration(json?.items[0].contentDetails?.duration);
    setViews(json?.items[0]?.statistics?.viewCount);
  }

  const getChannels = async () => {
    const data = await fetch(YOUTUBE_CHANNEL_DATA_API + channelId)
    const json = await data.json();
    // console.log(json?.items[0])
    setChannelLogo(json?.items[0]?.snippet?.thumbnails);
  }
  return (
    <div className='w-full max-sm: my-2 flex flex-col group rounded-xl'>
       <div
        className={`rounded-xl group-hover:rounded-none relative ${!imageLoaded && 'bg-gray-200 h-48 md:h-40' }`}
      >
        <LazyLoadImage
          src={thumbnails?.medium?.url}
          alt="thumbnail"
          className='rounded-xl group-hover:rounded-none w-full'
          afterLoad={() => setImageLoaded(true)}
        />
        <span className='absolute bottom-2 right-2 opacity-80 rounded-md pl-1 w-11 text-white bg-[#080808ec]'>{_duration}</span>
      </div>
      <div className='flex flex-row mt-3 w-full'>
        <LazyLoadImage src={channelLogo?.default?.url} //alt="channel-logo"
          className='w-10 h-9 rounded-full'
        />
        <ul className='overflow-x-hidden pr-6 ml-3'>
          <li className="font-semibold  mb-1 line-clamp-2 text-[#0f0f0f]">{title}</li>
          <li className='text-[#606060] text-sm'>
            <p>{channelTitle}</p>
            <div className='flex gap-2'>
              <p className='flex items-center'>{numeral(views).format('0.a') == 0 ? "768K" : numeral(views).format('0.a')} Views • </p>
              <p><span> {moment(publishedAt).fromNow()} </span></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default VideoCard