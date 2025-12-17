
import React, { useState, useEffect, useCallback } from 'react';

// --- Minesweeper Implementation ---
const Minesweeper: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const size = 10;
    const minesCount = 12;
    const [grid, setGrid] = useState<{ value: string; revealed: boolean; flagged: boolean }[][]>([]);
    const [gameOver, setGameOver] = useState<'won' | 'lost' | null>(null);

    const initBoard = useCallback(() => {
        const newGrid = Array(size).fill(null).map(() => Array(size).fill(null).map(() => ({ value: '0', revealed: false, flagged: false })));
        
        // Place mines
        let placed = 0;
        while (placed < minesCount) {
            const r = Math.floor(Math.random() * size);
            const c = Math.floor(Math.random() * size);
            if (newGrid[r][c].value !== 'M') {
                newGrid[r][c].value = 'M';
                placed++;
            }
        }

        // Calculate numbers
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (newGrid[r][c].value === 'M') continue;
                let count = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (newGrid[r + i]?.[c + j]?.value === 'M') count++;
                    }
                }
                newGrid[r][c].value = count.toString();
            }
        }
        setGrid(newGrid);
        setGameOver(null);
    }, []);

    useEffect(() => { initBoard(); }, [initBoard]);

    const reveal = (r: number, c: number) => {
        if (gameOver || grid[r][c].revealed || grid[r][c].flagged) return;
        
        const newGrid = [...grid.map(row => [...row])];
        if (newGrid[r][c].value === 'M') {
            newGrid[r][c].revealed = true;
            setGrid(newGrid);
            setGameOver('lost');
            return;
        }

        const revealRecursive = (row: number, col: number) => {
            if (row < 0 || row >= size || col < 0 || col >= size || newGrid[row][col].revealed || newGrid[row][col].flagged) return;
            newGrid[row][col].revealed = true;
            if (newGrid[row][col].value === '0') {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        revealRecursive(row + i, col + j);
                    }
                }
            }
        };

        revealRecursive(r, c);
        
        // Check win
        let unrevealedSafe = 0;
        newGrid.forEach(row => row.forEach(cell => {
            if (!cell.revealed && cell.value !== 'M') unrevealedSafe++;
        }));

        setGrid(newGrid);
        if (unrevealedSafe === 0) setGameOver('won');
    };

    const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
        e.preventDefault();
        if (gameOver || grid[r][c].revealed) return;
        const newGrid = [...grid.map(row => [...row])];
        newGrid[r][c].flagged = !newGrid[r][c].flagged;
        setGrid(newGrid);
    };

    return (
        <div className="flex flex-col items-center bg-[#c0c0c0] p-4 h-full overflow-auto border-4 border-white border-b-slate-600 border-r-slate-600">
            <div className="w-full flex justify-between mb-4 px-2">
                <button onClick={onBack} className="seven-button px-4 py-1 text-xs">← Back</button>
                <div className="flex space-x-4">
                    <div className="bg-black text-red-600 font-mono px-2 text-xl border-2 border-slate-500 shadow-inner">
                        {minesCount - grid.reduce((acc, row) => acc + row.filter(c => c.flagged).length, 0)}
                    </div>
                    <button onClick={initBoard} className="w-10 h-10 seven-button flex items-center justify-center text-xl">
                        {gameOver === 'lost' ? '😵' : gameOver === 'won' ? '😎' : '🙂'}
                    </button>
                </div>
            </div>

            <div className="border-4 border-slate-600 border-b-white border-r-white p-1 bg-slate-400 inline-block">
                {grid.map((row, r) => (
                    <div key={r} className="flex">
                        {row.map((cell, c) => (
                            <div
                                key={c}
                                onClick={() => reveal(r, c)}
                                onContextMenu={(e) => toggleFlag(e, r, c)}
                                className={`w-8 h-8 flex items-center justify-center text-sm font-bold cursor-default border-2 
                                    ${cell.revealed 
                                        ? 'bg-slate-300 border-slate-400' 
                                        : 'bg-slate-300 border-t-white border-l-white border-r-slate-500 border-b-slate-500 hover:bg-slate-200'}`}
                            >
                                {cell.flagged && !cell.revealed && <i className="fa-solid fa-flag text-red-600 text-[10px]"></i>}
                                {cell.revealed && (cell.value === 'M' ? <i className="fa-solid fa-bomb text-black"></i> : (cell.value !== '0' ? cell.value : ''))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {gameOver && (
                <div className="mt-4 text-xl font-bold uppercase tracking-widest text-slate-800 drop-shadow-sm">
                    {gameOver === 'won' ? 'Game Clear!' : 'Game Over'}
                </div>
            )}
        </div>
    );
};

// --- Simple Match Card Game (Purble Place inspired) ---
const CardMatch: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const icons = ['cake', 'ice-cream', 'cookie', 'apple-whole', 'lemon', 'carrot'];
    const [cards, setCards] = useState<{ icon: string; flipped: boolean; matched: boolean }[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

    const init = useCallback(() => {
        const deck = [...icons, ...icons].sort(() => Math.random() - 0.5).map(icon => ({
            icon, flipped: false, matched: false
        }));
        setCards(deck);
        setFlippedIndices([]);
    }, []);

    useEffect(() => { init(); }, [init]);

    const handleFlip = (idx: number) => {
        if (flippedIndices.length === 2 || cards[idx].flipped || cards[idx].matched) return;
        
        const newCards = [...cards];
        newCards[idx].flipped = true;
        setCards(newCards);

        const newFlipped = [...flippedIndices, idx];
        setFlippedIndices(newFlipped);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            if (cards[first].icon === cards[second].icon) {
                setTimeout(() => {
                    const finalCards = [...newCards];
                    finalCards[first].matched = true;
                    finalCards[second].matched = true;
                    setCards(finalCards);
                    setFlippedIndices([]);
                }, 500);
            } else {
                setTimeout(() => {
                    const finalCards = [...newCards];
                    finalCards[first].flipped = false;
                    finalCards[second].flipped = false;
                    setCards(finalCards);
                    setFlippedIndices([]);
                }, 1000);
            }
        }
    };

    return (
        <div className="h-full bg-purple-50 p-6 flex flex-col items-center overflow-auto">
            <div className="w-full flex justify-between mb-8">
                <button onClick={onBack} className="seven-button px-4 py-1 text-xs">← Back</button>
                <h2 className="text-purple-800 font-bold">Purble Pairs</h2>
                <button onClick={init} className="seven-button px-4 py-1 text-xs">Reset</button>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {cards.map((card, i) => (
                    <div 
                        key={i} 
                        onClick={() => handleFlip(i)}
                        className={`w-20 h-28 rounded-xl flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 shadow-md 
                            ${card.flipped || card.matched ? 'bg-white rotate-y-180' : 'bg-purple-600 rotate-y-0 hover:scale-105'}`}
                    >
                        {(card.flipped || card.matched) ? (
                            <i className={`fa-solid fa-${card.icon} text-purple-600 animate-fadeIn`}></i>
                        ) : (
                            <i className="fa-solid fa-star text-white/50"></i>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Main Games Explorer Component ---
const Games: React.FC = () => {
    const [activeGame, setActiveGame] = useState<string | null>(null);

    const games = [
        { name: 'Minesweeper', id: 'mines', icon: 'fa-bomb', color: 'text-slate-800' },
        { name: 'Purble Pairs', id: 'purble', icon: 'fa-cake-candles', color: 'text-purple-500' },
        { name: 'Solitaire', id: 'solitaire', icon: 'fa-diamond', color: 'text-red-500', soon: true },
        { name: 'Chess Titans', id: 'chess', icon: 'fa-chess-knight', color: 'text-slate-700', soon: true },
        { name: 'Mahjong Titans', id: 'mahjong', icon: 'fa-shapes', color: 'text-green-600', soon: true },
        { name: 'Spider Solitaire', id: 'spider', icon: 'fa-spider', color: 'text-black', soon: true },
    ];

    if (activeGame === 'mines') return <Minesweeper onBack={() => setActiveGame(null)} />;
    if (activeGame === 'purble') return <CardMatch onBack={() => setActiveGame(null)} />;

    return (
        <div className="h-full bg-slate-50 p-6 overflow-auto">
            <h1 className="text-2xl font-light text-blue-900 mb-6">Games Explorer</h1>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-6">
                {games.map(game => (
                    <div 
                        key={game.id} 
                        onClick={() => !game.soon && setActiveGame(game.id)}
                        className={`flex flex-col items-center group cursor-pointer p-4 rounded-xl transition-all border shadow-sm bg-white
                            ${game.soon ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:bg-blue-50 border-transparent hover:border-blue-200 hover:shadow-md'}`}
                    >
                        <div className={`text-5xl mb-3 ${game.color} group-hover:scale-110 transition-transform`}>
                            <i className={`fa-solid ${game.icon}`}></i>
                        </div>
                        <span className="text-sm font-medium text-slate-800 text-center">{game.name}</span>
                        <span className="text-[10px] text-slate-400 mt-1">{game.soon ? 'Coming Soon' : 'Play Now'}</span>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 p-4 bg-blue-100/30 rounded-lg border border-blue-200">
                <h2 className="text-sm font-bold text-blue-800 mb-2">About Powder Games</h2>
                <p className="text-xs text-slate-600">These classic experiences are optimized for Powder OS to bring back the nostalgic feel of casual gaming. More titles are currently in development.</p>
            </div>
        </div>
    );
};

export default Games;
