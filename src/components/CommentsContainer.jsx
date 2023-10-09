import React from 'react'

const commentsData = [
    {
        name: "Akshay Saini",
        text: "Lorem ipsum dolor sit amet, consectetur adip",
        replies: [],
    },
    {
        name: "Akshay Saini",
        text: "Lorem ipsum dolor sit amet, consectetur adip",
        replies: [
            {
                name: "Akshay Saini",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
                replies: [],
            },
            {
                name: "Akshay Saini",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
                replies: [
                    {
                        name: "Akshay Saini",
                        text: "Lorem ipsum dolor sit amet, consectetur adip",
                        replies: [
                            {
                                name: "Akshay Saini",
                                text: "Lorem ipsum dolor sit amet, consectetur adip",
                                replies: [
                                    {
                                        name: "Akshay Saini",
                                        text: "Lorem ipsum dolor sit amet, consectetur adip",
                                        replies: [
                                            {
                                                name: "Akshay Saini",
                                                text: "Lorem ipsum dolor sit amet, consectetur adip",
                                                replies: [],
                                            },
                                        ],
                                    },
                                    {
                                        name: "Akshay Saini",
                                        text: "Lorem ipsum dolor sit amet, consectetur adip",
                                        replies: [],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "Akshay Saini",
        text: "Lorem ipsum dolor sit amet, consectetur adip",
        replies: [],
    },
    {
        name: "Akshay Saini",
        text: "Lorem ipsum dolor sit amet, consectetur adip",
        replies: [],
    },
    {
        name: "Akshay Saini",
        text: "Lorem ipsum dolor sit amet, consectetur adip",
        replies: [],
    },
    {
        name: "Akshay Saini",
        text: "Lorem ipsum dolor sit amet, consectetur adip",
        replies: [],
    },
];

const Comment = ({ comment }) => {
    const { name, text, replies } = comment;
    return (
        <div className='flex mb-4'>
            <img
                className="w-12 h-12"
                alt="user"
                src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" />
            <div className='pl-4'>
                <p className='font-semibold text-sm'>{name}</p>
                <p className='text-sm'>{text}</p>
            </div>
        </div>
    )
}
const CommentList = ({ comments }) => {
    return (
        <div>
            {
                comments.map((comment, index) => (
                    <div key={index}>
                        <Comment comment={comment} />
                        {/* n-level comment important interview question
                        this is how it is achieved */}
                        <div className='pl-5 border border-l-black ml-5'>
                            <CommentList comments={comment.replies} />
                        </div>
                        
                    </div>
                ))
            }
        </div>
    )
}
const CommentsContainer = () => {
    return (
        <div className='my-6'>
            <h1 className="text-2xl font-bold mb-6">Comments: </h1>
            <CommentList comments={commentsData} />
        </div>
    )
}

export default CommentsContainer