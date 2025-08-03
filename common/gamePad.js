let gamepadIndex = null;
const repeatDelay = 300;
const repeatInterval = 100;
let repeatTimers = {};

// Add "Triangle" to forward controls
const controls = {
  forward: ['RT', 'RB', 'DPadRight', 'Triangle'],
  backward: ['LT', 'LB', 'DPadLeft']
};

// Get button state
function getState(gp) {
  return {
    LT: gp.buttons[6]?.value > 0.5,
    RT: gp.buttons[7]?.value > 0.5,
    LB: gp.buttons[4]?.pressed,
    RB: gp.buttons[5]?.pressed,
    DPadLeft: gp.buttons[14]?.pressed,
    DPadRight: gp.buttons[15]?.pressed,
    Triangle: gp.buttons[0]?.pressed, // ✅ Triangle button
    X: gp.buttons[2]?.pressed,
    Circle: gp.buttons[1]?.pressed
  };
}

// Focus logic
function focusNext(reverse = false) {
  const focusables = Array.from(document.querySelectorAll("input, button, [tabindex]"))
    .filter(el => !el.disabled && el.tabIndex >= 0);

  if (focusables.length === 0) return;
  const current = document.activeElement;
  const i = focusables.indexOf(current);
  const next = reverse
    ? (i - 1 + focusables.length) % focusables.length
    : (i + 1) % focusables.length;

  focusables[next].focus();
}

// Repeating input support
function handleRepeat(name, action) {
  if (repeatTimers[name]) return;
  action();
  const delayId = setTimeout(() => {
    repeatTimers[name] = setInterval(action, repeatInterval);
  }, repeatDelay);
  repeatTimers[name] = { delay: delayId };
}

function clearRepeat(name) {
  const t = repeatTimers[name];
  if (t) {
    if (t.delay) clearTimeout(t.delay);
    else clearInterval(t);
    delete repeatTimers[name];
  }
}

// Track previous states
let prevX = false;
let prevCircle = false;

function loop() {
  const gp = navigator.getGamepads()[gamepadIndex];
  if (!gp) return requestAnimationFrame(loop);
  const state = getState(gp);

  for (const name of controls.forward) {
    if (state[name]) handleRepeat(name, () => focusNext(false));
    else clearRepeat(name);
  }

  for (const name of controls.backward) {
    if (state[name]) handleRepeat(name, () => focusNext(true));
    else clearRepeat(name);
  }

  if (state.X && !prevX) {
    const el = document.activeElement;
    if (el && typeof el.click === 'function') el.click();
  }

  if (state.Circle && !prevCircle) {
    console.log("http://" + window.location.hostname + "/math-improver/")
  if (window.location.href !== "http://" + window.location.hostname + "/math-improver/") {
    //window.history.back();
  } else {
    focusNext(true); // Move focus backward on the main page
  }
}

  prevX = state.X;
  prevCircle = state.Circle;

  requestAnimationFrame(loop);
}

// Gamepad events
window.addEventListener("gamepadconnected", (e) => {
  gamepadIndex = e.gamepad.index;
  console.log("Gamepad connected:", e.gamepad.id);
  loop();
});

window.addEventListener("gamepaddisconnected", () => {
  console.log("Gamepad disconnected");
  gamepadIndex = null;
});
