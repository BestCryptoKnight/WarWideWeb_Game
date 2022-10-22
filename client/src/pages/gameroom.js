import React from 'react'
import '../styles/gameroom.css'
import GameBoard from '../components/game/gameboard'

const GameRoom = () => {
    return (
        <div className='gameroom'>
            <div>
                <GameBoard />
            </div>
        </div>
    )
}

export default GameRoom;