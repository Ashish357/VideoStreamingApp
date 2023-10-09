import React, { useEffect, useState } from 'react'
import { YOUTUBE_CHANNEL_DATA_API } from '../utils/constants';
import moment from 'moment'
import numeral from 'numeral';
import { MdThumbUp, MdThumbDown, MdShare } from 'react-icons/md';
// import ShowMoreText from 'react-show-more-text';

const VideoMetaData = ({ info }) => {
    const [channelLogo, setChannelLogo] = useState([]);
    const [subscriberCount,setSubscriberCount] = useState(null);

    const { snippet, statistics } = info;
    const { publishedAt, channelId, channelTitle, title, description } = snippet;
    const { viewCount, likeCount } = statistics;
    
    useEffect(() => {
        getChannels();
    }, [channelId])

    const getChannels = async () => {
        const data = await fetch(YOUTUBE_CHANNEL_DATA_API + channelId)
        const json = await data.json();
        // console.log(json?.items[0])
        setChannelLogo(json?.items[0]?.snippet?.thumbnails);
        setSubscriberCount(json?.items[0]?.statistics?.subscriberCount)
    }

    return (
        <div data-testid="metadata" className='py-2 w-[95vw] md:w-[750px]'>
            <h3 className='text-lg font-semibold'>{title}</h3>
            <div className='flex flex-col md:flex-row justify-between items-center py-2'>
                <div className='flex max-sm:justify-between md:gap-4 cursor-pointer w-full'>
                    <img src={channelLogo.medium?.url} alt="channel-logo"
                        className='w-9 h-9 rounded-full'
                    />
                    <div>
                        <p className='text-base font-semibold'>{channelTitle}</p>
                        <p className='text-sm text-[#606060]'>{subscriberCount ? numeral(subscriberCount).format('0.a'): "100k"} Subscriber</p>
                    </div>
                    <div>
                    <button className='bg-black text-white rounded-3xl px-3 py-2'>Subscribe</button>
                    </div>
                </div>
                <div className='flex md:gap-3 justify-evenly w-full'>
                    <div className='flex bg-gray-200  gap-2 rounded-xl md:px-3 py-2 md:gap-4 cursor-pointer'>
                        <span className='flex bg-gray-200 md:gap-2 border-r rounded-l-xl'><MdThumbUp size={26}/> {numeral(likeCount).format('0.a')}</span>
                        <span className='bg-gray-200 rounded-r-xl'><MdThumbDown size={26} /></span>
                        </div>
                    <div className='bg-gray-200 rounded-3xl px-3 py-2 cursor-pointer'>
                        <span className='flex gap-2'><MdShare size={26} />Share</span>
                    </div>
                    <div className='bg-gray-200 rounded-3xl px-3 py-2 cursor-pointer'>
                        <span>Download</span>
                    </div>
                </div>
            </div>
            <div className='bg-gray-200 rounded-lg py-2 pl-3 pr-5 hover:bg-gray-300 cursor-pointer w-[98%]'>
                <div className='flex gap-2'>
                    <p className='flex items-center'>{numeral(viewCount).format('0.a')} views  </p>
                    <p><span> {moment(publishedAt).fromNow()} </span></p>
                </div>
                {/* <ShowMoreText
                    lines={2}
                    more='more'
                    less='Show Less'
                    anchorClass='showMoreText'
                    expanded={false}
                >
                    {description}
                </ShowMoreText> */}
            </div>
        </div>
    )
}

export default VideoMetaData