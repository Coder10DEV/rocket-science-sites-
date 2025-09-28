document.addEventListener("DOMContentLoaded", () => {
  const commentsContainer = document.querySelector(".comments-container");
  const usernameInput = document.querySelector(".username");
  const emailInput = document.querySelector(".email");
  const commentBox = document.querySelector(".comment-textarea");
  const publishBtn = document.querySelector(".publish-btn");
  const cancelBtn = document.querySelector(".cancel-btn");

  let savedComments = JSON.parse(localStorage.getItem("comments")) || [];

  function renderComments() {
    // Remove all existing comment-box elements (except main form)
    commentsContainer.querySelectorAll(".comment-box").forEach(el => el.remove());

    savedComments.forEach((comment, index) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment-box");
      commentDiv.dataset.index = index;
      commentDiv.innerHTML = `
        <div class="avatar"></div>
        <div class="comment-content">
          <div class="comment-header">
            ${comment.username} <span class="comment-date">${comment.date}</span>
          </div>
          <div class="comment-text">${comment.text}</div>
          <span class="comment-actions like-btn">Like (${comment.likes})</span>
          <span class="comment-actions reply-btn">Reply</span>
          <div class="reply-box"></div>
        </div>
      `;
      commentsContainer.appendChild(commentDiv);

      // Render replies
      comment.replies.forEach(reply => {
        const replyDiv = document.createElement("div");
        replyDiv.classList.add("comment-box");
        replyDiv.style.marginLeft = "40px";
        replyDiv.innerHTML = `
          <div class="avatar"></div>
          <div class="comment-content">
            <div class="comment-header">${reply.username} <span class="comment-date">${reply.date}</span></div>
            <div class="comment-text">${reply.text}</div>
            <span class="comment-actions like-btn">Like (${reply.likes})</span>
          </div>
        `;
        commentDiv.querySelector(".reply-box").appendChild(replyDiv);
      });
    });
  }

  renderComments();

  // Publish main comment
  publishBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const text = commentBox.value.trim();
    if (!username || !text) return alert("Please enter a username and comment!");

    savedComments.push({
      username,
      text,
      likes: 0,
      date: new Date().toLocaleString(),
      replies: []
    });
    localStorage.setItem("comments", JSON.stringify(savedComments));

    usernameInput.value = "";
    emailInput.value = "";
    commentBox.value = "";

    renderComments();
  });

  cancelBtn.addEventListener("click", () => {
    usernameInput.value = "";
    emailInput.value = "";
    commentBox.value = "";
  });

  // Handle like & reply clicks using event delegation
  commentsContainer.addEventListener("click", (e) => {
    const parentCommentDiv = e.target.closest(".comment-box");
    if (!parentCommentDiv) return;

    const commentIndex = parentCommentDiv.dataset.index;
    if (e.target.classList.contains("like-btn")) {
      if (commentIndex !== undefined) {
        savedComments[commentIndex].likes++;
      } else {
        // It's a reply
        const mainCommentDiv = parentCommentDiv.closest(".comment-box[data-index]");
        const mainIndex = mainCommentDiv.dataset.index;
        const replyText = parentCommentDiv.querySelector(".comment-text").textContent;
        const replyObj = savedComments[mainIndex].replies.find(r => r.text === replyText);
        if (replyObj) replyObj.likes++;
      }
      localStorage.setItem("comments", JSON.stringify(savedComments));
      renderComments();
    }

    if (e.target.classList.contains("reply-btn")) {
      // Only allow one reply form per comment
      if (parentCommentDiv.querySelector(".reply-form")) return;

      const replyForm = document.createElement("div");
      replyForm.classList.add("reply-form");
      replyForm.innerHTML = `
        <input type="text" placeholder="Username*" class="comment-input username">
        <textarea placeholder="Write a reply..." class="comment-textarea"></textarea>
        <div class="comment-actions-row">
          <span class="cancel-btn">Cancel</span>
          <button class="publish-btn">Publish</button>
        </div>
      `;
      parentCommentDiv.querySelector(".reply-box").appendChild(replyForm);

      // Cancel reply
      replyForm.querySelector(".cancel-btn").addEventListener("click", () => replyForm.remove());

      // Publish reply
      replyForm.querySelector(".publish-btn").addEventListener("click", () => {
        const username = replyForm.querySelector(".username").value.trim();
        const text = replyForm.querySelector(".comment-textarea").value.trim();
        if (!username || !text) return alert("Please enter username and reply!");

        savedComments[commentIndex].replies.push({
          username,
          text,
          likes: 0,
          date: new Date().toLocaleString()
        });
        localStorage.setItem("comments", JSON.stringify(savedComments));
        renderComments();
      });
    }
  });
});
