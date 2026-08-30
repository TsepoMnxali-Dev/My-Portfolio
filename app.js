document.addEventListener("DOMContentLoaded", () => {
  // 1. Throttled Spotlight Effect (requestAnimationFrame)
  const cards = document.querySelectorAll(".card");
  let ticking = false;

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--x", `${e.clientX - rect.left}px`);
          card.style.setProperty("--y", `${e.clientY - rect.top}px`);
          ticking = false;
        });
        ticking = true;
      }
    });
  });

  // 2. Optimized Project Video Hover Handling
  const videoIds = ["projectVideo1", "projectVideo2", "projectVideo3", "projectVideo4"];
  videoIds.forEach((id) => {
    const video = document.getElementById(id);
    if (video) {
      video.addEventListener("mouseenter", () => video.play().catch(() => {}));
      video.addEventListener("mouseleave", () => video.pause());
    }
  });

  // 3. EmailJS & Form Handling
  if (typeof emailjs !== "undefined") {
    emailjs.init("zc5pmZ9DPP3Che2el");
  }

  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Send form data to EmailJS FIRST
      emailjs.sendForm("service_0pls7uj", "template_ne6cvh1", this)
        .then(() => {
          // Show success message
          if (successMessage) successMessage.style.display = "block";

          // Reset form inputs after sending
          this.reset();

          // Hide success message after 3 seconds
          setTimeout(() => {
            if (successMessage) successMessage.style.display = "none";
          }, 3000);
        })
        .catch((error) => {
          console.error("EmailJS submission error:", error);
          alert("Failed to send message. Please try again.");
        });
    });
  }

  // 4. Initialize AOS with Faster Default Duration
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 500, // Reduced default duration for smoother feel
      once: true,    // Run animations only once to free up CPU on scroll back
    });
  }
});