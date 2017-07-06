/**
 * Created by anjaneyasivan on 19/06/16.
 */
function Converter(maps) {
    this.maps = maps;
    this.letters = Object.keys(maps);
}

Converter.prototype = {

    convert: function (unicodeText) {
        var index = 0;
        var asciiText = '';
        var i = 3;
        var letter = '', asciiLetter = '';
        var priorMatchLetter = null;
        var tya = '്യ', tra = '്ര';
        tya = this.maps[tya];
        tra = this.maps[tra];
        var letterArray = [];
        // console.log(tya, tra);

        while (index < unicodeText.length) {
            for (i = 3; i >= 1; i--) {
                //console.log(i);
                letter = unicodeText.substring(index, index + i);
                // console.log(letter);
                if (this.letters.indexOf(letter) !== -1) {
                    asciiLetter = this.maps[letter];
                    if (letter === 'ൈ') {
                        asciiText = asciiText.substring(0, asciiText.length - 1) + asciiLetter + asciiText[asciiText.length - 1];
                        letterArray.splice(letterArray.length - 1, 0, {
                            type: 'M',
                            chunk: asciiLetter
                        });
                    } else if (letter === 'ോ' || letter === 'ൊ' || letter === 'ൌ') {
                        if (asciiText.substring(asciiText.length - 2, asciiText.length - 1) === tra) {
                            asciiText = asciiText.substring(0, asciiText.length - 2) + asciiLetter[0] + asciiText.substring(asciiText.length - 2) + asciiLetter[1];
                            letterArray.splice(letterArray.length - 2, 0, {
                                type: 'M',
                                chunk: asciiLetter[0]
                            });
                            letterArray.push({
                                type: 'M',
                                chunk: asciiLetter[1]
                            });
                        } else {
                            asciiText = asciiText.substring(0, asciiText.length - 1) + asciiLetter[0] + asciiText[asciiText.length - 1] + asciiLetter[1];
                            letterArray.splice(letterArray.length - 1, 0, {
                                type: 'M',
                                chunk: asciiLetter[0]
                            });
                            letterArray.push({
                                type: 'M',
                                chunk: asciiLetter[1]
                            });
                        }
                    } else if (letter === 'െ' || letter === 'േ' || letter === '്ര') {
                        if (asciiText.substring(asciiText.length - 2, asciiText.length - 1) === tra) {
                            asciiText = asciiText.substring(0, asciiText.length - 1) + asciiLetter + asciiText.substring(asciiText.length - 1);
                            letterArray.splice(letterArray.length - 2, 0, {
                                type: 'M',
                                chunk: asciiLetter
                            });
                        } else {
                            asciiText = asciiText.substring(0, asciiText.length - 1) + asciiLetter + asciiText[asciiText.length - 1];
                            letterArray.splice(letterArray.length - 1, 0, {
                                type: 'M',
                                chunk: asciiLetter
                            });
                        }

                    } else {
                        asciiText = asciiText + asciiLetter;
                        letterArray.push({
                            type: 'M',
                            chunk: asciiLetter
                        });
                    }
                    priorMatchLetter = letter;
                    index = index + i;
                    break;
                } else {
                    if (i === 1) {
                        index = index + 1;
                        asciiText = asciiText + letter;
                        letterArray.push({
                            type: 'E',
                            chunk: letter
                        });
                        break;
                    }
                    // letterArray.push({
                    //     type: 'E',
                    //     chunk: letter
                    // });
                    asciiLetter = letter;
                }
            }
        }
        return letterArray;
    }
};

export default Converter;