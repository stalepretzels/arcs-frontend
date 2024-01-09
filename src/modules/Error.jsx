import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ErrorComp() {
    let params = useParams();
    function getMessage() {
        switch (params.type) {
            case 'maintenance':
                return "Down for maintenance. Sorry!"
                break;
        
            default:
                break;
        }
    }

    function getCode() {
        switch (params.type) {
            case 'maintenance':
                return "503"
                break;
        
            default:
                break;
        }
    }

    return <>
    <h1>Pong!</h1>
    <p>We can't find this page. Maybe report a bug?</p>

    <p>Code: </p><pre>503 Service Unavailable</pre>
    <p>Error: </p><pre>Down for maintenance. Duration unknown.</pre>
    </>    
}

export {ErrorComp};