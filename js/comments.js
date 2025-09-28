document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("news-popup");
  const overlay = document.getElementById("news-overlay");
  const closeBtn = document.getElementById("close-news");

  // Show popup if not seen yet
  if (!localStorage.getItem("seenNews")) {
    popup.classList.add("show");
    overlay.classList.add("show");
    localStorage.setItem("seenNews", "true");
  }

  // Close popup
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("show");
    overlay.classList.remove("show");
  });
});
