import React, { useEffect, useState } from 'react'

export default function Clock(){
    const [date, setDate] = useState(new Date())
    
    //setting up the clock and the weekday
    useEffect(() => {
        const timer = setInterval(() => tick(), 1000)
        return () => clearInterval(timer)
    })

    const tick = () => setDate(new Date())
    const time = date.toLocaleTimeString()

    const day = date.getDay()
    const weekDay = new Array(7);
        weekDay[0] = "Sunday";
        weekDay[1] = "Monday";
        weekDay[2] = "Tuesday";
        weekDay[3] = "Wednesday";
        weekDay[4] = "Thursday";
        weekDay[5] = "Friday";
        weekDay[6] = "Saturday";

    return (
        <div className="Clock">
            <h4 className="weekDay">{weekDay[day]}</h4>
            <h4 className="time">{time}</h4>
        </div>
    )
}