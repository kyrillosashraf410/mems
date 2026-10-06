const inputField = document.querySelector(".inputField");
const showMemsScreen = document.querySelector(".showMemsScreen");
const button = document.querySelector(".btn");
//========= functions=================================
function removeInput() {
  inputField.value = "";
}

async function showMemes() {
  try {
    let index = Number(inputField.value);

    if (inputField.value.trim() !== "" && index >= 0 && index <= 99) {
      let getMems = await fetch("https://api.imgflip.com/get_memes");
      let dataLock = await getMems.json();
      let data = dataLock.data.memes;

      const selectMem = data[index];
      const screen = ` 
                    <h1>${selectMem.name}</h1>
                    <img src=" ${selectMem.url} " style="width: ${selectMem.width}px; height: ${selectMem.height}px;"/> `;
      showMemsScreen.innerHTML = screen;
    } else {
      showMemsScreen.innerHTML = "Please Enter a valid Number between 0 and 99";
    }
  } catch (error) {
    console.log((error.message = "the api is not valid "));
    showMemsScreen.innerHTML = error.message;
  }

  removeInput();
}

button.addEventListener("click", async () => {
  showMemes();
});

//=============================================================

inputField.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    showMemes();
  }
});
