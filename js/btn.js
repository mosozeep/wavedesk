const icon = document.getElementsByClassName("icon");
const close = document.getElementsByClassName("close");
const display__btn = document.getElementsByClassName("js-display");
const border__btn = document.getElementById("js-border");

function handleIconClick(event){
  const value = event.target.value;
  const box = document.getElementById(`${value}`);
  box.classList.add("show");
}

function handleCloseClick(event){
  const value = event.target.value;
  const box = document.getElementById(`${value}`);
  box.classList.remove("show");
}

function handleDisplayClick(event){
  const id = event.target.id;
  let value = event.target.value;
  const show = document.getElementsByClassName(`${id}`);
if (value === "show") {
  Array.from(show).forEach(shows => shows.classList.add("show"));
  event.target.classList.add("display__btn--reverse");
  event.target.value = "hidden";
}else {
  Array.from(show).forEach(shows => shows.classList.remove("show"));
  event.target.classList.remove("display__btn--reverse");
  event.target.value = "show";
}
}

function handleBorderClick(event){
  const border = document.getElementsByClassName("js-purple");
  const border_reverse = document.getElementsByClassName("js-purple--reverse");
  let value = event.target.value;
  if (value === "purple") {
    Array.from(border).forEach(purple => purple.classList.add("purple"));
    Array.from(border_reverse).forEach(purple => purple.classList.add("purple--reverse"));
    event.target.classList.add("display__btn--reverse");
    event.target.value ="gray";
  }else {
    Array.from(border).forEach(purple => purple.classList.remove("purple"));
    Array.from(border_reverse).forEach(purple => purple.classList.remove("purple--reverse"));
    event.target.classList.remove("display__btn--reverse");
    event.target.value ="purple";
  }
}

  Array.from(icon).forEach(icons  => icons.addEventListener("click", handleIconClick));

  Array.from(close).forEach(btn => btn.addEventListener("click", handleCloseClick));

  Array.from(display__btn).forEach(btn => btn.addEventListener("click",handleDisplayClick));

  border__btn.addEventListener("click",handleBorderClick);
