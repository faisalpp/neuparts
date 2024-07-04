export function limitString(inputString,maxLength){
    if (inputString.length > maxLength) {
        return inputString.substring(0, maxLength) + '...';
    }
    return inputString;
}