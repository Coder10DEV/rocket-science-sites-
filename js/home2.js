const publishBtn = document.querySelector(".publish-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const usernameInput = document.querySelector(".username");
const emailInput = document.querySelector(".email");
const commentTextarea = document.querySelector(".comment-textarea");
const commentsContainer = document.querySelector(".comments-container");

publishBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const comment = commentTextarea.value.trim();

    if (!username || !comment) {
        alert("Enter username and comment!");
        return;
    }

    // Create a new comment object
    const newComment = { username, comment, time: new Date().toISOString() };

    // Save it in localStorage
    let savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    savedComments.push(newComment);
    localStorage.setItem("comments", JSON.stringify(savedComments));

    // Clear the inputs
    usernameInput.value = "";
    emailInput.value = "";
    commentTextarea.value = "";

    // Display it immediately
    addCommentToDOM(newComment);
});

function addCommentToDOM(commentObj) {
    const div = document.createElement("div");
    div.classList.add("comment-box");
    div.innerHTML = `
        <div class="avatar"></div>
        <div class="comment-content">
            <div class="comment-header">
                ${commentObj.username} <span class="comment-date">${new Date(commentObj.time).toLocaleString()}</span>
            </div>
            <div class="comment-text">${commentObj.comment}</div>
            <span class="comment-actions">Like</span>
            <span class="comment-actions">Reply</span>
        </div>
    `;
    commentsContainer.appendChild(div);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    savedComments.forEach(addCommentToDOM);

    // Optional: show total comments
    console.log("Total comments:", savedComments.length);
});
