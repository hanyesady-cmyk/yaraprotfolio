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
