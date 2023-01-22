import React from 'react'
import withAuth from './withAuth';

const Home = () => {
    return (
        <div>HOME</div>
    )
}

export default withAuth(Home)