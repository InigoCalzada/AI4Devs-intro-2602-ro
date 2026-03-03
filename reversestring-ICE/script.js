/**
 * @fileoverview Reverse String — dual-algorithm implementation
 * Supports two modes:
 *  - "for"     → manual for-loop, triggered by button (shown after 3+ chars)
 *  - "builtin" → uses Array built-ins, runs in real time on every keystroke
 */

'use strict';

/* ─────────────────────────────────────────
   CORE ALGORITHMS
   ───────────────────────────────────────── */

/**
 * Reverses a string using a manual for loop (no built-in reverse).
 *
 * Algorithm:
 *   Start at the last index and walk backwards,
 *   concatenating each character to a result string.
 *   Handles multi-byte / surrogate-pair characters (emojis, etc.)
 *   by spreading into a proper Unicode code-point array first.
 *
 * @param {string} str - The input string to reverse.
 * @returns {string} The reversed string.
 *
 * @example
 * reverseString('AI4Devs') // → 'sveD4IA'
 * reverseString('hello 🌍') // → '🌍 olleh'
 */
function reverseString(str) {
    if (typeof str !== 'string') return '';

    // Spread into array respects Unicode surrogate pairs (e.g. emojis)
    const chars = [...str];
    let result = '';

    for (let i = chars.length - 1; i >= 0; i--) {
        result += chars[i];
    }

    return result;
}

/**
 * Reverses a string using JavaScript built-in Array methods.
 *
 * Algorithm:
 *   1. [...str]   → spread into Unicode-safe character array
 *   2. .reverse() → reverse in-place
 *   3. .join('')  → collapse back to string
 *
 * @param {string} str - The input string to reverse.
 * @returns {string} The reversed string.
 *
 * @example
 * reverseStringBuiltIn('AI4Devs') // → 'sveD4IA'
 */
function reverseStringBuiltIn(str) {
    if (typeof str !== 'string') return '';
    return [...str].reverse().join('');
}

/* ─────────────────────────────────────────
   STATE
   ───────────────────────────────────────── */

/** @type {'for'|'builtin'} */
let currentMode = 'for';

/* ─────────────────────────────────────────
   DOM REFERENCES
   ───────────────────────────────────────── */

const textInput    = document.getElementById('textInput');
const reverseBtn   = document.getElementById('reverseBtn');
const outputText   = document.getElementById('outputText');
const charCounter  = document.getElementById('charCounter');
const copyBtn      = document.getElementById('copyBtn');
const liveBadge    = document.getElementById('liveBadge');
const modeSlider   = document.getElementById('modeSlider');
const modeDesc     = document.getElementById('modeDesc');
const algoExplain  = document.getElementById('algoExplain');
const btnForLoop   = document.getElementById('btnForLoop');
const btnBuiltIn   = document.getElementById('btnBuiltIn');

/* ─────────────────────────────────────────
   UI HELPERS
   ───────────────────────────────────────── */

/**
 * Displays the reversed result in the output area with a flash animation.
 * @param {string} value - The reversed string to display.
 */
function showResult(value) {
    outputText.classList.remove('empty', 'flash');

    if (value === '') {
        outputText.textContent = 'Your reversed string will appear here…';
        outputText.classList.add('empty');
        liveBadge.textContent = 'idle';
        liveBadge.classList.remove('live');
        return;
    }

    // Re-trigger animation by forcing reflow
    void outputText.offsetWidth;
    outputText.classList.add('flash');
    outputText.textContent = value;

    liveBadge.textContent = currentMode === 'builtin' ? 'live' : 'done';
    liveBadge.classList.toggle('live', currentMode === 'builtin');
}

/**
 * Updates the character counter and toggles warning style.
 * @param {number} count
 */
function updateCounter(count) {
    charCounter.textContent = count;
    charCounter.classList.toggle('warning', count > 150);
}

/**
 * Controls the visibility of the Reverse button.
 * In "for" mode: shown only when input has > 3 characters.
 * In "builtin" mode: always hidden.
 * @param {number} charCount - Current input length.
 */
function syncButtonVisibility(charCount) {
    if (currentMode === 'for') {
        reverseBtn.classList.toggle('hidden', charCount <= 3);
    } else {
        reverseBtn.classList.add('hidden');
    }
}

/* ─────────────────────────────────────────
   MODE SWITCHING
   ───────────────────────────────────────── */

const modeDescriptions = {
    for: `<span class="highlight">FOR LOOP</span> — Press the button to reverse (appears after 3+ characters).`,
    builtin: `<span class="highlight">BUILT-IN</span> — Real-time reversal as you type. No button needed.`,
};

const algoDescriptions = {
    for: `<strong>for loop:</strong> Iterates from the last index down to 0,
          appending each character to a new string. O(n) time, O(n) space.
          Manual but transparent — every step is visible.`,
    builtin: `<strong>built-in:</strong> Spreads the string into a Unicode-safe array,
              calls <strong>.reverse()</strong>, then joins back.
              Concise, idiomatic JavaScript — O(n) under the hood.`,
};

/**
 * Switches the active algorithm mode and updates the UI accordingly.
 * @param {'for'|'builtin'} mode
 */
function setMode(mode) {
    currentMode = mode;

    // Update toggle buttons
    btnForLoop.classList.toggle('active', mode === 'for');
    btnBuiltIn.classList.toggle('active', mode === 'builtin');

    // Slide the highlight
    modeSlider.classList.toggle('right', mode === 'builtin');

    // Update descriptions
    modeDesc.innerHTML    = modeDescriptions[mode];
    algoExplain.innerHTML = algoDescriptions[mode];

    // Clear output & re-sync
    const count = textInput.value.length;
    syncButtonVisibility(count);

    if (mode === 'builtin') {
        // Immediately apply built-in reverse on current input
        showResult(reverseStringBuiltIn(textInput.value));
    } else {
        // Clear output when switching back to for-loop mode
        showResult('');
    }
}

/* ─────────────────────────────────────────
   EVENT LISTENERS
   ───────────────────────────────────────── */

// Mode toggle buttons
btnForLoop.addEventListener('click', () => setMode('for'));
btnBuiltIn.addEventListener('click', () => setMode('builtin'));

// Input: update counter, sync button, and handle built-in live mode
textInput.addEventListener('input', () => {
    const val   = textInput.value;
    const count = val.length;

    updateCounter(count);
    syncButtonVisibility(count);

    if (currentMode === 'builtin') {
        showResult(reverseStringBuiltIn(val));
    } else if (count <= 3) {
        // Reset output if under threshold in for-loop mode
        showResult('');
    }
});

// Reverse button click (for-loop mode)
reverseBtn.addEventListener('click', () => {
    const val = textInput.value.trim();
    if (!val) return;
    showResult(reverseString(val));
});

// Enter key support
textInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && currentMode === 'for') {
        reverseBtn.click();
    }
});

// Copy to clipboard
copyBtn.addEventListener('click', () => {
    const text = outputText.textContent;
    if (!text || outputText.classList.contains('empty')) return;

    navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = '[ copied! ]';
        copyBtn.classList.add('copied');
        setTimeout(() => {
            copyBtn.textContent = '[ copy ]';
            copyBtn.classList.remove('copied');
        }, 1800);
    }).catch(() => {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity  = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        copyBtn.textContent = '[ copied! ]';
        setTimeout(() => { copyBtn.textContent = '[ copy ]'; }, 1800);
    });
});
