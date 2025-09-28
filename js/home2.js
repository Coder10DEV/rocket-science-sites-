document.addEventListener("DOMContentLoaded", () => {
  const commentsContainer = document.querySelector(".comments-container");
  const mainForm = commentsContainer.querySelector(".comment-form");
  const usernameInput = mainForm.querySelector(".username");
  const emailInput = mainForm.querySelector(".email");
  const commentBox = mainForm.querySelector(".comment-textarea");
  const publishBtn = mainForm.querySelector(".publish-btn");
  const cancelBtn = mainForm.querySelector(".cancel-btn");

  // Load saved comments
  let savedComments = JSON.parse(localStorage.getItem("comments")) || [];

  function renderComments() {
    // Remove all existing comment-boxes except main form
    commentsContainer.querySelectorAll(".comment-box").forEach(el => el.remove());

    savedComments.forEach((comment, index) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment-box");
      commentDiv.dataset.index = index;
      commentDiv.innerHTML = `
        <div class="avatar"></div>
        <div class="comment-content">
          <div class="comment-header">${comment.username} <span class="comment-date">${comment.date}</span></div>
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

  // Main comment publish
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

  // Like & Reply
  commentsContainer.addEventListener("click", (e) => {
    const commentDiv = e.target.closest(".comment-box");
    if (!commentDiv) return;

    const mainIndex = commentDiv.dataset.index;

    if (e.target.classList.contains("like-btn")) {
      if (mainIndex !== undefined) {
        // Like main comment
        savedComments[mainIndex].likes++;
      } else {
        // Like reply
        const parentComment = commentDiv.closest(".comment-box[data-index]");
        const replyIndex = Array.from(parentComment.querySelectorAll(".reply-box > .comment-box")).indexOf(commentDiv);
        savedComments[parentComment.dataset.index].replies[replyIndex].likes++;
      }
      localStorage.setItem("comments", JSON.stringify(savedComments));
      renderComments();
    }

    if (e.target.classList.contains("reply-btn")) {
      if (commentDiv.querySelector(".reply-form")) return;

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

      commentDiv.querySelector(".reply-box").appendChild(replyForm);

      // Cancel reply
      replyForm.querySelector(".cancel-btn").addEventListener("click", () => replyForm.remove());

      // Publish reply
      replyForm.querySelector(".publish-btn").addEventListener("click", () => {
        const username = replyForm.querySelector(".username").value.trim();
        const text = replyForm.querySelector(".comment-textarea").value.trim();
        if (!username || !text) return alert("Enter username and reply!");

        savedComments[commentDiv.dataset.index].replies.push({
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
