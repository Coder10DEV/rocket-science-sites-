document.addEventListener("DOMContentLoaded", () => {
  const publishBtn = document.querySelector(".publish-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const usernameInput = document.querySelector(".username");
  const commentInput = document.querySelector(".comment-textarea");
  const commentsContainer = document.querySelector(".comments-container");

  let commentCount = 0; // total number of comments

  // Update comment count display
  const updateCount = () => {
    let countDisplay = document.querySelector(".comment-count");
    if (!countDisplay) {
      countDisplay = document.createElement("p");
      countDisplay.classList.add("comment-count");
      commentsContainer.prepend(countDisplay);
    }
    countDisplay.textContent = `Total Comments: ${commentCount}`;
  };

  // Publish comment
  publishBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const comment = commentInput.value.trim();

    if (!username || !comment) {
      alert("Enter username and comment!");
      return;
    }

    // Create new comment box
    const newComment = document.createElement("div");
    newComment.classList.add("comment-box");
    newComment.innerHTML = `
      <div class="avatar"></div>
      <div class="comment-content">
        <div class="comment-header">${username} <span class="comment-date">Just now</span></div>
        <div class="comment-text">${comment}</div>
      </div>
    `;
    
    commentsContainer.appendChild(newComment);

    // Clear inputs
    usernameInput.value = "";
    commentInput.value = "";

    // Increase comment count
    commentCount++;
    updateCount();
  });

  // Cancel button
  cancelBtn.addEventListener("click", () => {
    usernameInput.value = "";
    commentInput.value = "";
  });

  // Initialize comment count
  updateCount();
});
