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
    assess: {
      title: "Executive diagnostic",
      copy: "A focused leadership session to define the real strategic question, surface trade-offs, and decide what needs to move first.",
      items: ["Decision map", "Opportunity scan", "30-day action agenda"]
    },
    design: {
      title: "Growth blueprint",
      copy: "A structured strategy sprint to clarify where to play, how to win, and what operating choices must change.",
      items: ["Growth thesis", "Strategic priorities", "Leadership narrative"]
    },
    mobilise: {
      title: "Strategy mobilisation",
      copy: "A 90-day path that turns the strategy into owners, milestones, meeting cadence, and decision forums.",
      items: ["Milestone plan", "Owner model", "Performance rhythm"]
    }
  },
  transformation: {
    assess: {
      title: "Operating model review",
      copy: "A practical scan of how work currently moves, where decisions slow down, and what must be redesigned first.",
      items: ["Current-state map", "Decision bottlenecks", "Transformation risks"]
    },
    design: {
      title: "Transformation blueprint",
      copy: "A designed future state for teams, governance, workflows, and leadership routines that can be implemented.",
      items: ["Future-state model", "Governance design", "Workstream roadmap"]
    },
    mobilise: {
      title: "Transformation office setup",
      copy: "A lightweight execution office with cadence, issue escalation, ownership, and communication routines.",
      items: ["Execution cadence", "Workstream owners", "Leadership dashboard"]
    }
  },
  capability: {
    assess: {
      title: "Capability gap scan",
      copy: "A focused review of the skills, behaviours, and learning systems needed to support the next stage.",
      items: ["Audience analysis", "Capability map", "Learning priorities"]
    },
    design: {
      title: "Leadership academy design",
      copy: "A structured program architecture with modules, workshops, materials, and facilitator guidance.",
      items: ["Curriculum architecture", "Workshop flow", "Adoption materials"]
    },
    mobilise: {
      title: "Capability rollout",
      copy: "A rollout path that connects learning sessions to manager follow-up, team routines, and measurable adoption.",
      items: ["Rollout plan", "Manager toolkit", "Adoption check-ins"]
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
      strategy: "Corporate and growth strategy",
      transformation: "Transformation and operating model",
      capability: "Learning and leadership academies"
    };
    contactSelect.value = map[focus] || "Corporate and growth strategy";
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
