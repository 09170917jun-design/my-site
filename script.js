// 푸터 연도 자동 갱신
document.getElementById("year").textContent = new Date().getFullYear();

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
    { threshold: 0.15 }
  );
  targets.forEach((el) => observer.observe(el));
} else {
  targets.forEach((el) => el.classList.add("visible"));
}
