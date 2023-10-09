import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

const Error = () => {
    const err = useRouteError()
    return (
        <div className='w-full flex flex-col text-center absolute top-[15%] text-3xl font-bold'>
            <h1>Ooops!!</h1>
            <h2>Something went wrong!!</h2>
            <h2>{err.status + " : " + err.statusText}</h2>
            <h2>Go back to Home page</h2>
            <Link to='/'>
                <button className='underline'>Click Here</button>
            </Link>
        </div>
    )
}

export default Error