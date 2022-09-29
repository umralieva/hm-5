function GenerateHexNumber() {
    const HEX_MAX = 255;
    const HEX_MIN = 0;
  
    const randNumber = Math.round(Math.random() * (HEX_MAX - HEX_MIN) + HEX_MIN);
    return randNumber.toString(16).toUpperCase().padStart(2, "0");
  }
  
  function ChangeColor() {
    var redHex = GenerateHexNumber();
    var greenHex = GenerateHexNumber();
    var blueHex = GenerateHexNumber();
    var colorHex = ["#", redHex, greenHex, blueHex].join("");
    var wrapperElement = document.querySelector(".wrapper");
    var colorTextElement =
      wrapperElement.getElementsByClassName("background-color")[0];
    colorTextElement.innerHTML = colorHex;
    document.body.style.background = colorHex;
  }
  
  
  
  //DOM - Documnt Object Model
  
  var button = document.getElementById("color-btn");
  button.addEventListener("click", ChangeColor);