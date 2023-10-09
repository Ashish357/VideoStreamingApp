import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/chatSlice';
import { generateRandomName, makeRandomMessage } from '../utils/helper';
import ChatMessage from './ChatMessage';

const LiveChat = () => {
    const [liveMessage, setLiveMessage] = useState("");
    const dispatch = useDispatch();
    const chatMessages = useSelector(store => store.chat.messages)
    useEffect(() => {
        //Api Polling (Also websocket is used for continuous messages like zerodha or whatsapp)
        const i = setInterval(() => {
            dispatch(addMessage({
                name: generateRandomName(),
                message: makeRandomMessage(20) + "🚀"
            }))
        }, 1000);

        return () => clearInterval(i);
    }, [])
    // console.log("livechat");
    return (
        <>
            <div className='border rounded-t-lg w-96'>
                <h1 className='p-4'>Top Chat</h1>
            </div>
            <div  data-testid="live-chats" className='border w-96 h-[400px] overflow-scroll flex flex-col-reverse'>
                {/* { console.log(chatMessages)} */}
                {
                    chatMessages.map((c, i) => (
                        <ChatMessage key={i} name={c.name} message={c.message} />
                    ))
                }
            </div>
            <div data-testid="live-chat-form" className='border w-96 p-4 text-center'>
                <form onSubmit={(e) => {
                    e.preventDefault();

                    dispatch(
                        addMessage({
                        name: "Ashish Saha",
                        message: liveMessage,
                    }));
                    setLiveMessage("");
                }}
                >
                    <input data-testid="live-chat-input" className='outline-none border-b-2 border-gray-400 w-80 ml-7 block' type="text" value={liveMessage} onChange={(e) => setLiveMessage(e.target.value)} />
                    <button data-testid="live-chat-btn" className='p-1.5 bg-green-500 rounded-md mt-2'>Send</button>
                </form>
            </div>
        </>
    )
}

export default LiveChat