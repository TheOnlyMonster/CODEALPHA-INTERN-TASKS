const celsius = document.getElementById("celsius").firstElementChild;
const fahrenheit = document.getElementById("fahrenheit").firstElementChild;
const kelvin = document.getElementById("kelvin").firstElementChild;
const reset = document.getElementsByTagName("button")[0];
celsius.addEventListener("input", () => {
  if (celsius.value === "") {
    fahrenheit.value = "";
    kelvin.value = "";
    return;
  }
  const c = +celsius.value;
  const f = c * (9 / 5) + 32;
  const k = c + 273.15;
  fahrenheit.value = f;
  kelvin.value = k;
});

fahrenheit.addEventListener("input", () => {
  if (fahrenheit.value === "") {
    celsius.value = "";
    kelvin.value = "";
    return;
  }
  const f = +fahrenheit.value;
  const c = (f - 32) * (5 / 9);
  const k = (f - 32) * (5 / 9) + 273.15;
  celsius.value = c;
  kelvin.value = k;
});

kelvin.addEventListener("input", () => {
  if (kelvin.value === "") {
    celsius.value = "";
    fahrenheit.value = "";
    return;
  }
  const k = +kelvin.value;
  const c = k - 273.15;
  const f = (k - 273.15) * (9 / 5) + 32;
  celsius.value = c;
  fahrenheit.value = f;
});

reset.addEventListener("click", () => {
  celsius.value = "";
  fahrenheit.value = "";
  kelvin.value = "";
});
