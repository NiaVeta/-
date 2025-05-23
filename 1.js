function encoder() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let alphabetTopCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let inputText = document.getElementById('inputArea').value;
    let result = '';

    for (let i = 0; i < inputText.length; i++) {
        let char = inputText[i];
        let index = alphabet.indexOf(char);
        
        if (index >= 0) {
            result += alphabet[(index + 13) % 26];
        } else {
            index = alphabetTopCase.indexOf(char);
            if (index >= 0) {
                result += alphabetTopCase[(index + 13) % 26];
            } else {
                result += char;
            }
        }
    }
    
    document.getElementById('outputArea').value = result;
}
