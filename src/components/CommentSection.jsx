import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaReply, FaChevronUp, FaChevronDown } from 'react-icons/fa'; // React Font Icons
import moment from 'moment';

// const dummyComments = [
//   {
//     id: 1,
//     username: 'User1',
//     timestamp: '2 hours ago',
//     text: 'This is a sample comment.',
//     likes: 10,
//     dislikes: 2,
//   },
//   {
//     id: 2,
//     username: 'User2',
//     timestamp: '3 hours ago',
//     text: 'Another comment here.',
//     likes: 8,
//     dislikes: 1,
//   },
//   // Add more dummy comments here...
// ];

const Comment = ({ snippet }) => {
  const { authorDisplayName, authorProfileImageUrl, likeCount, textOriginal, publishedAt } = snippet
  return (
    <div className="">
      <div className="flex space-x-2 items-center">
        <img
          src={authorProfileImageUrl}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className='space-x-1 cursor-pointer'><span className="text-sm font-semibold">{authorDisplayName}</span><span className="text-gray-600 text-sm">{moment(publishedAt).fromNow()}</span></p>
          <p className="text-base">{textOriginal}</p>
        </div>
      </div>

      {/* Like, Dislike, Reply */}
      <div className="flex mt-2 space-x-4 text-gray-600 pl-12">
        <div className="flex items-center space-x-1 p-1 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer">
          <FaThumbsUp />
          <span>{likeCount}</span>
        </div>
        <div className="flex items-center p-1 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer">
          <FaThumbsDown />
        </div>
        <div className="flex items-center space-x-1">
          <FaReply />
          <span>Reply</span>
        </div>
      </div>
    </div>
  )
}
const CommentSection = ({ info }) => {
  // console.log(info)
  const { snippet } = info?.snippet?.topLevelComment;
  const [isOpen, setIsOpen] = useState(false); // State to manage accordion open/close
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Comment Section */}
      <div onClick={toggleAccordion} className="cursor-pointer flex flex-col mb-4">
        <Comment snippet={snippet} />
          <div className='pl-12'>
        {info?.replies && info?.replies?.comments && (
          isOpen ? <div className='flex space-x-1 items-center text-blue-700 text-sm'><FaChevronUp /><span>{info?.snippet?.totalReplyCount} replies</span></div> : <div className='flex space-x-1 items-center text-blue-700 text-sm'><FaChevronDown /><span>{info?.snippet?.totalReplyCount} replies</span></div>
          )}
          </div>
      </div>
      {/* Display reply comments if they exist */}
      {isOpen && info?.replies && info?.replies?.comments && (
        <div className="ml-8 border-l-2 pl-4">
          {info?.replies?.comments.map((reply) => (
            <Comment key={reply.id} snippet={reply.snippet} />
            //  console.log(reply.snippet)
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentSection