import { useEffect, useState } from 'react';
import { YOUTUBE_VIDEOS_BY_CATEGORY, YOUTUBE_VIDEO_BY_ID_API, YOUTUBE_VIDEO_COMMENTS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';

const useWatchPageData = (id) => {
  // console.log(id);
  const [relatedVideos, setRelatedVideos] = useState(null);
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
  }, [])

  useEffect(() => {
    getVideoDetails();
    getVideoComments();
}, [id])

useEffect(() => {
    if (video != null) {
        getRelatedVideos();
    }
}, [video])

const getRelatedVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_BY_CATEGORY + video?.snippet?.title);
    const json = await data.json();
    // console.log(json.items);
    setRelatedVideos(json?.items)
}

const getVideoDetails = async () => {
    const data = await fetch(YOUTUBE_VIDEO_BY_ID_API + id);
    const json1 = await data.json();
    setVideo(json1?.items[0])
    // console.log(json1?.items[0]);
    // setViews(json?.items[0]?.statistics?.viewCount);
}

const getVideoComments = async () => {
    const data = await fetch(YOUTUBE_VIDEO_COMMENTS + id);
    const json2 = await data.json();
    // console.log(json2);
    setComments(json2?.items)
}


  return {video,relatedVideos,comments}
}

export default useWatchPageData