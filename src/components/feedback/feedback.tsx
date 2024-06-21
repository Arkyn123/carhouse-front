'use client'

import YouTube from 'react-youtube';
import YouTubePlayer from './ytPlayer';


export default function Feedback() {

    return (
        <div className="bg-slate-200">
            <div className="container my-10 flex flex-col">
                <span className="text-[230%] font-extrabold mb-5 text-slate-600 tracking-wide leading-[50px]">
                    Посмотрите что говорят <br /> о нас клиенты
                </span>
                <div className="flex items-center justify-center gap-10 px-[5%] my-5">

                    <YouTubePlayer src="gOM3sKxSU84" />
                    <YouTubePlayer src="_NqUJccQcts" />
                    <YouTubePlayer src="ECTCSIHSeOE" />
                </div>
            </div>
        </div>)
}