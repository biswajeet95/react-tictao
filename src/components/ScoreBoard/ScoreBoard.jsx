import React from 'react'
import './score.css';

const ScoreBoard = ({ xScore, oScore, tie, playing }) => {
    return (
        <div className='scoreboard'>
            <span className={`x-score ${playing == true ? "xplay" : ""}`}>X - {xScore}</span>
            <span className={`o-score ${playing == false ? "oplay" : ""}`}>O - {oScore}</span>
            <span className='tie'>O - {tie}</span>
        </div>


    )
}

export default ScoreBoard