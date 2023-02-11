import React from 'react'
import { Skeleton, Card } from 'antd';

const LoadingCard = () => {
    return (
        <Card>
            <Skeleton active />
        </Card>
    )
}

export default LoadingCard
