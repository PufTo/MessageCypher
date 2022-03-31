"use strict";
console.log("hello");

const messageInput = document.getElementById("cypher-message-input");
const secretCodeInput = document.getElementById("cypher-key-input");
const encryptedMessageBox = document.getElementById("cypher-result-text");

const encryptButton = document.querySelector(".button-encrypt");
const decryptButton = document.querySelector(".button-decrypt");
const swapButton = document.querySelector(".button-swap");
const copyButton = document.querySelector(".button-copy");

const validCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  ",",
  "?",
  "!",
  "'",
  "_",
  "-",
  "&",
  "@",
  "#",
  "$",
  "%",
  "*",
  "(",
  ")",
  " ",
];

const validateMessageAndKey = (message, key) => {
  try {
    console.log(message.split(""));
    message.split("").forEach((element) => {
      if (!validCharacters.includes(element))
        throw "The message contains invalid characters!";
    });
    if (!key) throw "Can't have empty key!";
    key.split("").forEach((element) => {
      if (!validCharacters.includes(element))
        throw "The key contains invalid characters!";
    });
  } catch (err) {
    alert(err);
    //message.innerHTML = "Eroare";
    return false;
  }
  return true;
};

const encryptMessage = (event) => {
  event.preventDefault();
  const messageToEncrypt = messageInput.value.toUpperCase();
  const key = secretCodeInput.value.toUpperCase();
  if (!validateMessageAndKey(messageToEncrypt, key)) return;

  const encryptedMessage = [...messageToEncrypt].map((character, index) => {
    const messageIndex = validCharacters.indexOf(character);
    const keyCharacter = key[index % key.length];
    const keyIndex = validCharacters.indexOf(keyCharacter);

    //Returns the current encrypted element
    return validCharacters[(messageIndex + keyIndex) % validCharacters.length];
  });
  console.log(encryptedMessage.join(""));

  encryptedMessageBox.value = encryptedMessage.join("").toLowerCase();
};

const decryptMessage = (event) => {
  event.preventDefault();
  const messageToEncrypt = messageInput.value.toUpperCase();
  const key = secretCodeInput.value.toUpperCase();
  if (!validateMessageAndKey(messageToEncrypt, key)) return;

  const encryptedMessage = [...messageToEncrypt].map((character, index) => {
    const messageIndex = validCharacters.indexOf(character);
    const keyCharacter = key[index % key.length];
    const keyIndex = validCharacters.indexOf(keyCharacter);
    let decryptedIndex = messageIndex - keyIndex;
    if (decryptedIndex < 0) decryptedIndex += validCharacters.length;

    return validCharacters[decryptedIndex];
  });
  console.log(encryptedMessage.join(""));

  encryptedMessageBox.value = encryptedMessage.join("").toLowerCase();
};

const swapMessages = function (event) {
  event.preventDefault();
  messageInput.value = encryptedMessageBox.value;
};

const copyResult = function (event) {
  event.preventDefault();
  const newClipboardText = encryptedMessageBox.value;
  navigator.clipboard.writeText(newClipboardText);
};

encryptButton.addEventListener("click", encryptMessage);

decryptButton.addEventListener("click", decryptMessage);

swapButton.addEventListener("click", swapMessages);

copyButton.addEventListener("click", copyResult);
