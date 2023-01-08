const characters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "ñ",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  " ",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
];

const password = [
  [1, 0, 1],
  [9, 0, 2],
  [0, 1, 4],
];

var textencryp = document.getElementById("textencryp");
var textdecrypt = document.getElementById("textdecrypt");

//converts array of letters to numbers
//convierte array de letras en numeros
const toNumber = (texto) => {
  let messageTonumber = [];
  for (var i = 0; i < texto.length; i++) {
    messageTonumber.push(characters.indexOf(texto[i]));
  }
  return messageTonumber;
};

//Convert numeric array to letters
//Convierte array numérico en letras
const toLetter = (texto) => {
  let letterP = "";
  texto.forEach((element) => {
    element.forEach((letter) => {
      letterP += characters[letter];
    });
  });
  return to3x3Array(letterP);
};

//Fill in the missing data so that .length()%3 == 0
//Completa los datos faltantes para  que .length()%3 == 0
const convert = (text) => {
  let message3x3 = [];
  let message = [];

  message = toNumber(text);

  try {
    while (message.length % 3 != 0) {
      message.push(characters.indexOf(" "));
    }
  } catch (error) {
    console.error("Error al completar la matriz");
  }

  console.log("desen");
  console.log(to3x3Array(message));

  return to3x3Array(message);
};

//convert array to 3x3 array
//convertir matriz a matriz 3x3
const to3x3Array = (textArry) => {
  let message3x3 = [];
  let message = [];
  try {
    for (var i = 0; i < textArry.length; i++) {
      message.push(textArry[i]);

      if ((i + 1) % 3 == 0) {
        message3x3.push(message);
        message = [];
      }
    }
  } catch (error) {
    console.error("Error al convertir el texto en un Array 3x3");
  }

  return message3x3;
};

//Converts the numbers under the corresponding module
//Convierte los numeros bajo el modulo correspondiente
const toModule = (number) => {
  if (number < 0) {
    while (number < 0) {
      number = number + characters.length;
    }
    return number;
  } else if (number >= characters.length) {
    while (number >= characters.length) {
      number = number - characters.length;
    }
    return number;
  } else {
    return number;
  }
};

//Operates the array of the original message in numbers and assigns a letter with the numeric result
//Opera el array del mensaje original en números y con el resultado numérico asigna una letra
const arrayOperate = (array, password) => {
  let messageTramsfor = 0;
  let messageEncryp = [];
  let arrayEncryp = [];

  try {
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < 3; j++) {
        //console.log(array[i]);
        for (var k = 0; k < 3; k++) {
          // console.log(array[i][k]);
          // console.log(password[j][k]);

          messageTramsfor = messageTramsfor + array[i][k] * password[j][k];
        }

        arrayEncryp.push(toModule(messageTramsfor));
        messageTramsfor = 0;
      }

      messageEncryp.push(arrayEncryp);
      arrayEncryp = [];
    }
  } catch (error) {
    console.error("Occurio Un error al encriptar-desencriptar el Mensaje  :( ");
  }
  return messageEncryp;
};


//get Determinate From Array
//Otener determinate de la Array
const getDeterminant = () => {
  let diagonalrigh1 = password[0][0] * password[1][1] * password[2][2];
  let diagonalright2 = password[1][0] * password[2][1] * password[0][2];
  let diagonalright3 = password[2][0] * password[0][1] * password[1][2];

  let diagonalleft1 = password[0][2] * password[1][1] * password[2][0];
  let diagonalleft2 = password[1][2] * password[2][1] * password[0][0];
  let diagonalleft3 = password[2][2] * password[0][1] * password[1][0];

  return (
    diagonalrigh1 +
    diagonalright2 +
    diagonalright3 -
    (diagonalleft1 + diagonalleft2 + diagonalleft3)
  );
};

const getInverseOfDeterminant = () => {
  let result;
  try {
    for (var i = 0; true; i++) {
      if ((getDeterminant() * i) % characters.length == 1) {
        result = i;
        break;
      }
    }
  } catch (error) {
    console.error("Error al obtener el determinate con iverso");
  }

  return result;
};

