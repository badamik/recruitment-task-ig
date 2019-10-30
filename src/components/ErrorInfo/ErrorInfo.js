import React from 'react';

import './styles.scss';

const ErrorInfo = (props) => {
    const message = props.message;
    return (
        <p className='error-info-message'>Oops, something went wrong: {message}</p>
    )
}

export default ErrorInfo;