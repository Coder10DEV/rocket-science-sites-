document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("news-popup");
  const overlay = document.getElementById("news-overlay");
  const closeBtn = document.getElementById("close-news");

  // Show popup if the user hasn't seen it yet
  if (!localStorage.getItem("seenNews")) {
    popup.classList.add("show");
    overlay.classList.add("show");
    localStorage.setItem("seenNews", "true"); // mark as seen
  }

  // Close button hides popup and overlay
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("show");
    overlay.classList.remove("show");
  });
});
