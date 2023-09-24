const colorPicker = document.getElementById("color");
const reset = document.getElementsByTagName("button")[0];

colorPicker.addEventListener("input", () => {
  document.body.style.backgroundColor = colorPicker.value;
})

reset.addEventListener("click", () => {
  colorPicker.value = "#000000";
  document.body.style.backgroundColor = "#f0f0f0";
})