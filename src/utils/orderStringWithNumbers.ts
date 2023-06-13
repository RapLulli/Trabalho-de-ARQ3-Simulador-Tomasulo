/* eslint-disable eqeqeq */
/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const PAD = '#';
interface Dict {
    position: number;
    letter: string;
}

const IsLetter = (letter: string) => {
    if (letter != PAD && (letter.charCodeAt(0) < 48 || letter.charCodeAt(0) > 57)) { return true; }
    return false;
};

const IsNumber = (letter: string) => {
    if (letter.charCodeAt(0) >= 48 && letter.charCodeAt(0) <= 57) { return true; }
    return false;
};

const BiggerNumberInSequence = (dictionaryStringA: Dict[], dictionaryStringB: Dict[]) => {
    for (let i = 0; i < dictionaryStringA.length; i++) {
        if (dictionaryStringA[i].letter > dictionaryStringB[i].letter) { return 1; }
        if (dictionaryStringA[i].letter < dictionaryStringB[i].letter) { return -1; }
    }
    return 0;
};

const GetNumberSequence = (str: string, pos:number = 0) => {
    const DictPosNumber: Dict[] = [] as any;
    for (; pos < str.length; pos++) {
        if (IsNumber(str[pos])) {
            DictPosNumber.push({ letter: str.charAt(pos), position: pos });
            if (pos + 1 < str.length && IsLetter(str[pos + 1])) { break; }
        }
    }
    return DictPosNumber;
};

const Compare = (stringA: string, stringB: string) => {
    const biggerStringLength = stringA.length > stringB.length ? stringA.length : stringB.length;
    stringA = stringA.padEnd(biggerStringLength, PAD);
    stringB = stringB.padEnd(biggerStringLength, PAD);
    const arrayCharA = stringA.toLowerCase();
    const arrayCharB = stringB.toLowerCase();
    let DictionaryStringA: Dict[] = [] as any;
    let DictionaryStringB: Dict[] = [] as any;
    for (let pos = 0; pos < biggerStringLength; pos++) {
        if (arrayCharA[pos] == arrayCharB[pos]) { continue; }
        if (IsNumber(arrayCharA[pos]) && IsNumber(arrayCharB[pos])) {
            DictionaryStringA = GetNumberSequence(stringA, pos);
            DictionaryStringB = GetNumberSequence(stringB, pos);
            if (DictionaryStringA.length > DictionaryStringB.length) { return 1; }
            if (DictionaryStringA.length < DictionaryStringB.length) { return -1; }
            return BiggerNumberInSequence(DictionaryStringA, DictionaryStringB);
        }
        if (IsNumber(arrayCharB[pos]) && IsLetter(arrayCharA[pos])) { return -1; }
        if (IsNumber(arrayCharA[pos]) && IsLetter(arrayCharB[pos])) { return 1; }
        if (arrayCharA[pos] > arrayCharB[pos]) { return 1; }
        if (arrayCharA[pos] < arrayCharB[pos]) { return -1; }
    }
    return 0;
};

export default Compare;
