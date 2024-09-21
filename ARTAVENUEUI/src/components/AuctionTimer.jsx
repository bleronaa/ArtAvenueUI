import React, { useState, useRef, useEffect } from "react";

const AuctionTimer = ({ endTime }) => {
    const [timer, setTimer] = useState("00:00:00");
    const Ref = useRef(null);

    const getTimeRemaining = (endtime) => {
        const now = new Date();
        const total = Date.parse(endtime) - now.getTime();
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        
        return {
            total,
            days,
            hours,
            minutes,
            seconds,
        };
    };

    const startTimer = (endtime) => {
        const { total, days, hours, minutes, seconds } = getTimeRemaining(endtime);
        if (total >= 0) {
            setTimer(
                (days > 0 ? days + "d " : "") +
                (hours > 9 ? hours : "0" + hours) +
                ":" +
                (minutes > 9 ? minutes : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        } else {
            setTimer("Expired");
            if (Ref.current) clearInterval(Ref.current);
        }
    };

    const clearTimer = (endtime) => {
        setTimer("Loading...");
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(endtime);
        }, 1000);
        Ref.current = id;
    };

    useEffect(() => {
        clearTimer(endTime);
        return () => {
            if (Ref.current) clearInterval(Ref.current);
        };
    }, [endTime]);

    return <span>{timer}</span>;
};

export default AuctionTimer;
