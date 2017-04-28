/**
 * Created by anjaneyasivan on 28/04/17.
 */
import letterMap from './LetterMap';
import Converter from './TextConverter';
import debounce from 'lodash/debounce';
const converter = new Converter(letterMap);

let unicodeDom = document.getElementById('unicode-text');
let textResult = document.getElementById('text-result');

const onTextChange = debounce((e) => {
    const text = e.target.value;
    const textArray = converter.convert(text);
    let asciiText = '';
    textArray.map((item) => {
        asciiText += item.chunk;
    });
    textResult.innerHTML = asciiText;
}, 400);

unicodeDom.addEventListener('keydown', onTextChange);

