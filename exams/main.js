function clearBody(params) {
    var i = 0;
    document.querySelectorAll("body > *").forEach(function (e) {
      if (i > 3) {
        e.remove();
      }
      i++;
    });
  }
function hovering() {
    
    var focusableElements = document.querySelectorAll('[tabindex]');
    console.log(focusableElements)
    focusableElements.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
        el.focus();
    });
    el.addEventListener('mouseleave', function () {
        el.blur();
    });
    });
}
function fullScreen() {
    
    var fullScreenBtn = document.getElementById("full-screen");
    if (fullScreenBtn) {
    fullScreenBtn.addEventListener("click", function () {
        var isFullscreen = !!document.fullscreenElement;
        if (isFullscreen) {
        document.exitFullscreen().then(function () {
            fullScreenBtn.classList.remove("fullscreen-on");
        }).catch(function (err) {
            console.error("Fullscreen exit failed:", err);
        });
        } else {
        document.documentElement.requestFullscreen().then(function () {
            fullScreenBtn.classList.add("fullscreen-on");
        }).catch(function (err) {
            console.error("Fullscreen request failed:", err);
        });
        }
    });
    }
}
function mode() {
    
    var moodScreenBtn = document.getElementById("mode");
    if (moodScreenBtn) {
    moodScreenBtn.addEventListener("click", function () {
        var dark = moodScreenBtn.classList.contains("dark");

        if (dark) {
        moodScreenBtn.classList.remove("dark");
        document.body.style.filter = "invert(0)";
        document.querySelector("video").style.filter = "invert(0)";
        } else {
        moodScreenBtn.classList.add("dark");
        document.body.style.filter = "invert(1)";
        document.querySelector("video").style.filter = "invert(1)";
        }
    });
    }
}

function init() {
    var examHolder = document.querySelector(".jump-box-5");
    console.log("Loaded JSOdgdfgN:");
    async function loadJSON() {

    try {
        const response = await fetch("exams.json");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const box = document.querySelector('.jump-box-5 > *');
        data.forEach((exam,i,list) => {
            box.innerHTML+=`<div class="exam" tabindex="${2+i}" >
                                <img src="../exam-logo-exam-paper-with-pencil-icon-AeAgPyRi_t-removebg-preview.png" alt="">
                                <div>${exam["type"]}</div>
                            </div>`
            // exam["questions"].forEach(question => {
            //     let ask = question["question"]
            //     let answer = question["correct answer"]
            //     let choices= question["choices"]
            // });
        });
        hovering()
    } catch (err) {
        console.error("Error loading JSON:", err);
    }
}

    loadJSON();
    hovering()
    fullScreen()
    mode()
}
export { init };