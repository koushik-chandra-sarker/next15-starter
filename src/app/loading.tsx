import React from 'react';
import {Skeleton} from "primereact/skeleton";

const Loading = () => {
    return (
        <div>
            <Skeleton className="mb-2"></Skeleton>
            <Skeleton height="2rem" className="mb-2"></Skeleton>
            <Skeleton height="10rem" className="mb-2"></Skeleton>
        </div>
    );
};

export default Loading;
