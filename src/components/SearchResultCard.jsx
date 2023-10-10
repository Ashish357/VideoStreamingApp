import React, { useEffect, useState } from 'react'
import { YOUTUBE_CHANNEL_DATA_API, YOUTUBE_VIDEO_BY_ID_API } from '../utils/constants';
import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSearchParams } from 'react-router-dom';

const SearchResultCard = ({ info }) => {
  // console.log(info)
  const [channelLogo, setChannelLogo] = useState([]);
  const [views, setViews] = useState(null);
  const [duration,setDuration] = useState(null);
  const [isLive,setIsLive] = useState("none")
  const [imageLoaded,setImageLoaded] = useState(false);

  const { id, snippet } = info;
  const { publishedAt, channelId, channelTitle, title, thumbnails, description } = snippet;
  const [searchParams] = useSearchParams();
  const checkId = searchParams.get("v");

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds*1000).format("mm:ss")

  const _videoId = id?.videoId;
  // console.log(_videoId)

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
    setIsLive(json?.items[0]?.snippet?.liveBroadcastContent);
  }

  const getChannels = async () => {
    const data = await fetch(YOUTUBE_CHANNEL_DATA_API + channelId)
    const json = await data.json();
    // console.log(json?.items[0])
    setChannelLogo(json?.items[0]?.snippet?.thumbnails);
  }
  return (
    <div className='w-full my-2 flex max-sm:flex-col'>
      <div className={`rounded-xl relative ${!imageLoaded && `bg-gray-200 ${checkId ? 'w-44 h-28' : 'w-full sm:w-80 h-40'}`}`}>
      <LazyLoadImage src={thumbnails?.medium?.url} alt="thumbnail"
        className={`rounded-xl hover:rounded-none ${checkId ? 'w-44 h-28' : 'w-full h-full'}`}
        afterLoad={() => setImageLoaded(true)}
        />
        {isLive==="none" ? <span className={`absolute ${checkId ? 'bottom-6' : 'bottom-2'} right-2 opacity-80 rounded-md pl-1 w-11 text-white bg-[#080808ec]`}>{_duration}</span> :
        <span className={`absolute ${checkId ? 'bottom-6' : 'bottom-3'} right-2 opacity-90 rounded-md pl-2 w-11 text-white bg-red-600`}>Live</span>
        }
        </div>
      <div className={`flex flex-row m-0 sm:ml-4 max-sm:mt-2 ${checkId ? 'w-52 h-32' : 'w-full'}`}>
        <ul className='overflow-x-hidden pr-6'>
          <li className={`${checkId ? 'text-sm font-bold' : 'text-xl font-normal'} mt-3 line-clamp-2 text-[#0f0f0f]`}>{title}</li>
          <li className='text-[#606060] text-sm'>
            <div className='flex gap-2'>
              <p className='flex items-center'>{numeral(views).format('0.a')} Views • </p>
              <p><span> {moment(publishedAt).fromNow()} </span></p>
            </div>
          </li>
          <li className='flex items-center gap-2 text-[#606060] text-sm py-1 sm:py-3'>
            <LazyLoadImage src={channelLogo.medium?.url} alt="channel-logo"
              className='w-5 h-5 rounded-full'
            />
            <p>{channelTitle}</p>
          </li>
          {!checkId && <li className='hidden sm:block text-[#606060] text-sm line-clamp-2'>{description}</li>}
        </ul>
      </div>
    </div>
  )
}

export default SearchResultCard