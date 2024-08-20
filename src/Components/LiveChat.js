import React, { useEffect, useState } from 'react';
import LiveChatMessage from './LiveChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { updateChat } from '../utils/chatSlice';

const LiveChat = () => {
    const dispatch = useDispatch();
    const chatFlows = useSelector((state) => state.chat.messages);

    const [dataval, setDataval] = useState('');
    const [useName, setUseName] = useState("")

    useEffect(() => {
        const fetchRandomWord = async () => {
            try {
                const response = await fetch('https://random-word-api.herokuapp.com/word');
                if (!response.ok) {
                    throw new Error('Failed to fetch random word');
                }
                const data = await response.json();
             
                setDataval(data[0]);
                

                 // Assuming API returns an array of words, take the first one
            } catch (error) {
                console.error('Error fetching random word:', error);
            }
        };
        const fetchRandomName = async () => {
            try {
                const response = await fetch('https://randomuser.me/api/');
                if (!response.ok) {
                    throw new Error('Failed to fetch random word');
                }
                const data = await response.json();
               
                setUseName(data.results[0].name);
               

                 // Assuming API returns an array of words, take the first one
            } catch (error) {
                console.error('Error fetching random word:', error);
            }
        };

        const interval = setInterval(() => {
            fetchRandomWord();
            fetchRandomName();
           dataval&& dispatch(
                updateChat({
                    name: useName.first+useName.last,
                    message: dataval+"✅👌"
                })
            );
        }, 1000);

         // Initial fetch
        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [dataval, dispatch]);

    return (
        <div className='h-5/6 border-slate-200 border-2 w-full rounded-lg overflow-auto flex flex-col-reverse'>
            {chatFlows.map((chat, index) => (
                <LiveChatMessage key={index} value={chat} />
            ))}
        </div>
    );
};

export default LiveChat;
