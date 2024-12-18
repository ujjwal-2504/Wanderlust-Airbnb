const options = document.getElementsByClassName("custom-select")[0].options;
for (option of options) {
  if (option.value === "<%=data.category%>") {
    option.selected = true; // This selects current category
    break;
  }
}
