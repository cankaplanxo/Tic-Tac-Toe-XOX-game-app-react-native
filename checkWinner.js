function checkWinner(board) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const winningSet = lines.find(([a, b, c]) => {
        return board[a] !== null && board[a] === board[b] && board[a] === board[c];
    });

    // Eğer bir kazanan set bulunursa, kazanan seti döndür, bulunmazsa undefined döndür
    return winningSet;
}

export default checkWinner;
