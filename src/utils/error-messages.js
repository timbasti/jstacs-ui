export function minMaxErrorMessage(min, max) {
    return `Please enter a value between ${min} and ${max}`;
}

export function requiredValueErrorMessage() {
    return `Please enter a value`;
}

export function requiredSelectionErrorMessage() {
    return `Please select an option`;
}

export function patternErrorMessage(pattern) {
    return `The value have to match ${pattern}`;
}

export function singleCharErrorMessage() {
    return `Only a single character is allowed`;
}
