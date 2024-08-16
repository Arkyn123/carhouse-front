'use client'

import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { Skeleton } from '../ui/skeleton';

type Props = {
    src: string
}

export default function YouTubePlayer({ src }: Props) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    if (isLoading) return (
        <div className="rounded-xl overflow-hidden">
            <Skeleton className="w-[350px] h-[500px] bg-slate-400" />
        </div>
    )

    return (
        <div className="rounded-xl overflow-hidden">
            {isLoading ?
                <Skeleton className="w-[350px] h-[500px] bg-slate-400" /> :
                <YouTube videoId={src} opts={{ height: '500', width: '350', playerVars: { autoplay: 0, controls: 0 } }} />}
        </div>

    )
}