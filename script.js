// 푸터 연도 자동 갱신
document.getElementById("year").textContent = new Date().getFullYear();

// 다크모드 토글 (선택은 localStorage에 저장)
const root = document.documentElement;
let savedTheme = null;
try {
  savedTheme = localStorage.getItem("theme");
} catch (e) {}
if (!savedTheme) {
  savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const toggleBtn = document.createElement("button");
toggleBtn.className = "theme-toggle";
toggleBtn.type = "button";
document.body.appendChild(toggleBtn);

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  toggleBtn.setAttribute(
    "aria-label",
    theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"
  );
}

applyTheme(savedTheme);

toggleBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
});

// 스크롤 시 섹션/카드 페이드인
const targets = document.querySelectorAll(".section, .card");
targets.forEach((el) => el.classList.add("fade-in"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );
  targets.forEach((el) => observer.observe(el));
} else {
  targets.forEach((el) => el.classList.add("visible"));
}
