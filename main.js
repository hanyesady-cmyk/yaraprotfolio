// ================= Initialize AOS =================

AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: false,
  offset: 100,
});

// ================= Active Navbar =================

document.addEventListener("scroll", () => {
  let current = "";

  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// ================= Smooth Scroll =================

document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// ================= Buttons =================

// Let's Talk
const letsTalkBtn = document.querySelector(".right-nav button");

if (letsTalkBtn) {
  letsTalkBtn.addEventListener("click", () => {
    document
      .getElementById("contact")
      .scrollIntoView({ behavior: "smooth" });
  });
}

// View My Skills
const skillsBtn = document.querySelector(".btn");

if (skillsBtn) {
  skillsBtn.addEventListener("click", (e) => {
    e.preventDefault();

    document
      .getElementById("skills")
      .scrollIntoView({ behavior: "smooth" });
  });
}

// Contact Me
const contactBtn = document.querySelector(".btn2");

if (contactBtn) {
  contactBtn.addEventListener("click", (e) => {
    e.preventDefault();

    document
      .getElementById("contact")
      .scrollIntoView({ behavior: "smooth" });
  });
}
// ================= Video Modal =================

const videoModal = document.getElementById("videoModal");
const videoPlayer = document.getElementById("videoPlayer");
const closeModal = document.getElementById("closeModal");

// فتح الفيديو من Google Drive
function openVideoModal(driveId) {
  if (!videoModal || !videoPlayer) return;

  const iframeUrl = `https://drive.google.com/file/d/${driveId}/preview`;

  videoPlayer.src = iframeUrl;

  videoModal.classList.add("active");

  document.body.style.overflow = "hidden";
}

// غلق الفيديو
function closeVideoModal() {
  if (!videoModal || !videoPlayer) return;

  videoPlayer.src = "";

  videoModal.classList.remove("active");

  document.body.style.overflow = "auto";
}

// زر الإغلاق
if (closeModal) {
  closeModal.addEventListener("click", closeVideoModal);
}

// الضغط خارج النافذة
if (videoModal) {
  videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });
}

// زر Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeVideoModal();
  }
});

// ================= Animations =================

// إنشاء Animation خاصة بالإشعارات
const style = document.createElement("style");

style.textContent = `
@keyframes slideDown {

  0%{
      opacity:0;
      transform:translateX(-50%) translateY(-80px);
  }

  100%{
      opacity:1;
      transform:translateX(-50%) translateY(0);
  }

}

@keyframes fadeOut{

  from{
      opacity:1;
  }

  to{
      opacity:0;
  }

}
`;

document.head.appendChild(style);

// رسالة إشعار بسيطة
function showNotification(message) {

  const notification = document.createElement("div");

  notification.className = "notification";

  notification.innerText = message;

  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.left = "50%";
  notification.style.transform = "translateX(-50%)";
  notification.style.padding = "12px 25px";
  notification.style.background = "#00bcd4";
  notification.style.color = "#fff";
  notification.style.borderRadius = "8px";
  notification.style.zIndex = "99999";
  notification.style.animation = "slideDown .4s ease";

  document.body.appendChild(notification);

  setTimeout(() => {

    notification.style.animation = "fadeOut .4s ease";

    setTimeout(() => {
      notification.remove();
    }, 400);

  }, 2000);

}
// ================= Comments =================

const commentForm = document.getElementById("commentForm");
const commentsContainer = document.getElementById("commentsContainer");

// تحميل الكومنتات
async function loadComments() {
  try {
    const response = await fetch("/api/comments");

    if (!response.ok) {
      throw new Error("Failed to load comments");
    }

    const comments = await response.json();

    commentsContainer.innerHTML = "";

    if (comments.length === 0) {
      commentsContainer.innerHTML =
        "<p class='no-comments'>No comments yet.</p>";
      return;
    }

    comments.forEach((comment) => {
      commentsContainer.innerHTML += `
        <div class="comment-card" data-id="${comment._id}">

          <div class="comment-header">
            <span class="comment-author">${comment.name}</span>

            <span class="comment-time">
              ${new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>

          <p class="comment-text">${comment.comment}</p>

          <div class="comment-actions">
            <button class="delete-btn"
                    onclick="deleteComment('${comment._id}')">
              Delete
            </button>
          </div>

        </div>
      `;
    });

  } catch (error) {
    console.error(error);

    commentsContainer.innerHTML =
      "<p class='no-comments'>Unable to load comments.</p>";
  }
}

// إضافة كومنت
commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const commentInput = document.getElementById("comment");

  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  if (!name || !comment) {
    showNotification("Please fill all fields.");
    return;
  }

  try {

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        comment,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save comment");
    }

    nameInput.value = "";
    commentInput.value = "";

    showNotification("Comment added successfully.");

    await loadComments();

  } catch (error) {
    console.error(error);
    showNotification("Error while saving comment.");
  }
});

// حذف كومنت
async function deleteComment(id) {

  if (!confirm("Delete this comment?")) return;

  try {

    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    showNotification("Comment deleted.");

    await loadComments();

  } catch (error) {
    console.error(error);
    showNotification("Unable to delete comment.");
  }
}

// تحميل الكومنتات عند فتح الصفحة
window.addEventListener("DOMContentLoaded", () => {
  loadComments();
});