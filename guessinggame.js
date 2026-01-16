const minNumber = 1;
const maxNumber = 100;

let answer = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
let attempts = 0;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  backgroundColor: "#0f172a",
  scene: { create }
};

new Phaser.Game(config);

function create() {
  const cx = this.cameras.main.centerX;

  this.add.text(cx, 60, "🎯 Guess the Number (1–100)", {
    fontSize: "28px",
    color: "#ffffff"
  }).setOrigin(0.5);

  const infoText = this.add.text(cx, 130, "Enter your guess", {
    fontSize: "20px",
    color: "#e5e7eb"
  }).setOrigin(0.5);

  const attemptsText = this.add.text(cx, 170, "Attempts: 0", {
    fontSize: "18px",
    color: "#94a3b8"
  }).setOrigin(0.5);

  const input = document.createElement("input");
  input.type = "number";
  input.min = minNumber;
  input.max = maxNumber;
  input.style.position = "absolute";
  input.style.top = "260px";
  input.style.left = "50%";
  input.style.transform = "translateX(-50%)";
  input.style.padding = "10px";
  document.body.appendChild(input);

  const button = document.createElement("button");
  button.innerText = "Guess";
  button.style.position = "absolute";
  button.style.top = "310px";
  button.style.left = "50%";
  button.style.transform = "translateX(-50%)";
  button.style.padding = "10px 20px";
  document.body.appendChild(button);

  input.focus();

  button.onclick = () => {
    const guess = Number(input.value);

    if (isNaN(guess)) {
      infoText.setText("❌ Enter a valid number");
      return;
    }

    attempts++;
    attemptsText.setText(`Attempts: ${attempts}`);

    if (guess < answer) infoText.setText("📉 Too low!");
    else if (guess > answer) infoText.setText("📈 Too high!");
    else {
      infoText.setText(`✅ Correct! Answer: ${answer}`);
      button.disabled = true;
    }
  };
}
