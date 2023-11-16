//herşeyi silip importumu yazıp bir fonksiyon oluşturuyorum sonra export ediyorum
//kutular için başka bir fonksiyon oluşturdum box diye
//npm install react-native-flex-layout diye bir kütüphane kullandım kutular için
//ilk önce hangi kişi oynayacak onun için usestate oluşturdum

import React, { useState } from "react";
import { Text, TouchableOpacity, Button } from "react-native";
import { VStack, HStack, Flex } from "react-native-flex-layout";
import checkWinner from "./checkWinner";

//box componentimizi oluşturduk
function Box({ value, onPress, disabled, highlighted }) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Flex w={124} h={124} center style={{ backgroundColor: highlighted ? "lightgreen" : "lightblue" }}>
        <Text style={{ fontSize: 50 }}>{value}</Text>
      </Flex>
    </TouchableOpacity>
  );
}

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [highlighted, setHighlighted] = useState([]);
  const [winner, setWinner] = useState(null);

  const handlePress = (index) => {
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winnerLine = checkWinner(newBoard);

    if (winnerLine) {
      setHighlighted(winnerLine);
      setWinner(currentPlayer);
      alert(`PLAYER ${currentPlayer} WON !`);
    } else if (newBoard.every((box) => box !== null)) {
      // Oyun berabere bitti
      setWinner("Draw");
      alert("It's a Draw!");
    } else {
      setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    }
  };

  const handleReset = () => {
    setCurrentPlayer("X");
    setBoard(Array(9).fill(null));
    setHighlighted([]);
    setWinner(null);
  };

  const getBox = (index) => (
    <Box
      value={board[index]}
      onPress={() => handlePress(index)}
      highlighted={highlighted.includes(index)}
      disabled={winner || board[index]}
    />
  );

  return (
    <VStack fill center spacing={4}>
      <Text style={{ fontSize: 36 }}>{currentPlayer} To Play</Text>
      <HStack spacing={4} shouldWrapChildren>
        {getBox(0)}
        {getBox(1)}
        {getBox(2)}
      </HStack>
      <HStack spacing={4} shouldWrapChildren>
        {getBox(3)}
        {getBox(4)}
        {getBox(5)}
      </HStack>
      <HStack spacing={4} shouldWrapChildren>
        {getBox(6)}
        {getBox(7)}
        {getBox(8)}
      </HStack>
      <Button title="Reset" onPress={handleReset} />
    </VStack>
  );
}

export default App;
