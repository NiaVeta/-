document.addEventListener('DOMContentLoaded', function() {
    // Алфавит в массиве (только заглавные буквы)
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
    // Отображаем алфавит
    const alphabetDisplay = document.getElementById('alphabetDisplay');
    alphabet.forEach(letter => {
        const letterElement = document.createElement('div');
        letterElement.className = 'alphabet-letter';
        letterElement.textContent = letter;
        alphabetDisplay.appendChild(letterElement);
    });
    
    // Обработчик кнопки расшифровки
    document.getElementById('decryptBtn').addEventListener('click', function() {
        const encryptedText = document.getElementById('encryptedText').value;
        const decryptedText = document.getElementById('decryptedText');
        const originalOutput = document.getElementById('originalOutput');
        const resultOutput = document.getElementById('resultOutput');
        const processInfo = document.getElementById('processInfo');
        
        // Очищаем предыдущие результаты
        originalOutput.innerHTML = '';
        resultOutput.innerHTML = '';
        processInfo.innerHTML = '';
        
        // Выполняем расшифровку
        const result = rot13Decrypt(encryptedText, alphabet);
        decryptedText.value = result;
        
        // Выводим информацию
        originalOutput.innerHTML = '<strong>Зашифрованный текст:</strong> ' + encryptedText;
        resultOutput.innerHTML = '<strong>Расшифрованный текст:</strong> ' + result;
        
        // Формируем информацию о процессе
        let infoHtml = '<div class="step"><strong>Принцип ROT13:</strong> каждая буква заменяется на букву, находящуюся через 13 позиций в алфавите.</div>';
        infoHtml += '<div class="step"><strong>Особенность:</strong> так как в английском алфавите 26 букв, то ROT13 является самодостаточным (шифрование и расшифровка используют один алгоритм).</div>';
        infoHtml += '<div class="step"><strong>Обработка:</strong> символы, не входящие в алфавит (цифры, спецсимволы) остаются без изменений.</div>';
        
        processInfo.innerHTML = infoHtml;
    });
    
    // Функция расшифровки ROT13
    function rot13Decrypt(str, alphabet) {
        let result = '';
        const len = str.length;
        const alphabetLength = alphabet.length;
        
        for (let i = 0; i < len; i++) {
            const char = str[i];
            const upperChar = char.toUpperCase();
            const isLower = char !== upperChar;
            
            // Проверяем, есть ли символ в алфавите
            let index = -1;
            for (let j = 0; j < alphabetLength; j++) {
                if (alphabet[j] === upperChar) {
                    index = j;
                    break;
                }
            }
            
            if (index >= 0) {
                // Вычисляем новую позицию (расшифровка - тоже сдвиг на 13)
                let newIndex = (index + 13) % alphabetLength;
                let newChar = alphabet[newIndex];
                
                // Восстанавливаем регистр
                if (isLower) {
                    newChar = newChar.toLowerCase();
                }
                
                result += newChar;
            } else {
                // Не буква алфавита - оставляем как есть
                result += char;
            }
        }
        
        return result;
    }
});