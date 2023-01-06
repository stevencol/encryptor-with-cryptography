//convert array to 3x3 array
const to3x3Array = (textArry) => {
    let message3x3 = [];
    let message=[];
    for (var i = 0; i < textArry.length; i++) {
      message.push(textArry[i]);
      
  
      if ((i )== 3) {
        message3x3.push(message);
        message=[];
      
      }
    }
    console.log("to3x3Array");
    console.log(message3x3);
    return message3x3;
  };

 console.log( to3x3Array("hola"));