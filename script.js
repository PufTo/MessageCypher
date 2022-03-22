'use strict';
console.log("hello");
// ce i cu selecturile astea ALOO
const messageInput = document.getElementsByClassName("messageToEncrypt")[0];
const secretCodeInput = document.getElementsByClassName("secretCode")[0];
const encryptButton = document.getElementsByClassName("button-encrypt")[0];
const decryptButton = document.getElementsByClassName("button-decrypt")[0];
const copyButton = document.getElementsByClassName("button-copyMessage")[0];
const encryptedMessageBox = document.getElementsByClassName("encryptedMessage")[0];

const validCharacters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",  "S", "T", "U", "V",  "W", "X", "Y", "Z",  "0", "1",  "2", "3", "4", "5", "6", "7",  "8", "9", ".", ",", "?", "!", "'", "_", "-", "&", "@", "#", "$", "%", "*", "(", ")", " "];

const validateMessageAndKey = (message, key) => {
    try {
        console.log(message.split(''));
        message.split('').forEach(element => {
            if(!validCharacters.includes(element))
                throw "The message contains invalid characters!";
        });
        key.split('').forEach(element => {
            if(!validCharacters.includes(element))
                throw "The key contains invalid characters!";
        });
      }
      catch(err) {
        alert (err);
        //message.innerHTML = "Eroare";
      }
}

const encryptMessage = (event)=>{
    event.preventDefault();
    const messageToEncrypt = messageInput.value.toUpperCase();
    const key = secretCodeInput.value.toUpperCase();
    validateMessageAndKey(messageToEncrypt, key);

    const encryptedMessage = messageToEncrypt.split('').map((character, index) => {
        const messageIndex = validCharacters.indexOf(character);
        const keyCharacter = key[index%key.length];
        const keyIndex = validCharacters.indexOf(keyCharacter);
        //Returns the current encrypted element
        return validCharacters[(messageIndex + keyIndex)%validCharacters.length];
    } );
    console.log(encryptedMessage.join(""));

    encryptedMessageBox.value = encryptedMessage.join("").toLowerCase();
}

const decryptMessage = (event)=>{
    event.preventDefault();
    const messageToEncrypt = messageInput.value.toUpperCase();
    const key = secretCodeInput.value.toUpperCase();
    validateMessageAndKey(messageToEncrypt, key);


    const encryptedMessage = messageToEncrypt.split('').map((character, index) => {
        const messageIndex = validCharacters.indexOf(character);
        const keyCharacter = key[index%key.length];
        const keyIndex = validCharacters.indexOf(keyCharacter);
        let decryptedIndex = messageIndex - keyIndex;
        if (decryptedIndex < 0)
            decryptedIndex += validCharacters.length;
        return validCharacters[decryptedIndex];
    } );
    console.log(encryptedMessage.join(""));

    encryptedMessageBox.value = encryptedMessage.join("").toLowerCase();
}

encryptButton.addEventListener("click", encryptMessage);

decryptButton.addEventListener("click", decryptMessage);

copyButton.addEventListener("click", (event)=> {
    event.preventDefault();
    const newClipboardText = encryptedMessageBox.value;
    navigator.clipboard.writeText(newClipboardText).then();
})
