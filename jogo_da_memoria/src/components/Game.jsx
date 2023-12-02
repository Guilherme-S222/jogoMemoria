import { useState } from 'react';
import Board from './Board';

import imgJs from '../img/js.png';
import imgReact from '../img/react.svg';
import imgNode from '../img/node.png';
import imgMySql from '../img/mysql.png';
import imgJava from '../img/java.png';
import imgC from '../img/c.png';
import imgPython from '../img/python.png';
import imgPhp from '../img/php.png';


const shuffleArray = (array) => {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const cardImages = {
    "JS": imgJs,
    "REACT": imgReact,
    "NODE": imgNode,
    "MYSQL": imgMySql,
    "JAVA": imgJava,
    "C#": imgC,
    "PYTHON": imgPython,
    "PHP": imgPhp
};

const generateCards = () => {

    const values = ["JS", "REACT", "NODE", "MYSQL", "JAVA", "C#", "PYTHON", "PHP"];

    const cards = values.map((value) => ({
        value,
        image: cardImages[value],
        isFlipped: false,
        
    }));

    const duplicatedCards = cards.concat([...cards]).map((card, index) => ({ ...card, id: index }));

    return shuffleArray(duplicatedCards);

};

const Game = () => {
    const [cards, setCards] = useState(generateCards());
    const [flippedCards, setFlippedCards] = useState([]);
    const playerChances = 20;
    const [changes, setChanges] = useState(playerChances);

    const result = cards.filter((card) => card.isFlipped).length;

    const handleCardClick = (clickedCard) => {

        if (changes === 0) return;
        
        if (flippedCards.length === 2) return;

        const newCards = cards.map((card) => {
            return card.id === clickedCard.id ? {...card, isFlipped: true} : card;
        });

        setCards(newCards);

        setFlippedCards([...flippedCards, clickedCard]);

        if (flippedCards.length === 1){
            setTimeout(() => {
                const [firstCard] = flippedCards;

                if (firstCard.value !== clickedCard.value){
                    const resetCards = cards.map((card) => {
                        return card.id === firstCard.id || card.id === clickedCard.id ? {...card, isFlipped: false}: card;
                    });

                    setCards(resetCards)
                    setChanges((prev) => prev -1);
                };
                setFlippedCards([]);
            }, 600);
        }
    };

    const resetGame = () => {
        setChanges(playerChances);
        setFlippedCards([]);
        setCards(generateCards());
    }

  return (
    <div className="game">
        <Board cards={cards} onCardClick={handleCardClick}/>
        {changes === 0 ? (
        <p>Suas tentavias acabaram</p>
        ) : result === cards.length ? (<h2>Parabéns, você ganhou!</h2>) : (<p>Você possui {changes} tentativa(s)</p>
        )}
        <button className="btn" onClick={resetGame}>Reiniciar o jogo</button>
    </div>
  );
};

export default Game