/* ===============================
   QUOTE MODAL CORE ELEMENTS
================================ */
const overlay = document.getElementById("quoteOverlay");
const steps = document.querySelectorAll(".step");
const stepDots = document.querySelectorAll(".steps span");
const closeBtn = overlay.querySelector(".close");

/* FORM ELEMENTS */
const subService = document.getElementById("subService");
const description = document.getElementById("description");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const methodSelect = document.getElementById("method");

let current = 0;
let selectedService = "";

/* ===============================
   SERVICES DATA
================================ */
const services = {
  "Cleaning Services": [
    "Floor & Surface Cleaning",
    "Glass & Window Cleaning",
    "Kitchen & Bathroom Deep Cleaning",
    "Hygiene & Sanitation"
  ],
  "Pest Control & Fumigation": [
    "Initial Inspection",
    "Targeted Treatments",
    "Follow-up Visits",
    "Preventive Service Plans"
  ],
  "Garden Services": [
    "Lawn Care & Maintenance",
    "Weed Control",
    "Hedge Trimming",
    "Landscape Cleanup"
  ],
  "Property Management": [
    "For Sale",
    "For Rent",
    "Featured Listings",
    "Contact an Agent"
  ]
};

/* ===============================
   OPEN MODAL FROM ANY BUTTON
================================ */
document.querySelectorAll(".open-quote").forEach(btn => {
  btn.addEventListener("click", () => {
    overlay.style.display = "flex";
    resetSteps();
  });
});

/* ===============================
   CLOSE MODAL
================================ */
closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});

/* ===============================
   STEP HANDLING
================================ */
function showStep(i) {
  if (i < 0 || i >= steps.length) return;

  steps.forEach(s => s.classList.remove("active"));
  stepDots.forEach(d => d.classList.remove("active"));

  steps[i].classList.add("active");
  stepDots[i].classList.add("active");
  current = i;
}

function resetSteps() {
  current = 0;
  showStep(0);
}

document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => showStep(current + 1));
});

document.querySelectorAll(".prev").forEach(btn => {
  btn.addEventListener("click", () => showStep(current - 1));
});

/* ===============================
   SERVICE SELECTION
================================ */
document.querySelectorAll(".service-card").forEach(card => {
  card.addEventListener("click", () => {
    document
      .querySelectorAll(".service-card")
      .forEach(c => c.classList.remove("selected"));

    card.classList.add("selected");
    selectedService = card.dataset.service;

    subService.innerHTML = `<option value="">Select Specific Service</option>`;

    services[selectedService].forEach(service => {
      subService.innerHTML += `<option>${service}</option>`;
    });
  });
});

/* ===============================
   SEND QUOTE (WHATSAPP OR EMAIL)
================================ */
document.getElementById("sendQuote").addEventListener("click", () => {

  const messageBody = `
New Quote Request

Service: ${selectedService || "Not selected"}
Specific Service: ${subService.value || "Not specified"}

Customer Details:
Name: ${fname.value} ${lname.value}
Phone: ${phone.value}
Email: ${email.value || "N/A"}

Service Description:
${description.value || "No description provided"}

Note:
(Video will be sent manually if required)
  `;

  /* COMPANY CONTACT DETAILS */
  const companyWhatsApp = "2348146930404";
  const companyEmail = "milagrointegratedservice@gmail.com";

  if (methodSelect.value === "whatsapp") {
    window.open(
      `https://wa.me/${companyWhatsApp}?text=${encodeURIComponent(messageBody)}`,
      "_blank"
    );
  }

  if (methodSelect.value === "email") {
    window.location.href =
      `mailto:${companyEmail}` +
      `?subject=${encodeURIComponent("New Quote Request")}` +
      `&body=${encodeURIComponent(messageBody)}`;
  }
});
