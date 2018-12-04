'use strict'
const fs = require('fs');

const filePath = process.argv[2];

const lineReader = require('readline').createInterface({
    input: fs.createReadStream(filePath),
});

let countOfDoubles = 0;
let countOfTriples = 0;
const arrayOfStrings = [];

lineReader.on('line', function (line) {
    const arrayOfCharacters = line.split('');
    const objectCountCharacters = {};
    arrayOfCharacters.forEach(character => {
        if (objectCountCharacters[character] !== undefined) {
            objectCountCharacters[character] += 1;
        } else {
            objectCountCharacters[character] = 1;
        }
    });
    let shouldCountDouble = false;
    let shouldCountTriple = false;
    for(let index in objectCountCharacters) {
        if (objectCountCharacters.hasOwnProperty(index)) {
            if (objectCountCharacters[index] === 2) {
                shouldCountDouble = true;
            } else if (objectCountCharacters[index] === 3) {
                shouldCountTriple = true;
            }
        }
    }

    if (shouldCountDouble) {
        countOfDoubles += 1;
    }

    if (shouldCountTriple) {
        countOfTriples += 1;
    }
    arrayOfStrings.push(line);
});

lineReader.on('close', function () {
    console.log('Doubles: ' + countOfDoubles + ', Triples: ' + countOfTriples);
    console.log('Checksum: ' + countOfDoubles * countOfTriples);
    let commonLetters = '';
    // I'm not pride of the following lines yet, hehe
    arrayOfStrings.forEach(stringId => {
        arrayOfStrings.forEach(stringIdToCompare => {
            if (stringId !== stringIdToCompare){
                let diffCharactersCount = 0;
                let diffIndex;
                for(let i = 0; i < stringId.length; i += 1) {
                    if (stringId[i] !== stringIdToCompare[i]) {
                        diffCharactersCount += 1;
                        diffIndex = i;
                    }
                }
                if (diffCharactersCount === 1) {
                    if (diffIndex === 0) {
                        commonLetters = stringId.slice(1);
                    } else if (diffIndex === (stringId.length - 1)) {
                        commonLetters = stringId.slice(0, -1);
                    } else {
                        commonLetters = stringId.slice(0, diffIndex) + stringId.slice(diffIndex + 1);
                    }
                }
            }
        });
    });
    console.log('The common letters are: ' + commonLetters);
});
