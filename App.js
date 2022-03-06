import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  /**Kart resimleri yüklendi */
  { src: "/img/1.png", matched: false },
  { src: "/img/2.png", matched: false },
  { src: "/img/3.png", matched: false },
  { src: "/img/4.png", matched: false },
  { src: "/img/5.png", matched: false },
  { src: "/img/6.png", matched: false },
];

function App() {
  /**Kartlar için boş dizi olan bir state oluşturuldu */
  const [cards, setCards] = useState([]);

  /**Kaç denemede bulunduğunun sayılmasının takibi için 0'dan başlayan bir sayaç stateti oluşturuldu */
  const [turns, setTurns] = useState(0);

  /**Birinci ve ikinci tıklamalar için state */
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  /**Diğer kartları seçemememiz için state */
  const [disabled, setDisabled] = useState(false);

  /**Eğer choiceOne ve choiceTwo eşleşirse => diğer kartlar üstünde işlem yapamama fonksiyonu çalışır. Sonra ilk ve ikinci tercihin kaynakları aynıysa setCards statei güncellenir ve önceki kartlarıda içine alan yeni bir dizi yazar. Bu dizide eğer kartın ve tercihin kaynağı aynıysa cardın matched durumunu true ya çevirir. */
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  /**Kartları karıştırmak için shuffleCards fonksiyonu oluşturuldu.Tüm kartlardan ikişer tane olan shuffledCards dizisi oluşturuldu. Destenin .sort metoduyla karışık bir şekilde karıştırılması sağlandı. .map metoduyla her bir card için random id verildi. Kartların stateti hazırlanmış olan shuffledCars ile güncellendi ve setTurn ile sayaç tekrar sıfırdan başlatıldı. */
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  /**Eğer choiceOne için bir seçim yapılmamışsa null değeri dönecektir. Ve chooseOne ın değeri null değilse karşılaştırma yapabilmek için sıra chooseTwo ya geliyor. Yani; choiceOne null değilse yani true ise setChoiceTwo, null ise yani false ise setChoiceOne stati güncellenecek. */
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []); /**Oyunu otomatik başlatma */

  return (
    <div className="App">
      <h1>Magic Match</h1>

      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            handleChoice={handleChoice}
            key={card.id}
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}

export default App;
