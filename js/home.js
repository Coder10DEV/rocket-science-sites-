document.addEventListener("DOMContentLoaded", () => {
  const commentsContainer = document.querySelector(".comments-container");
  const publishBtn = document.querySelector(".publish-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const usernameInput = document.querySelector(".username");
  const emailInput = document.querySelector(".email");
  const commentBox = document.querySelector(".comment-textarea");

  // Publish main comment
  publishBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const comment = commentBox.value.trim();
    if(!username || !comment) return alert("Please enter a username and comment!");

    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;

    const newComment = document.createElement("div");
    newComment.classList.add("comment-box");
    newComment.innerHTML = `
      <div class="avatar"></div>
      <div class="comment-content">
        <div class="comment-header">${username} <span class="comment-date">${timeString}</span></div>
        <div class="comment-text">${comment}</div>
        <span class="comment-actions">Like</span>
        <span class="comment-actions">Reply</span>
        <div class="reply-box"></div>
      </div>
    `;

    commentsContainer.appendChild(newComment);

    // Clear inputs
    usernameInput.value = "";
    emailInput.value = "";
    commentBox.value = "";
  });

  // Cancel button clears inputs
  cancelBtn.addEventListener("click", () => {
    usernameInput.value = "";
    emailInput.value = "";
    commentBox.value = "";
  });

  // Delegate Like & Reply clicks
  commentsContainer.addEventListener("click", e => {
    const target = e.target;

    // Like button
    if(target.classList.contains("comment-actions") && target.textContent.startsWith("Like")) {
      let count = parseInt(target.dataset.likes || 0) + 1;
      target.dataset.likes = count;
      target.textContent = `Like (${count})`;
    }

    // Reply button
    if(target.classList.contains("comment-actions") && target.textContent === "Reply") {
      const commentBoxDiv = target.closest(".comment-box");
      const replyBox = commentBoxDiv.querySelector(".reply-box");

      if(replyBox.querySelector(".reply-form")) return;

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

      // Cancel reply
      replyForm.querySelector(".cancel-btn").addEventListener("click", () => {
        replyForm.remove();
      });

      // Publish reply
      replyForm.querySelector(".publish-btn").addEventListener("click", () => {
        const username = replyForm.querySelector(".username").value.trim();
        const comment = replyForm.querySelector(".comment-textarea").value.trim();
        if(!username || !comment) return alert("Enter username and reply!");

        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;

        const newReply = document.createElement("div");
        newReply.classList.add("comment-box");
        newReply.innerHTML = `
          <div class="avatar"></div>
          <div class="comment-content">
            <div class="comment-header">${username} <span class="comment-date">${timeString}</span></div>
            <div class="comment-text">${comment}</div>
            <span class="comment-actions">Like</span>
            <span class="comment-actions">Reply</span>
          </div>
        `;
        replyBox.appendChild(newReply);
        replyForm.remove();
      });
    }
  });
});
