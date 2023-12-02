import Card from "./Card";


const Board = ({cards, onCardClick}) => {
  return (
    <div className="board">
        {cards.map((card) => (
            <Card key={card.id} card={card} onClick={onCardClick}>
                <img src={card.img} />
            </Card>
        ))}
    </div>
  );
};

export default Board