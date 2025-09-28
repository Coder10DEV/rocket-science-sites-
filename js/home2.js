document.addEventListener("DOMContentLoaded", () => {
  const commentsContainer = document.querySelector(".comments-container");
  const publishBtn = document.querySelector(".publish-btn");
  const cancelBtn = document.querySelector(".cancel-btn");

  // Load and render comments from localStorage
  function loadComments() {
    return JSON.parse(localStorage.getItem("comments") || "[]");
  }

  function saveComments(comments) {
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  function renderComments() {
    const comments = loadComments();
    const form = commentsContainer.querySelector(".comment-form");
    
    // Clear all comments except the form
    commentsContainer.innerHTML = "";
    commentsContainer.appendChild(form);

    comments.forEach((comment, index) => {
      const div = document.createElement("div");
      div.classList.add("comment-box");
      div.innerHTML = `
        <div class="avatar"></div>
        <div class="comment-content">
          <div class="comment-header">
            ${comment.username} <span class="comment-date">${comment.date}</span>
          </div>
          <div class="comment-text">${comment.text}</div>
          <span class="comment-actions like-btn" data-index="${index}">Like (${comment.likes || 0})</span>
        </div>
      `;
      commentsContainer.appendChild(div);
    });
  }

  renderComments();

  // Publish comment
  publishBtn.addEventListener("click", () => {
    const username = document.querySelector(".username").value.trim();
    const commentText = document.querySelector(".comment-textarea").value.trim();

    if (!username || !commentText) return alert("Please add username and comment!");

    const comments = loadComments();
    comments.push({
      username,
      text: commentText,
      date: new Date().toLocaleString(),
      likes: 0
    });

    saveComments(comments);
    renderComments();

    document.querySelector(".username").value = "";
    document.querySelector(".comment-textarea").value = "";
  });

  // Cancel button
  cancelBtn.addEventListener("click", () => {
    document.querySelector(".username").value = "";
    document.querySelector(".comment-textarea").value = "";
  });

  // Like button handler
  commentsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-btn")) {
      const index = e.target.getAttribute("data-index");
      const comments = loadComments();
      comments[index].likes = (comments[index].likes || 0) + 1;
      saveComments(comments);
      renderComments();
    }
  });

  // Listen for changes in other tabs
  window.addEventListener("storage", (e) => {
    if (e.key === "comments") {
      renderComments();
    }
  });
});
