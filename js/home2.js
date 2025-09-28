document.addEventListener("DOMContentLoaded", () => {
  const commentsContainer = document.querySelector(".comments-container");
  const publishBtn = document.querySelector(".publish-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const usernameInput = document.querySelector(".username");
  const emailInput = document.querySelector(".email");
  const commentBox = document.querySelector(".comment-textarea");

  // Load comments from localStorage
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  savedComments.forEach(comment => renderComment(comment, commentsContainer));

  // Publish main comment
  publishBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const commentText = commentBox.value.trim();

    if (!username || !commentText) {
      alert("Please enter a username and comment!");
      return;
    }

    const commentObj = {
      id: Date.now(),
      username,
      text: commentText,
      likes: 0,
      replies: []
    };

    savedComments.push(commentObj);
    localStorage.setItem("comments", JSON.stringify(savedComments));

    renderComment(commentObj, commentsContainer);

    // Clear form
    usernameInput.value = "";
    emailInput.value = "";
    commentBox.value = "";
  });

  // Cancel main comment
  cancelBtn.addEventListener("click", () => {
    usernameInput.value = "";
    emailInput.value = "";
    commentBox.value = "";
  });

  // Render a comment
  function renderComment(comment, container) {
    const commentBoxDiv = document.createElement("div");
    commentBoxDiv.classList.add("comment-box");
    commentBoxDiv.dataset.id = comment.id;

    commentBoxDiv.innerHTML = `
      <div class="avatar"></div>
      <div class="comment-content">
        <div class="comment-header">${comment.username} <span class="comment-date">Just now</span></div>
        <div class="comment-text">${comment.text}</div>
        <span class="comment-actions like-btn">Like (${comment.likes})</span>
        <span class="comment-actions reply-btn">Reply</span>
        <div class="reply-box"></div>
      </div>
    `;

    container.appendChild(commentBoxDiv);

    const likeBtn = commentBoxDiv.querySelector(".like-btn");
    const replyBtn = commentBoxDiv.querySelector(".reply-btn");
    const replyBox = commentBoxDiv.querySelector(".reply-box");

    // Like button
    likeBtn.addEventListener("click", () => {
      comment.likes++;
      likeBtn.textContent = `Like (${comment.likes})`;
      localStorage.setItem("comments", JSON.stringify(savedComments));
    });

    // Reply button
    replyBtn.addEventListener("click", () => {
      // Prevent multiple reply forms
      if (replyBox.querySelector(".reply-form")) return;

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
      replyBox.appendChild(replyForm);

      const replyUsername = replyForm.querySelector(".username");
      const replyText = replyForm.querySelector(".comment-textarea");
      const replyPublish = replyForm.querySelector(".publish-btn");
      const replyCancel = replyForm.querySelector(".cancel-btn");

      // Cancel reply
      replyCancel.addEventListener("click", () => replyForm.remove());

      // Publish reply
      replyPublish.addEventListener("click", () => {
        const name = replyUsername.value.trim();
        const text = replyText.value.trim();
        if (!name || !text) return alert("Enter username and reply!");

        const replyObj = { id: Date.now(), username: name, text, likes: 0 };
        comment.replies.push(replyObj);
        localStorage.setItem("comments", JSON.stringify(savedComments));

        // Render reply
        const replyDiv = document.createElement("div");
        replyDiv.classList.add("comment-box");
        replyDiv.innerHTML = `
          <div class="avatar"></div>
          <div class="comment-content">
            <div class="comment-header">${replyObj.username} <span class="comment-date">Just now</span></div>
            <div class="comment-text">${replyObj.text}</div>
            <span class="comment-actions like-btn">Like (${replyObj.likes})</span>
          </div>
        `;
        replyBox.appendChild(replyDiv);

        // Like button for reply
        const replyLikeBtn = replyDiv.querySelector(".like-btn");
        replyLikeBtn.addEventListener("click", () => {
          replyObj.likes++;
          replyLikeBtn.textContent = `Like (${replyObj.likes})`;
          localStorage.setItem("comments", JSON.stringify(savedComments));
        });

        replyForm.remove();
      });
    });

    // Load replies if exist
    if (comment.replies && comment.replies.length > 0) {
      comment.replies.forEach(replyObj => {
        const replyDiv = document.createElement("div");
        replyDiv.classList.add("comment-box");
        replyDiv.innerHTML = `
          <div class="avatar"></div>
          <div class="comment-content">
            <div class="comment-header">${replyObj.username} <span class="comment-date">Just now</span></div>
            <div class="comment-text">${replyObj.text}</div>
            <span class="comment-actions like-btn">Like (${replyObj.likes})</span>
          </div>
        `;
        replyBox.appendChild(replyDiv);

        const replyLikeBtn = replyDiv.querySelector(".like-btn");
        replyLikeBtn.addEventListener("click", () => {
          replyObj.likes++;
          replyLikeBtn.textContent = `Like (${replyObj.likes})`;
          localStorage.setItem("comments", JSON.stringify(savedComments));
        });
      });
    }
  }
});
