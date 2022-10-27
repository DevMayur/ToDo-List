var deleteSelected = document.getElementById("delete-selected-button");
deleteSelected.addEventListener("click", function () {
    var checkboxes = document.getElementsByClassName("checkbox-class");
    var values = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            values.push(checkboxes[i].value);
        }
    }
    const request = new XMLHttpRequest();
    request.open("POST", "/delete-selected-request", true);
    request.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
    );
    request.send("ids=" + values);
});
