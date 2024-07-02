import React, { useEffect, useState } from 'react';
import { getTestMessage } from './testUtil';

function TestPage() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchAPI = async () => {
            let response = await getTestMessage();
            if (response.status === 200) {
                setMessage(response.body.data);
            }
        }

        fetchAPI();
    }, []);
    
    return (<>
        <h1>{message}</h1>
    </>);
}

export default TestPage;