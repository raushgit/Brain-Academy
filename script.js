function showContent(ageGroup) {
    document.getElementById("s2-content").style.display = "none";
    document.getElementById("s3-content").style.display = "none";
    document.getElementById("s4-content").style.display = "none";

    document.getElementById(ageGroup + "-content").style.display = "block";

    // Update active tab
    let buttons = document.querySelectorAll(".tab-btn");
    buttons.forEach(btn => btn.classList.remove("active"));

    if (ageGroup === "s2") {
        buttons[0].classList.add("active");
    } else if (ageGroup === "s3") {
        buttons[1].classList.add("active");
    } else {
        buttons[2].classList.add("active");
    }
}