const getArrayTranspose = () => {
  let transposedArray = [];
  let transposedArrayTemp = [];

  try {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        transposedArrayTemp.push(password[j][i]);
      }
      transposedArray.push(transposedArrayTemp);
      transposedArrayTemp = [];
    }
  } catch (error) {
    console.error("Error al obtener Array Transpuesta");
  }

  return transposedArray;
};

function getPassworDecryp() {
  let attachedArray = [[], [], []];
  let getArrayByDeterminant = getArrayTranspose();
  attachedArray[0][0] = toModule(
    +(
      getArrayByDeterminant[1][1] * getArrayByDeterminant[2][2] -
      getArrayByDeterminant[1][2] * getArrayByDeterminant[2][1]
    ) * getInverseOfDeterminant()
  );
  attachedArray[0][1] = toModule(
    -(
      getArrayByDeterminant[1][0] * getArrayByDeterminant[2][2] -
      getArrayByDeterminant[1][2] * getArrayByDeterminant[2][0]
    ) * getInverseOfDeterminant()
  );
  attachedArray[0][2] = toModule(
    +(
      getArrayByDeterminant[1][0] * getArrayByDeterminant[2][1] -
      getArrayByDeterminant[1][1] * getArrayByDeterminant[2][0]
    ) * getInverseOfDeterminant()
  );
  attachedArray[1][0] = toModule(
    -(
      getArrayByDeterminant[0][1] * getArrayByDeterminant[2][2] -
      getArrayByDeterminant[0][2] * getArrayByDeterminant[2][1]
    ) * getInverseOfDeterminant()
  );
  attachedArray[1][1] = toModule(
    +(
      getArrayByDeterminant[0][0] * getArrayByDeterminant[2][2] -
      getArrayByDeterminant[0][2] * getArrayByDeterminant[2][0]
    ) * getInverseOfDeterminant()
  );
  attachedArray[1][2] = toModule(
    -(
      getArrayByDeterminant[0][0] * getArrayByDeterminant[2][1] -
      getArrayByDeterminant[0][1] * getArrayByDeterminant[2][0]
    ) * getInverseOfDeterminant()
  );
  attachedArray[2][0] = toModule(
    +(
      getArrayByDeterminant[0][1] * getArrayByDeterminant[1][2] -
      getArrayByDeterminant[0][2] * getArrayByDeterminant[1][1]
    ) * getInverseOfDeterminant()
  );
  attachedArray[2][1] = toModule(
    -(
      getArrayByDeterminant[0][0] * getArrayByDeterminant[1][2] -
      getArrayByDeterminant[0][1] * getArrayByDeterminant[1][0]
    ) * getInverseOfDeterminant()
  );
  attachedArray[2][2] = toModule(
    +(
      getArrayByDeterminant[0][0] * getArrayByDeterminant[1][1] -
      getArrayByDeterminant[0][1] * getArrayByDeterminant[1][0]
    ) * getInverseOfDeterminant()
  );
  return attachedArray;
}

const toText = (array) => {
  let messageFinal = "";
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < 3; j++) {
      messageFinal += array[i][j];
    }
  }

  return messageFinal;
};

const decrypt = () => {
  let message = [];
  let messageEncryp = [];
  let messageDecrypt = "";
  messageEncryp = arrayOperate(convert(textdecrypt.value), getPassworDecryp());
  console.log(messageEncryp);
  message = toLetter(messageEncryp);
  console.log(message);

  let dysplay = document.getElementById("dysplay");
  dysplay.innerHTML = toText(message);
};

const encryp = () => {
  let message = [];
  let messageEncryp = [];
  messageEncryp = arrayOperate(convert(textencryp.value), password);
  message = toLetter(messageEncryp);
  console.log(message);
  console.log(messageEncryp);
  let dysplay = document.getElementById("dysplay");
  dysplay.innerHTML = toText(message);
};
