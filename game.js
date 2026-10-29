(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const screens = ["welcome-screen", "game-screen", "letter-screen", "gallery-screen", "final-screen", "scrapbook-screen"];
  const canvas = $("game-canvas");
  const ctx = canvas.getContext("2d");

  let flowers = 0;
  let snake = [];
  let direction = { x: 1, y: 0 };
  let nextDirection = { x: 1, y: 0 };
  let food = { x: 10, y: 10 };
  let timer = null;
  let running = false;
  let paused = true;
  let gameOver = false;
  let currentLetter = null;
  let returnScreen = "game-screen";
  let pendingLetters = [];
  let galleryOpened = false;
  let currentSpeed = 125;
  let toastTimer = null;

  const gridSize = 24;
  const cell = canvas.width / gridSize;
  const opened = new Set();
  const unlocked = new Set();

  function showScreen(id) {
    screens.forEach((screenId) => $(screenId).classList.toggle("active", screenId === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toast(message) {
    const el = $("toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function updateProgress() {
    $("score").textContent = String(flowers);
    $("progress-text").textContent = `Letters discovered: ${opened.size} / ${friends.length}`;
    const next = friends.find((f) => !unlocked.has(f.id));
    $("next-letter-text").textContent = next
      ? `${Math.max(0, next.flowerThreshold - flowers)} flower${next.flowerThreshold - flowers === 1 ? "" : "s"} until a letter`
      : "All your letters are waiting ♡";
    $("letters-button").title = `Scrapbook: ${opened.size} of ${friends.length} letters read`;
  }

  function stopLoop() {
    if (timer !== null) clearInterval(timer);
    timer = null;
    running = false;
  }

  function startLoop() {
    stopLoop();
    if (paused || gameOver) return;
    running = true;
    timer = setInterval(tick, currentSpeed);
  }

  function setOverlay(title, copy, buttonText, callback) {
    $("overlay-title").textContent = title;
    $("overlay-copy").textContent = copy;
    $("overlay-button").textContent = buttonText;
    $("overlay-button").onclick = callback;
    $("game-overlay").classList.remove("hidden");
  }

  function hideOverlay() {
    $("game-overlay").classList.add("hidden");
  }

  function resetSnake() {
    snake = [
      { x: 9, y: 12 },
      { x: 8, y: 12 },
      { x: 7, y: 12 },
      { x: 6, y: 12 }
    ];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    gameOver = false;
    paused = false;
    currentSpeed = 125;
    spawnFood();
    hideOverlay();
    draw();
    startLoop();
  }

  function newGame() {
    flowers = 0;
    opened.clear();
    unlocked.clear();
    pendingLetters = [];
    galleryOpened = false;
    resetSnake();
    updateProgress();
    showScreen("game-screen");
  }

  function spawnFood() {
    let candidate;
    do {
      candidate = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      };
    } while (snake.some((part) => part.x === candidate.x && part.y === candidate.y));
    food = candidate;
  }

  function setDirection(name) {
    if (paused || gameOver) return;
    const directions = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 }
    };
    const candidate = directions[name];
    if (!candidate) return;
    if (candidate.x === -direction.x && candidate.y === -direction.y) return;
    nextDirection = candidate;
  }

  function tick() {
    direction = nextDirection;
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    const hitWall = head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize;
    const eating = head.x === food.x && head.y === food.y;
    const bodyToCheck = eating ? snake : snake.slice(0, -1);
    const hitSelf = bodyToCheck.some((part) => part.x === head.x && part.y === head.y);

    if (hitWall || hitSelf) {
      stopLoop();
      paused = true;
      gameOver = true;
      setOverlay("Oopsie! ♡", "Even the loveliest snakes need a little reset. Your flowers and letters are safe.", "Try again", () => {
        resetSnake();
        showScreen("game-screen");
      });
      return;
    }

    snake.unshift(head);
    if (eating) {
      flowers += 1;
      currentSpeed = Math.max(72, 125 - Math.floor(flowers / 5) * 5);
      spawnFood();
      updateProgress();
      queueNewLetters();
    } else {
      snake.pop();
    }
    draw();
  }

  function queueNewLetters() {
    friends.forEach((friend) => {
      if (flowers >= friend.flowerThreshold && !unlocked.has(friend.id)) {
        unlocked.add(friend.id);
        pendingLetters.push(friend);
      }
    });
    if (pendingLetters.length) {
      stopLoop();
      paused = true;
      showNextLetter();
    } else if (friends.every((friend) => opened.has(friend.id)) && !galleryOpened) {
      stopLoop();
      paused = true;
      showGalleryPrompt();
    }
  }

  function showNextLetter() {
    if (!pendingLetters.length) {
      if (friends.every((friend) => opened.has(friend.id)) && !galleryOpened) showGalleryPrompt();
      else {
        paused = false;
        startLoop();
        showScreen("game-screen");
      }
      return;
    }

    currentLetter = pendingLetters.shift();
    opened.add(currentLetter.id);
    $("letter-heading").textContent = `Dear ${birthdayConfig.recipient},`;
    $("letter-message").textContent = currentLetter.message;
    $("letter-animal-name").textContent = currentLetter.animal.name;
    $("letter-animal-reason").textContent = currentLetter.animal.reason;
    $("letter-animal-image").src = currentLetter.animal.image;
    $("letter-animal-image").alt = currentLetter.animal.alt || currentLetter.animal.name;
    $("letter-from").textContent = `All my love, ${currentLetter.name} ♡`;
    $("continue-button").textContent = pendingLetters.length ? "Read the next letter ♡" : "Back to the garden ♡";
    updateProgress();
    showScreen("letter-screen");
  }

  function showGalleryPrompt() {
    stopLoop();
    paused = true;
    showScreen("game-screen");
    setOverlay("You found every little letter! ♡", "Your animal gallery is ready. Take a look at how your people see you.", "Open the animal gallery", () => {
      hideOverlay();
      galleryOpened = true;
      renderGallery();
      showScreen("gallery-screen");
    });
  }

  function drawFlower(x, y) {
    const cx = x * cell + cell / 2;
    const cy = y * cell + cell / 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.fillStyle = "#e98ab0";
    for (let i = 0; i < 6; i++) {
      ctx.rotate(Math.PI / 3);
      ctx.beginPath();
      ctx.ellipse(0, -cell * .19, cell * .105, cell * .16, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#f8d96f";
    ctx.beginPath();
    ctx.arc(0, 0, cell * .105, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawSnakePart(part, index) {
    const pad = index === 0 ? 2 : 3;
    const x = part.x * cell + pad;
    const y = part.y * cell + pad;
    const size = cell - pad * 2;
    ctx.fillStyle = index === 0 ? "#c64f83" : (index % 2 ? "#e98ab0" : "#df78a1");
    ctx.beginPath();
    ctx.roundRect(x, y, size, size, index === 0 ? 7 : 5);
    ctx.fill();
    if (index === 0) {
      // Tiny bow.
      ctx.fillStyle = "#fff9f0";
      ctx.beginPath();
      ctx.arc(x + size * .35, y + size * .22, 2.1, 0, Math.PI * 2);
      ctx.arc(x + size * .65, y + size * .22, 2.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#593849";
      const eye1 = direction.x === 1 ? x + size * .72 : direction.x === -1 ? x + size * .25 : x + size * .34;
      const eye2 = direction.x === 1 ? x + size * .72 : direction.x === -1 ? x + size * .25 : x + size * .66;
      ctx.beginPath();
      ctx.arc(eye1, y + size * .58, 1.4, 0, Math.PI * 2);
      ctx.arc(eye2, y + size * .78, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff9f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#f6e3eb";
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cell, 0);
      ctx.lineTo(i * cell, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cell);
      ctx.lineTo(canvas.width, i * cell);
      ctx.stroke();
    }
    drawFlower(food.x, food.y);
    snake.forEach(drawSnakePart);
  }

  function renderGallery() {
    const gallery = $("animal-gallery");
    gallery.replaceChildren();
    friends.forEach((friend) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "animal-card";
      card.setAttribute("aria-label", `Read ${friend.name}'s animal note`);
      const img = document.createElement("img");
      img.src = friend.animal.image;
      img.alt = friend.animal.alt || friend.animal.name;
      const name = document.createElement("strong");
      name.textContent = friend.animal.name;
      const contributor = document.createElement("small");
      contributor.textContent = `Chosen by ${friend.name}`;
      const reason = document.createElement("p");
      reason.textContent = friend.animal.reason;
      card.append(img, name, contributor, reason);
      card.addEventListener("click", () => {
        currentLetter = friend;
        $("letter-heading").textContent = `Dear ${birthdayConfig.recipient},`;
        $("letter-message").textContent = friend.message;
        $("letter-animal-name").textContent = friend.animal.name;
        $("letter-animal-reason").textContent = friend.animal.reason;
        $("letter-animal-image").src = friend.animal.image;
        $("letter-animal-image").alt = friend.animal.alt || friend.animal.name;
        $("letter-from").textContent = `All my love, ${friend.name} ♡`;
        returnScreen = "gallery-screen";
        $("continue-button").textContent = "Back to the gallery ♡";
        showScreen("letter-screen");
      });
      gallery.append(card);
    });
  }

  function renderScrapbook() {
    const list = $("scrapbook-list");
    list.replaceChildren();
    const readFriends = friends.filter((friend) => opened.has(friend.id));
    if (!readFriends.length) {
      const empty = document.createElement("div");
      empty.className = "empty-scrapbook";
      empty.textContent = "Your letters will live here after you discover them. Collect your first flowers to get started! ♡";
      list.append(empty);
      return;
    }
    readFriends.forEach((friend) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "scrapbook-entry";
      const img = document.createElement("img");
      img.src = friend.animal.image;
      img.alt = "";
      const textWrap = document.createElement("span");
      const strong = document.createElement("strong");
      strong.textContent = `A letter from ${friend.name}`;
      const small = document.createElement("small");
      small.textContent = `Animal: ${friend.animal.name}`;
      textWrap.append(strong, small);
      button.append(img, textWrap);
      button.addEventListener("click", () => {
        currentLetter = friend;
        $("letter-heading").textContent = `Dear ${birthdayConfig.recipient},`;
        $("letter-message").textContent = friend.message;
        $("letter-animal-name").textContent = friend.animal.name;
        $("letter-animal-reason").textContent = friend.animal.reason;
        $("letter-animal-image").src = friend.animal.image;
        $("letter-animal-image").alt = friend.animal.alt || friend.animal.name;
        $("letter-from").textContent = `All my love, ${friend.name} ♡`;
        returnScreen = "scrapbook-screen";
        $("continue-button").textContent = "Back to your scrapbook ♡";
        showScreen("letter-screen");
      });
      list.append(button);
    });
  }

  function showFinal() {
    $("final-message").textContent = birthdayConfig.finalMessage;
    $("chimera-image").src = birthdayConfig.chimeraImage;
    $("chimera-image").onerror = () => {
      $("chimera-image").style.display = "none";
      $("chimera-placeholder").style.display = "flex";
    };
    $("chimera-image").onload = () => {
      $("chimera-image").style.display = "block";
      $("chimera-placeholder").style.display = "none";
    };
    showScreen("final-screen");
  }

  $("start-button").addEventListener("click", () => {
    if (!snake.length) resetSnake();
    showScreen("game-screen");
  });

  $("continue-button").addEventListener("click", () => {
    if (returnScreen !== "game-screen") {
      showScreen(returnScreen);
      return;
    }
    if (pendingLetters.length) {
      showNextLetter();
      return;
    }
    if (friends.every((friend) => opened.has(friend.id)) && !galleryOpened) {
      showGalleryPrompt();
      return;
    }
    paused = false;
    hideOverlay();
    showScreen("game-screen");
    startLoop();
  });

  $("reveal-button").addEventListener("click", showFinal);
  $("revisit-button").addEventListener("click", () => {
    renderScrapbook();
    showScreen("scrapbook-screen");
  });
  $("scrapbook-back-button").addEventListener("click", () => showScreen("final-screen"));
  $("play-again-button").addEventListener("click", () => {
    newGame();
  });
  $("letters-button").addEventListener("click", () => {
    returnScreen = screens.find((id) => $(id).classList.contains("active")) || "game-screen";
    renderScrapbook();
    showScreen("scrapbook-screen");
  });
  $("pause-button").addEventListener("click", () => {
    if (gameOver) return;
    if (!paused) {
      paused = true;
      stopLoop();
      setOverlay("Taking a little break ♡", "Your flowers and letters are safe. Ready when you are.", "Keep playing", () => {
        hideOverlay();
        paused = false;
        startLoop();
      });
    } else {
      paused = false;
      hideOverlay();
      startLoop();
    }
  });
  $("restart-button").addEventListener("click", () => {
    resetSnake();
    showScreen("game-screen");
  });
  document.querySelectorAll("[data-direction]").forEach((button) => {
    button.addEventListener("click", () => setDirection(button.dataset.direction));
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    const map = {
      arrowup: "up", w: "up",
      arrowdown: "down", s: "down",
      arrowleft: "left", a: "left",
      arrowright: "right", d: "right"
    };
    if (map[key]) {
      event.preventDefault();
      setDirection(map[key]);
    }
    if (key === " " && $("game-screen").classList.contains("active") && !gameOver) {
      event.preventDefault();
      $("pause-button").click();
    }
  });

  // Prevent the page from scrolling while swiping on the game board.
  let touchStart = null;
  canvas.addEventListener("touchstart", (event) => {
    const touch = event.changedTouches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  canvas.addEventListener("touchend", (event) => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) > 18) {
      setDirection(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
    }
    touchStart = null;
  }, { passive: true });

  // Seed the game board and initial UI.
  document.title = birthdayConfig.title + " ♡";
  $("final-message").textContent = birthdayConfig.finalMessage;
  updateProgress();
  draw();
})();
