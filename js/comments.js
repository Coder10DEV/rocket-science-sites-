document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("news-popup");
  const overlay = document.getElementById("news-overlay");
  const closeBtn = document.getElementById("close-news");

  // Show popup if the user hasn't seen it yet
  if (!localStorage.getItem("seenNews")) {
    popup.classList.add("show");
    overlay.classList.add("show");
    popup.style.display = "block"; // allow transition
    localStorage.setItem("seenNews", "true");
  }

  // Close button hides popup and overlay
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("show");
    overlay.classList.remove("show");

    // Wait for animation before hiding completely
    setTimeout(() => {
      popup.style.display = "none";
    }, 300); // match CSS transition time
  });
});
