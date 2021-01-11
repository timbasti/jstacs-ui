export function minMaxErrorMessage(min, max) {
    return `Please enter a value between ${min} and ${max}`;
}

export function requiredErrorMessage() {
    return `Please enter a value`;
}

export function patternErrorMessage(pattern) {
    return `The value have to match ${pattern}`;
}

export function singleCharErrorMessage() {
    return `Only a single character is allowed`;
}
