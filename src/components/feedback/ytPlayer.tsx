'use client'

import YouTube from 'react-youtube';

type Props = {
    src: string
}

export default function YouTubePlayer({ src }: Props) {

    return (
        <div className="rounded-xl overflow-hidden">
            <YouTube videoId={src} opts={{ height: '500', width: '350', playerVars: { autoplay: 0, controls: 0 } }} />
        </div>)
}