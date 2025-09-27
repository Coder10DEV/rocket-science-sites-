document.addEventListener("DOMContentLoaded", () => {
  const publishBtn = document.querySelector(".publish-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const usernameInput = document.querySelector(".username");
  const emailInput = document.querySelector(".email");
  const commentBox = document.querySelector(".comment-textarea");
  const commentsContainer = document.querySelector(".comments-container");

  // Publish button
  publishBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const comment = commentBox.value.trim();

    if (username === "" || comment === "") {
      alert("Please enter a username and comment!");
      return;
    }

    // Create new comment block
    const newComment = document.createElement("div");
    newComment.classList.add("comment-box");
    newComment.innerHTML = `
      <div class="avatar"></div>
      <div class="comment-content">
        <div class="comment-header">
          ${username} <span class="comment-date">Just now</span>
        </div>
        <div class="comment-text">
          ${comment}
        </div>
        <span class="comment-actions">Like</span>
        <span class="comment-actions">Reply</span>
      </div>
    `;

    // Add comment to the container
    commentsContainer.appendChild(newComment);

    // Clear form
    usernameInput.value = "";
    emailInput.value = "";
    commentBox.value = "";
  });

  // Cancel button
  cancelBtn.addEventListener("click", () => {
    usernameInput.value = "";
    emailInput.value = "";
    commentBox.value = "";
  });
});

// Listen for clicks on all Reply buttons
commentsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("comment-actions") && e.target.textContent === "Reply") {
    const commentBoxDiv = e.target.closest(".comment-box");
    let existingForm = commentBoxDiv.querySelector(".reply-form");
    
    // If a reply form already exists, do nothing
    if (existingForm) return;

    // Create a reply form
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
    
    // Append the form inside the reply-box
    let replyBox = commentBoxDiv.querySelector(".reply-box");
    if (!replyBox) {
      replyBox = document.createElement("div");
      replyBox.classList.add("reply-box");
      commentBoxDiv.appendChild(replyBox);
    }
    replyBox.appendChild(replyForm);
    
    // Cancel button inside reply form
    replyForm.querySelector(".cancel-btn").addEventListener("click", () => {
      replyForm.remove();
    });

    // Publish button inside reply form
    replyForm.querySelector(".publish-btn").addEventListener("click", () => {
      const username = replyForm.querySelector(".username").value.trim();
      const comment = replyForm.querySelector(".comment-textarea").value.trim();
      if (username === "" || comment === "") return alert("Enter username and reply!");
      
      const newReply = document.createElement("div");
      newReply.classList.add("comment-box");
      newReply.innerHTML = `
        <div class="avatar"></div>
        <div class="comment-content">
          <div class="comment-header">
            ${username} <span class="comment-date">Just now</span>
          </div>
          <div class="comment-text">
            ${comment}
          </div>
          <span class="comment-actions">Like</span>
          <span class="comment-actions">Reply</span>
        </div>
      `;
      
      replyBox.appendChild(newReply);
      replyForm.remove();
    });
  }
});

commentsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("comment-actions") && e.target.textContent === "Like") {
    let count = e.target.getAttribute("data-likes") || 0;
    count = parseInt(count) + 1;
    e.target.setAttribute("data-likes", count);
    e.target.textContent = `Like (${count})`;
  }
});

const now = new Date();
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
const timeString = `${hours}:${minutes}`;

<div class="comment-header">
  ${username} <span class="comment-date">${timeString}</span>
</div>
