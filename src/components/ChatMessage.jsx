import React from 'react'

const ChatMessage = ({name,message}) => {
  return (
    <div data-testid="chats" className='px-4 flex pb-2'>
        <img
        className="h-6"
        alt="user"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
      />
      <span className='text-sm font-medium text-gray-500 px-2'>{name}</span>
      <span className='text-sm'>{message}</span>
    </div>
  )
}

export default ChatMessage