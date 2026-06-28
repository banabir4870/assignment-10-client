import { Spinner } from '@heroui/react';
import React from 'react';

const LoadingPage = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <Spinner size="xl" />
        </div>
    );
};

export default LoadingPage;