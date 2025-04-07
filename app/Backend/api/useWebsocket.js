import { useEffect, useState } from 'react';

const useWebSocket = (url) => {
    const [data, setData] = useState(null);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // const socket = new WebSocket('ws://localhost:5050');
        const socket = new WebSocket(url);
    
        

        socket.onopen = () => console.log('✅ Connected to WebSocket');
        socket.onmessage = (event) => {
            // let t = JSON.parse(event.data)
            // console.log('📩 Received:',event.data);

            const parsedData = JSON.parse(event.data);
            setData(parsedData.ltp);
        };
        socket.onclose = () => {
            console.log('❌ WebSocket disconnected');
            // Optional: Attempt to reconnect
            setTimeout(() => setWs(new WebSocket(url)), 3000);
        };
        // socket.onerror = (err) => console.error('⚠️ WebSocket error:', err);

        setWs(socket);

        return () => socket.close();
    }, [url]);


    // const socket = new WebSocket(url);
    
        

    //     socket.onopen = () => console.log('✅ Connected to WebSocket');
    //     socket.onmessage = (event) => {
    //         // let t = JSON.parse(event.data)
    //         // console.log('📩 Received:',event.data);

    //         const parsedData = JSON.parse(event.data);
    //         setData(parsedData.ltp);
    //     };
    //     socket.onclose = () => {
    //         console.log('❌ WebSocket disconnected');
    //         // Optional: Attempt to reconnect
    //         setTimeout(() => setWs(new WebSocket(url)), 3000);
    //     };
    //     socket.onerror = (err) => console.error('⚠️ WebSocket error:', err);

    //     setWs(socket);

    console.log(data)

    return data;
};

export default useWebSocket;




// import { useEffect, useState } from 'react';

// const useWebSocket = (url) => {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         const ws = new WebSocket('ws://localhost:5000');

//         ws.onopen = () => console.log('Connected to WebSocket');
//         ws.onmessage = (event) => setData(event);
//         ws.onclose = () => console.log('WebSocket disconnected');

//         return () => ws.close();
//     }, []);

//     console.log(data)

//     return data;
// };

// export default useWebSocket;
