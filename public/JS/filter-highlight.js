cat = filteredListings[0].category;
let op = document.getElementById(cat);
op.style.opacity = 1;
console.log(op);
let p = document.querySelector("#" + cat + " > p");
p.style.borderBottom = "2px solid #000";
