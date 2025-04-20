function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startBlinking() {
    const morse = "-. . ...- . .-. / --. --- -. -. .- / --. .. ...- . / -.-- --- ..- / ..- .--.";
    const cursor = document.getElementById('cursor');
    
    const DOT_DURATION = 200;    // ms
    const DASH_DURATION = 600;   // ms
    const SYMBOL_PAUSE = 200;    // ms between symbols
    const LETTER_PAUSE = 600;    // ms between letters
    const WORD_PAUSE = 1400;     // ms between words

    while (true) {  // Infinite loop
        for (let i = 0; i < morse.length; i++) {
            const symbol = morse[i];

            if (symbol === '.') {
                cursor.style.backgroundColor = '#00ff00';
                await sleep(DOT_DURATION);
                cursor.style.backgroundColor = 'transparent';
                await sleep(SYMBOL_PAUSE);
            } else if (symbol === '-') {
                cursor.style.backgroundColor = '#00ff00';
                await sleep(DASH_DURATION);
                cursor.style.backgroundColor = 'transparent';
                await sleep(SYMBOL_PAUSE);
            } else if (symbol === ' ') {
                await sleep(LETTER_PAUSE);
            } else if (symbol === '/') {
                await sleep(WORD_PAUSE);
            }
        }
        
        // 1 second pause at the end of each iteration
        await sleep(1000);
    }
}

// Start blinking when the page loads
document.addEventListener('DOMContentLoaded', () => {
    startBlinking();
}); 