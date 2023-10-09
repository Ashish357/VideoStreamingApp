import { useEffect, useState } from 'react'
import { YOUTUBE_VIDEOS_API, YOUTUBE_VIDEOS_BY_CATEGORY } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addHomeVideos } from '../utils/videoSlice';

const useVideoConatiner = (value) => {
  // const [videos,setVideos] = useState(null); 
  const [nextPageToken, setNextPageToken] = useState("");
  // const [category,setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  // //Memoized this to not make unnecessary calls ... will not work here
  const activeCategory = useSelector(store => store.video.activeCategory)

  useEffect(() => {
    setNextPageToken("");
    if (value == "All") {
        getVideos();
    }
    else {
      getVideosByCategory();
    }
  }, [value])

  const getVideos = async () => {
    setLoading(true)
    const data = await fetch(`${YOUTUBE_VIDEOS_API}&pageToken=${nextPageToken}`);
    const json = await data.json();
    // console.log(json.items)
    setNextPageToken(json?.nextPageToken);
    // if(category===value){
    // setVideos([...videos, ...json?.items])
    // }
    // else{
    // console.log(value);
    // setVideos(json?.items);
    // setCategory(value);
    dispatch(addHomeVideos({
      videos: json?.items,
      category: value,
    }))
    // }
    setLoading(false)
  }

  const getVideosByCategory = async () => {
    setLoading(true);
    const data = await fetch(YOUTUBE_VIDEOS_BY_CATEGORY + value);
    const json = await data.json();
    // console.log(json.items);
    // setVideos(json?.items)
    // setCategory(value);
    setLoading(false);
    dispatch(addHomeVideos({
      videos: json?.items,
      category: value,
    }));
    // if(category===value){
    // setVideos([...videos, ...json?.items])
    // }
    // else{
    //   setVideos(json?.items);
    //   setCategory(value);
    // }
  }

  const handleInfiniteScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight) {
      if (value == "All") {
        getVideos();
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, [nextPageToken])

  return { loading };
}

export default useVideoConatiner