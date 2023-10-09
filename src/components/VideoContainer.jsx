import React from 'react'
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import useVideoConatiner from '../hooks/useVideoConatiner';
import Shimmer from './Shimmer';
import { useSelector } from 'react-redux';

const VideoContainer = ({ category }) => {
  let {loading} = useVideoConatiner(category);
  const videos = useSelector(store=>store.video.homeVideos);
  // console.log(videos);
  if(loading) return <Shimmer />

  return (
  <div data-testid="home-page-videos" className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5'>
      {
        videos && videos.filter((video)=>video.id?.kind!=="youtube#playlist").map((video) => (
          <Link key={video.id?.videoId===undefined ? video?.id : (video?.id.videoId || video?.id.playlistId)} to={"/watch?v=" + (video?.id?.videoId===undefined ? video?.id : (video?.id?.videoId || video?.id?.playlistId))}>
            <VideoCard info={video} />
          </Link>
        ))
      }
    </div>
  )
}

export default VideoContainer

// playlistId
