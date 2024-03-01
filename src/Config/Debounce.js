/**
 * Debounces a function, ensuring it is only called after a certain delay has passed
 * since the last time it was invoked.
 * @param {Function} func The function to be debounced.
 * @param {number} delay The delay (in milliseconds) after which the function should be called.
 * @returns {Function} The debounced function.
 */
export function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
