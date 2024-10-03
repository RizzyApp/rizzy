import React, {useState} from 'react';
import TinderCard from 'react-tinder-card'

const db = [
    {
        name: 'Mr.Bean',
        url: './image/bean-1.jpg'
    },
    {
        name: 'Mr.Bean',
        url: './image/bean-2.jpg'
    },
    {
        name: 'Mr.Bean',
        url: './image/bean-3.jpg'
    },
    {
        name: 'Mr.Bean',
        url: './image/bean-4.jpg'
    },
]


const ReactLibrarySwipeCard = () => {
    const characters = db
    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    return (
        <div>
            <div className='cardContainer'>
                {characters.map((character) =>
                    <TinderCard className='absolute'
                                key={character.name}
                                onSwipe={(dir) => swiped(dir, character.name)}
                                onCardLeftScreen={() => outOfFrame(character.name)}>
                        <div style={{backgroundImage: 'url(' + character.url + ')'}}
                             className='relative bg-white w-[80vw] max-w-[260px] h-[300px] shadow-[0_0_60px_rgba(0,0,0,0.30)] rounded-[20px] bg-cover bg-center'>
                            <h3>{character.name}</h3>
                        </div>
                    </TinderCard>
                )}
            </div>
            {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'/>}
        </div>
    )
}

export default ReactLibrarySwipeCard;