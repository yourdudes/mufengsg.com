const contactEmail = "mufeng@apecmail.com";

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");

const plannerOutput = {
  title: document.querySelector("[data-output-title]"),
  copy: document.querySelector("[data-output-copy]"),
  list: document.querySelector("[data-output-list]"),
  link: document.querySelector("[data-output-link]")
};

const recommendations = {
  strategy: {
    explore: {
      title: "Clarity call",
      copy: "A short conversation to understand what is unclear, what has already been tried, and where help would actually be useful.",
      items: ["What is stuck", "What needs deciding", "What to do next"]
    },
    build: {
      title: "Working map",
      copy: "A practical map of the current plan, the open decisions, and the people who need to move it forward.",
      items: ["Current plan", "Open questions", "Next working session"]
    },
    scale: {
      title: "Decision reset",
      copy: "A calm review of what has become complicated, what can be simplified, and what should happen next.",
      items: ["What to stop", "What to keep", "Cleaner next steps"]
    }
  },
  learning: {
    explore: {
      title: "Learning brief",
      copy: "A simple brief for the people, topic, and outcome before anyone starts building slides or materials.",
      items: ["Audience", "Useful outcome", "Session shape"]
    },
    build: {
      title: "Workshop build",
      copy: "A usable session plan with flow, prompts, materials, and follow-up that fit the people in the room.",
      items: ["Session flow", "Facilitator notes", "Follow-up notes"]
    },
    scale: {
      title: "Program tidy-up",
      copy: "A clearer structure for a training or education program that needs to be repeated without losing quality.",
      items: ["Program map", "Reusable materials", "Review points"]
    }
  },
  operating: {
    explore: {
      title: "Process check",
      copy: "A short look at where the work slows down, where people wait, and what can be made easier first.",
      items: ["Where time goes", "Where decisions stall", "Small fixes"]
    },
    build: {
      title: "Working routine",
      copy: "A simple rhythm for meetings, notes, owners, and follow-up so the team can keep momentum.",
      items: ["Meeting rhythm", "Owner list", "Follow-up format"]
    },
    scale: {
      title: "Cleanup session",
      copy: "A practical reset for a process that has collected too many steps, meetings, or unclear owners.",
      items: ["Remove clutter", "Clarify owners", "Agree the next routine"]
    }
  }
};

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function setMenu(open) {
  if (!header || !navToggle) return;
  header.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}

function updatePlanner() {
  const focus = document.querySelector("input[name='focus']:checked")?.value || "strategy";
  const stage = document.querySelector("input[name='stage']:checked")?.value || "explore";
  const data = recommendations[focus][stage];

  plannerOutput.title.textContent = data.title;
  plannerOutput.copy.textContent = data.copy;
  plannerOutput.list.innerHTML = data.items.map((item) => `<li>${item}</li>`).join("");
  plannerOutput.link.href = `#contact`;

  const contactSelect = document.querySelector(".contact-form select[name='focus']");
  if (contactSelect) {
    const map = {
      strategy: "Business advisory",
      learning: "Workshop support",
      operating: "Operating support"
    };
    contactSelect.value = map[focus] || "Business advisory";
  }
}

function enquiryText(form) {
  const data = new FormData(form);
  const lines = [
    "New enquiry for mufeng",
    "",
    `Name: ${data.get("name") || ""}`,
    `Email: ${data.get("email") || ""}`,
    `Organisation: ${data.get("organisation") || ""}`,
    `Focus: ${data.get("focus") || ""}`,
    "",
    "Message:",
    data.get("message") || ""
  ];

  return lines.join("\n");
}

function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const status = form.querySelector("[data-form-status]");

  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const subject = encodeURIComponent(`mufeng enquiry - ${data.get("focus")}`);
  const body = encodeURIComponent(enquiryText(form));
  const mailto = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

  window.location.href = mailto;
  status.textContent = "Your email app should open with the enquiry drafted.";
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  items.forEach((item) => observer.observe(item));
}

year.textContent = new Date().getFullYear();
setHeaderState();
setupReveal();
updatePlanner();

window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") !== "true";
  setMenu(open);
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setMenu(false);
  }
});

document.querySelector("[data-planner]")?.addEventListener("change", updatePlanner);

const contactForm = document.querySelector("[data-contact-form]");
contactForm?.addEventListener("submit", handleContactSubmit);
