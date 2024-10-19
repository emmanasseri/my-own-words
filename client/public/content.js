const saveBtn = document.getElementById("save-btn")

saveBtn.addEventListener("click", function(){
    console.log(window.getSelection().toString())
})