import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Game.module.css';
import LoadingScreen from './LoadingScreen';
import StartScreen from './StartScreen';
import GameScreen from './GameScreen';
import FinishedScreen from './FinishedScreen';
import { MAX_QUESTIONS } from '../../constants/gameConstants';
import { shuffleArray } from '../../../utils/shuffleArray';

function Game({ onGoToCatalog }) {
    const [gameState, setGameState] = useState('start'); // start, playing, result, finished
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [usedItems, setUsedItems] = useState([]);
    const [shuffledItems, setShuffledItems] = useState([]);
    const resultTimeoutRef = useRef(null);

    const clearResultTimeout = useCallback(() => {
        if (resultTimeoutRef.current) {
            clearTimeout(resultTimeoutRef.current);
            resultTimeoutRef.current = null;
        }
    }, []);

    const advanceAfterResult = useCallback(() => {
        setCurrentQuestion(prevQuestion => {
            const nextQuestion = prevQuestion + 1;
            if (nextQuestion > MAX_QUESTIONS) {
                setGameState('finished');
                return prevQuestion;
            }
            setGameState('playing');
            setUsedItems(currentUsedItems => {
                setShuffledItems(currentShuffled => {
                    const itemsToUse = currentShuffled.length > 0 ? currentShuffled : items;
                    startNewQuestion(nextQuestion, currentUsedItems, itemsToUse);
                    return currentShuffled;
                });
                return currentUsedItems;
            });
            return nextQuestion;
        });
    }, [items]);

    useEffect(() => {
        return () => clearResultTimeout();
    }, [clearResultTimeout]);

    useEffect(() => {
        // Загружаем данные из JSON файла
        fetch('/gameData/guessMaterial/materials.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error('Данные не найдены или пусты');
                }
                setItems(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка загрузки данных:', error);
                setError('Не удалось загрузить данные. Пожалуйста, обновите страницу.');
                setLoading(false);
            });
    }, []);

    const startNewQuestion = (questionNum, usedIds, itemsList) => {
        if (!itemsList || itemsList.length === 0) return;

        // Берем предмет, который еще не использовался
        const availableItems = itemsList.filter(item => !usedIds.includes(item.id));
        let newItem;
        let newUsedItems;
        let newShuffledItems = itemsList;

        if (availableItems.length === 0) {
            // Если все предметы использованы, перемешиваем заново
            const reshuffled = shuffleArray(itemsList);
            newShuffledItems = reshuffled;
            newItem = reshuffled[0];
            newUsedItems = [reshuffled[0].id];
        } else {
            newItem = availableItems[0];
            newUsedItems = [...usedIds, availableItems[0].id];
        }

        setShuffledItems(newShuffledItems);
        setUsedItems(newUsedItems);
        setCurrentItem(newItem);
        setSelectedAnswer(null);
        setIsCorrect(false);
    };

    const handleStart = () => {
        const shuffled = shuffleArray(items);
        setShuffledItems(shuffled);
        setGameState('playing');
        setCurrentQuestion(1);
        setScore(0);
        setUsedItems([]);
        startNewQuestion(1, [], shuffled);
    };

    const handleAnswer = answer => {
        if (selectedAnswer || !currentItem) return; // Уже отвечали или нет предмета

        const correct = answer === currentItem.material;
        setSelectedAnswer(answer);
        setIsCorrect(correct);
        setGameState('result');

        if (correct) {
            setScore(prevScore => prevScore + 1);
        }

        clearResultTimeout();
        resultTimeoutRef.current = setTimeout(advanceAfterResult, 5000);
    };

    const handleCloseResult = () => {
        clearResultTimeout();
        advanceAfterResult();
    };

    const handleRestart = () => {
        setGameState('start');
        setCurrentQuestion(0);
        setScore(0);
        setUsedItems([]);
        setShuffledItems([]);
        setSelectedAnswer(null);
        setCurrentItem(null);
    };

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <div className={styles.screen}>
                <h2 className={styles.title}>⚠️ Ошибка загрузки</h2>
                <p className={styles.message}>{error}</p>
                <button className={styles.button} onClick={() => window.location.reload()}>
                    Обновить страницу
                </button>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className={styles.screen}>
                <h2 className={styles.title}>📦 Нет данных</h2>
                <p className={styles.message}>Материалы не найдены. Пожалуйста, проверьте файл gameData/guessMaterial/materials.json</p>
                <button className={styles.button} onClick={() => window.location.reload()}>
                    Обновить страницу
                </button>
            </div>
        );
    }

    if (gameState === 'start') {
        return <StartScreen onStart={handleStart} />;
    }

    if (gameState === 'playing' || gameState === 'result') {
        if (!currentItem) {
            // Если нет текущего предмета, возвращаемся к началу
            return <StartScreen onStart={handleStart} />;
        }
        return (
            <GameScreen
                currentItem={currentItem}
                selectedAnswer={selectedAnswer}
                isCorrect={isCorrect}
                showResult={gameState === 'result'}
                onAnswer={handleAnswer}
                onCloseResult={handleCloseResult}
            />
        );
    }

    if (gameState === 'finished') {
        return <FinishedScreen score={score} onRestart={handleRestart} onShowCatalog={onGoToCatalog} />;
    }

    return null;
}

export default Game;
