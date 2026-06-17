const contactEmail = "hello@mufengsg.com";

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
      title: "Strategy sprint",
      copy: "A focused diagnostic and working session to clarify priorities, risks, and the next operating plan.",
      items: ["Discovery call", "Priority map", "30-day action plan"]
    },
    build: {
      title: "Roadmap build-out",
      copy: "A structured engagement to turn a chosen direction into milestones, owners, measures, and delivery rhythm.",
      items: ["Operating roadmap", "Decision map", "Leadership working session"]
    },
    scale: {
      title: "Growth operating cadence",
      copy: "A retained rhythm for leadership alignment, performance review, and practical next-step governance.",
      items: ["Monthly cadence", "Scorecard design", "Risk and priority review"]
    }
  },
  learning: {
    explore: {
      title: "Learning needs map",
      copy: "A compact review of audience needs, learning objectives, and the practical support required.",
      items: ["Audience profile", "Learning goals", "Session outline"]
    },
    build: {
      title: "Workshop design",
      copy: "A hands-on design cycle for workshops, facilitation guides, participant materials, and follow-through tools.",
      items: ["Workshop architecture", "Facilitator notes", "Post-session toolkit"]
    },
    scale: {
      title: "Program system",
      copy: "A repeatable learning program with measures, modular content, and a support model for wider rollout.",
      items: ["Curriculum map", "Delivery playbook", "Adoption measures"]
    }
  },
  operating: {
    explore: {
      title: "Team rhythm audit",
      copy: "A short diagnosis of meetings, decisions, handoffs, and the places where momentum currently leaks.",
      items: ["Meeting scan", "Decision friction map", "Quick wins"]
    },
    build: {
      title: "Operating system setup",
      copy: "Design the rituals, scorecards, ownership model, and review structure that help the team move consistently.",
      items: ["Meeting architecture", "Owner map", "Scorecard template"]
    },
    scale: {
      title: "Governance refinement",
      copy: "Tune the management cadence so a larger team can stay aligned without adding unnecessary bureaucracy.",
      items: ["Governance review", "Escalation paths", "Quarterly rhythm"]
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
      strategy: "Management consultancy",
      learning: "Educational support",
      operating: "Team enablement"
    };
    contactSelect.value = map[focus] || "Management consultancy";
  }
}

function enquiryText(form) {
  const data = new FormData(form);
  const lines = [
    "New enquiry for MUFENG PTE. LTD.",
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

async function copyEnquiry(form, status) {
  const text = enquiryText(form);
  if (!navigator.clipboard) {
    status.textContent = "Clipboard is unavailable in this browser.";
    return;
  }

  await navigator.clipboard.writeText(text);
  status.textContent = "Enquiry copied.";
}

function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const status = form.querySelector("[data-form-status]");

  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const subject = encodeURIComponent(`MUFENG enquiry - ${data.get("focus")}`);
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
document.querySelector("[data-copy-enquiry]")?.addEventListener("click", async () => {
  const status = contactForm.querySelector("[data-form-status]");

  if (!contactForm.reportValidity()) return;

  try {
    await copyEnquiry(contactForm, status);
  } catch {
    status.textContent = "The enquiry could not be copied.";
  }
});
