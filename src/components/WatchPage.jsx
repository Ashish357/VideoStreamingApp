import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import { useEffect } from 'react';
// import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';
import VideoMetaData from './VideoMetaData';
import CommentSection from './CommentSection';
import { YOUTUBE_VIDEOS_BY_CATEGORY, YOUTUBE_VIDEO_BY_ID_API, YOUTUBE_VIDEO_COMMENTS } from '../utils/constants';
import SearchResultCard from './SearchResultCard';
import useWatchPageData from '../hooks/useWatchPageData';

const WatchPage = () => {
    const [showChat, setShowChat] = useState(false);//it should be true for test
    const [searchParams] = useSearchParams();
    const id = searchParams.get("v"); //for test we need to hard code this
    // "RPpmw6p1bMM"
    // searchParams.get("v");
    if(id==null) {return null};
    const isMenuOpen = useSelector(store => store.app.isMenuOpen);

    // console.log(id);

    const { video, relatedVideos, comments } = useWatchPageData(id);

    const toggleLiveChat = () => {
       // console.log(showChat);
        setShowChat(!showChat);
    }
    // console.log("render watch page");
    return (
        <div className={`flex justify-center flex-row sm:gap-2 sm:mx-4 md:px-8 pt-3 md:pt-6 ${isMenuOpen ? 'fixed' : 'static'}`}>
            <div className='flex-grow-9 rounded-xl max-sm:px-1 sm:pr-2 w-screen md:w-[750px]'>
                <iframe
                data-testid="iframe"
                    width="100%"
                    height="450"
                    src={"https://www.youtube.com/embed/" + id+ "?autoplay=1&mute=0"}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className='rounded-xl'
                >
                </iframe>

                <div className='w-screen md:w-[750px]'>
                    {video &&
                        <VideoMetaData info={video} />
                    }
                    <div className="bg-white rounded p-4 shadow w-[95vw] md:w-[750px]">
                        <h2 className="text-xl font-semibold mb-4">Comments</h2>
                        <div data-testid="comment">
                        {
                            comments &&
                            comments.map((comment) => (
                                <div data-testid="comments" key={comment?.id}>
                                    <CommentSection info={comment} />
                                </div>
                            ))
                        }
                        </div>
                    </div>
                </div>              
            </div>
            <div className='flex-grow-1 w-[400px] hidden sm:block'>
                <div className='flex flex-col gap-3 w-full'>
                    <div className='w-full'>
                        {showChat && <LiveChat />}
                        <div className='w-full flex justify-center rounded-3xl hover:bg-gray-200'>
                            <button data-testid="show-chat" onClick={toggleLiveChat} className='w-full py-2 border rounded-3xl'>{showChat ? "Hide chat" : "Show chat"}</button>
                        </div>
                    </div>
                    <div className='w-full'>
                    { relatedVideos &&
                        relatedVideos.slice(1).map((video) => (
                            <div key={video.id?.videoId} data-testid="related-videos" className='mb-2 h-32 flex'>
                                <Link to={"/watch?v=" + video.id?.videoId}>
                                    <SearchResultCard info={video} />
                                </Link>
                            </div>
                        ))
                    }
                    </div>
                </div>
                {/* <CommentsContainer /> */}
            </div>
        </div>
    )
}

export default WatchPage 