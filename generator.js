// ----------------------------------------------------
// Global State & Fallback Data
// ----------------------------------------------------
let recipients = [];
let templates = {};

const fallbackRecipients = [
  { "name": "Josh Crisp", "email": "joshcrisp@gaston.k12.nc.us", "role": "Chairman", "area": "Dallas Township" },
  { "name": "Dot Cherry", "email": "dotcherry@gaston.k12.nc.us", "role": "Vice Chairman", "area": "At-Large Member" },
  { "name": "Lee Dedmon", "email": "leededmon@gaston.k12.nc.us", "role": "Board Member", "area": "Gastonia Township" },
  { "name": "Tod Kinlaw", "email": "todkinlaw@gaston.k12.nc.us", "role": "Board Member", "area": "South Point Township" },
  { "name": "Robbie Lovelace", "email": "robbielovelace@gaston.k12.nc.us", "role": "Board Member", "area": "Cherryville Township" },
  { "name": "Brent Moore", "email": "brentmoore@gaston.k12.nc.us", "role": "Board Member", "area": "Crowders Mountain Township" },
  { "name": "Jeff Ramsey", "email": "jefframsey@gaston.k12.nc.us", "role": "Board Member", "area": "At-Large Member" },
  { "name": "Janna Smith", "email": "jannasmith@gaston.k12.nc.us", "role": "Board Member", "area": "Gastonia Township" },
  { "name": "A.M. Stephens III", "email": "amstephens@gaston.k12.nc.us", "role": "Board Member", "area": "Riverbend Township" },
  { "name": "Morgen A. Houchard", "email": "superintendent@gaston.k12.nc.us", "role": "Superintendent", "area": "Gaston County Schools" }
];

const fallbackTemplates = {
  subjectPrefixes: [
    "Urgent: Please vote to save",
    "Do not close",
    "Save our school - Keep",
    "A concerned resident's appeal:",
    "Please reconsider the closure of",
    "Protect Cherryville's future - Save",
    "Voting NO on closing",
    "An urgent appeal regarding",
    "Please vote against closing",
    "Reject the proposal to close"
  ],
  subjectSchools: [
    "W.B. Beam Intermediate School",
    "Beam Intermediate School",
    "W.B. Beam Intermediate",
    "our local Beam Intermediate",
    "W.B. Beam",
    "Beam School in Cherryville"
  ],
  subjectSuffixes: [
    "!",
    " - Think of our kids",
    " - A short-sighted decision",
    " - Keep Beam open!",
    " - Community appeal",
    " - Review the feasibility study",
    " - Focus on the kids"
  ],
  relationshipOpeners: {
    resident: [
      "As a resident of Cherryville and a deeply concerned citizen, I am writing to urge you to vote against the proposed closure of W.B. Beam Intermediate School.",
      "I am writing to you today as a Cherryville resident to express my strong opposition to the closing of W.B. Beam Intermediate.",
      "As a resident who cares deeply about public education in Gaston County, I urge you to vote 'NO' on the proposal to close Beam Intermediate."
    ],
    parent: [
      "As a parent of children in the Gaston County school system, I am writing to urge you to vote against the proposed closure of W.B. Beam Intermediate School.",
      "I am writing to you today as a parent who is deeply concerned about my children's educational future to oppose the closing of W.B. Beam Intermediate.",
      "As a local parent, I urge you to vote against the closure of Beam Intermediate. Our kids deserve stability, quality education, and safe learning environments."
    ],
    citizen: [
      "As a concerned citizen of Gaston County, I am writing to urge you to vote against the proposed closure of W.B. Beam Intermediate School.",
      "I am writing to you today to express my opposition to the closing of W.B. Beam Intermediate. This decision will hurt the entire Cherryville community.",
      "Please protect the strength of our public school system by voting against the closure of W.B. Beam Intermediate School."
    ]
  },
  financialsPart1: [
    "The board's projected savings of $288,342 from closing Beam Intermediate are highly suspect and mathematically overstated.",
    "The independent community feasibility study reveals that the district's estimated $288,342 savings are deeply flawed.",
    "Many residents are questioning the district's claim that closing Beam will save $288,342.",
    "We must look closely at the district's financial math, which claims $288,342 in savings from this closure.",
    "The argument that closing Beam Intermediate will save Gaston County $288,342 simply does not hold up under scrutiny.",
    "Looking at the district's budget, the projected $288,342 in cost savings from closing Beam is incredibly misleading.",
    "The Gaston County school board's projected cost savings of $288,342 from shutting down W.B. Beam Intermediate are highly questionable."
  ],
  financialsPart2: [
    "Once you account for student-tied Title 1 funds, shared teachers, and grant-funded SROs transferring with the children, the true net savings fall to a meager $90,000 to $160,000.",
    "In reality, when you track the Title 1 resources, shared personnel, and SRO funding that must follow the students to other campuses, the actual savings drop to between $89,904 and $161,971.",
    "The community feasibility analysis shows that true savings are only $89,904 to $161,971, since major expenses like SROs and Title 1 support staff will just be shifted to other schools.",
    "A detailed community audit shows the true net savings are actually between $90,000 and $162,000, as the student-tied resources and shared staff budgets will transfer directly with the kids.",
    "Accounting for the transfer of Title 1 funding, shared teachers, and SRO grant resources reveals that the county will only save a fraction of the projected amount—somewhere between $89,904 and $161,971.",
    "When factoring in student-linked Title 1 funds, specialized teacher allocations, and SRO grants that move with the students, the net savings dwindle to just $90,000 to $160,000.",
    "When we look closely at the budget, the student-specific funding, staff salaries, and security resources that transfer with the children will shrink the actual savings to a fraction of that estimate ($90k - $160k)."
  ],
  financialsPart3: [
    "Furthermore, public records show Gaston County Schools does not even track individual budgets per school. Voting to close a school without knowing its baseline operating cost is fiscally irresponsible.",
    "More concerning is the revelation from public records that the district doesn't maintain per-school operating budgets. It is impossible to make an informed, responsible vote to close a school without baseline spending data.",
    "Recent public records requests reveal that Gaston County Schools doesn't maintain per-school baseline budgets. How can the board responsibly vote on a closure when they lack individual campus spending data?",
    "To make matters worse, records requests show that the district does not track baseline budgets for individual schools. The board cannot claim to make a sound financial decision when it lacks per-school spending tracking.",
    "Additionally, public records confirm that Gaston County Schools does not maintain per-school baseline budgets. It is a major governance failure to vote to close a specific school without knowing its baseline operating costs.",
    "On top of that, public records indicate the school system doesn't track school-level operational budgets, making a vote to close Beam fiscally blind.",
    "Additionally, public records verify that GCS does not track campus-specific budgets, rendering any claims of specific savings mathematically baseless."
  ],
  capacityPart1: [
    "We must also look at school capacity, as W.B. Beam Intermediate is currently operating at an efficient 87% utilization.",
    "Beam Intermediate is not underutilized, currently running at approximately 87% of its capacity.",
    "The physical capacity data from the district shows that Beam Intermediate operates comfortably at 87% utilization.",
    "Closing a school that is at 87% capacity makes no sense when the surrounding schools are already busy.",
    "Beam is an active, well-utilized school operating at 87% capacity today.",
    "With Beam Intermediate currently operating at a strong 87% capacity, it is clear the building is actively needed.",
    "W.B. Beam Intermediate is currently running at a very efficient utilization rate of 87%."
  ],
  capacityPart2: [
    "Voting to close Beam will immediately push Cherryville Elementary to a crushing 97% capacity at best.",
    "If Beam is closed, Cherryville Elementary will be forced to absorb these students, spiking its utilization to 97%.",
    "The sudden influx of students would immediately push Cherryville Elementary to 97% capacity, crowding out our youngest learners.",
    "This closure would force Cherryville Elementary to operate at 97% capacity, straining every classroom and resource.",
    "Our community elementary school will see its capacity utilization soar to 97% if it has to absorb Beam's student body.",
    "Reassigning Beam's students will immediately overload Cherryville Elementary, driving its capacity to a near-maximum 97%.",
    "If Beam is closed, Cherryville Elementary will have to absorb its student population, forcing it to run at a staggering 97% capacity."
  ],
  capacityPart3: [
    "Overcrowded classrooms degrade the learning environment and stretch our teachers to their limits.",
    "Forcing our children into overcrowded classrooms will hurt educational outcomes and increase teacher burnout.",
    "Packing our elementary schools to 97% capacity will degrade safety, class sizes, and individual student attention.",
    "Our children deserve space to learn, not packed classrooms that make it harder for teachers to educate.",
    "Such high utilization rates will inevitably lead to overcrowded classrooms and a decline in student engagement.",
    "Operating at near-maximum capacity hurts class sizes, limits individualized instruction, and strains school facilities.",
    "This level of overcrowding will inevitably diminish individual student attention and place an unfair burden on our teachers."
  ],
  growthPart1: [
    "This closure is particularly short-sighted because Cherryville is entering a period of significant residential growth.",
    "Closing a school now ignores the fact that Cherryville is experiencing rapid new home construction.",
    "The district's long-term plan fails to account for the major residential growth currently taking place in Cherryville.",
    "We are seeing significant new residential housing developments being built right here in Cherryville.",
    "The population of Cherryville is growing, with multiple residential developments actively expanding.",
    "Shutting down Beam completely ignores the major housing and population growth currently transforming Cherryville.",
    "We are seeing a major wave of residential expansion and new construction in Cherryville right now."
  ],
  growthPart2: [
    "With hundreds of new housing units already approved, school enrollment will rise steadily over the next decade.",
    "Hundreds of new residential units are currently in development, which will bring an influx of new families to the area.",
    "Approved plans show hundreds of new homes in the pipeline, which will drive significant school-age enrollment.",
    "There are hundreds of new homes being added to our community, which will directly translate to higher student enrollment.",
    "The hundreds of new housing starts in the pipeline mean our school system must prepare for more students, not fewer.",
    "Given that hundreds of new homes are already approved and under construction, student enrollment is set to climb significantly.",
    "With hundreds of new homes already approved by local planners, student enrollment is guaranteed to spike in the coming years."
  ],
  growthPart3: [
    "Closing Beam now is a short-sighted mistake that will leave our district unprepared and force us to build new facilities later.",
    "It is counterproductive to close schools when enrollment is set to rise, creating a capacity crisis in the near future.",
    "Shutting down active classrooms now will only force the county to spend more on building new capacity in a few years.",
    "The board is making a short-sighted decision that ignores the 3-to-10-year growth projections for our community.",
    "Failing to plan for this imminent growth will create an avoidable overcrowding crisis and cost taxpayers more in the long run.",
    "Reducing school capacity now is a backward-looking policy that will force Gaston County to build expensive new facilities later.",
    "Closing a viable school facility in the face of this growth is incredibly short-sighted and will lead to an expensive crowding crisis."
  ],
  educationalPart1: [
    "Additionally, moving fifth graders to John Chavis Middle School is a major developmental mistake.",
    "We must also consider the developmental risks of reassigning fifth graders to a middle school setting.",
    "Placing fifth-grade children in John Chavis Middle School is developmentally inappropriate for their age group.",
    "Forcing 10-year-olds into an environment with much older middle school students presents serious safety and developmental risks.",
    "Reassigning fifth-grade students to a middle school campus is a disservice to their age-specific needs.",
    "Exposing fifth-grade children to a middle school environment at Chavis is developmentally counterproductive.",
    "Reassigning fifth graders to John Chavis Middle School is developmentally inappropriate for children of that age."
  ],
  educationalPart2: [
    "Fifth graders thrive in elementary environments, and moving them will strip them of essential upper-elementary identity programs.",
    "This transition will eliminate their access to vital programs like Battle of the Books, Math Masters, and Robotics.",
    "By removing them from an intermediate setting, they will lose access to specialized programs like Robotics and Math Masters.",
    "These students will lose the nurturing intermediate structure that hosts vital activities like Battle of the Books and Math Masters.",
    "A middle school transition threatens the very survival of intermediate programs like Robotics, Math Masters, and Battle of the Books.",
    "These young learners will lose their intermediate identity and the targeted academic programs like Robotics and Math Masters that support them.",
    "This move will deny them access to specialized intermediate-level activities like robotics and the Battle of the Books."
  ],
  educationalPart3: [
    "These identity programs are critical for their academic engagement and self-esteem.",
    "We must protect these specialized programs that prepare our children for future academic success.",
    "We cannot afford to strip away these enrichment opportunities from Cherryville's children.",
    "Please do not deny our students these vital upper-elementary programs that keep them excited about learning.",
    "These educational and extra-curricular programs are crucial for the development of our young students.",
    "Losing these enrichment programs will negatively impact student engagement and academic readiness.",
    "These enrichment programs are vital for maintaining student motivation and ensuring academic growth."
  ],
  closings: [
    "Please listen to the parents, teachers, and taxpayers of Cherryville. I urge you to vote 'NO' on the proposal to close W.B. Beam Intermediate.",
    "I ask you to stand with our community and protect our schools. Please vote to keep Beam Intermediate open.",
    "Thank you for your time and for your dedication to Gaston County's students. I trust you will make the right decision and vote against this closure.",
    "Please review the independent community feasibility study details and vote to reject the closure of W.B. Beam Intermediate. Our community is counting on you.",
    "Our children's future depends on your decision. Please reject this short-sighted proposal and vote to preserve Beam Intermediate.",
    "For the sake of our students, teachers, and Cherryville's future, please vote against the closure of Beam Intermediate School at the upcoming meeting."
  ],
  signoffs: [
    "Sincerely,",
    "Best regards,",
    "Respectfully,",
    "A concerned Gaston County resident,"
  ]
};

// ----------------------------------------------------
// Helper Utilities
// ----------------------------------------------------
function getRandomElement(arr) {
  if (!arr || arr.length === 0) return "";
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ----------------------------------------------------
// Wizard State & Config
// ----------------------------------------------------
const wizardState = {
  currentStep: 0, // 0 = landing, 1 = selection, 2 = send
  selectedConcerns: []
};

const concernsList = [
  { id: 'financials', title: "It doesn't make financial sense", desc: "Focus on suspicious savings claims, SRO grants, and lack of school baseline budgets." },
  { id: 'capacity', title: "School overcrowding", desc: "Focus on Beam operating at 87% utilization and overloading Cherryville Elementary to 97%." },
  { id: 'growth', title: "Cherryville is growing", desc: "Focus on new residential construction and rising enrollment projections over the next decade." },
  { id: 'educational', title: "It will hurt our education", desc: "Focus on middle school developmental risks and losing robotics, mathematics, and reading programs." }
];

// ----------------------------------------------------
// Wizard Navigation & Handlers
// ----------------------------------------------------
function showStep(stepIndex) {
  wizardState.currentStep = stepIndex;
  
  const landing = document.getElementById('landing-container');
  const wizard = document.getElementById('wizard-container');
  const step1 = document.getElementById('wizard-step-1');
  const step2 = document.getElementById('wizard-step-2');

  if (landing) landing.classList.add('d-none');
  if (wizard) wizard.classList.add('d-none');
  if (step1) step1.classList.add('d-none');
  if (step2) step2.classList.add('d-none');
  
  if (stepIndex === 0) {
    if (landing) landing.classList.remove('d-none');
  } else {
    if (wizard) wizard.classList.remove('d-none');
    const stepEl = document.getElementById(`wizard-step-${stepIndex}`);
    if (stepEl) stepEl.classList.remove('d-none');
    
    // Update progress steps
    for (let i = 1; i <= 2; i++) {
      const stepDot = document.querySelector(`.progress-step[data-step="${i}"]`);
      if (stepDot) {
        stepDot.classList.remove('active', 'completed');
        if (i < stepIndex) {
          stepDot.classList.add('completed');
        } else if (i === stepIndex) {
          stepDot.classList.add('active');
        }
      }
      
      // Update progress lines
      const nextLine = stepDot ? stepDot.nextElementSibling : null;
      if (nextLine && nextLine.classList.contains('progress-line')) {
        nextLine.classList.remove('completed');
        if (i < stepIndex) {
          nextLine.classList.add('completed');
        }
      }
    }
  }
}

function toggleConcern(concernId, cardElement) {
  const index = wizardState.selectedConcerns.indexOf(concernId);
  if (index > -1) {
    // Already selected, deselect it
    wizardState.selectedConcerns.splice(index, 1);
    cardElement.classList.remove('flipped');
  } else {
    // Not selected
    if (wizardState.selectedConcerns.length >= 2) {
      return;
    }
    wizardState.selectedConcerns.push(concernId);
    cardElement.classList.add('flipped');
  }

  // Update proceed button state
  updateComposeButton();

  // If two cards are flipped over, automatically transition to Step 2 after 600ms
  if (wizardState.selectedConcerns.length === 2) {
    setTimeout(() => {
      // Re-verify that we still have exactly 2 concerns selected and are on step 1
      if (wizardState.selectedConcerns.length === 2 && wizardState.currentStep === 1) {
        generateEmail();
        showStep(2);
      }
    }, 600);
  }
}

function updateComposeButton() {
  const composeBtn = document.getElementById('btn-compose-wizard');
  if (!composeBtn) return;

  const count = wizardState.selectedConcerns.length;
  if (count === 0) {
    composeBtn.disabled = true;
    composeBtn.innerText = "Select at least 1 concern";
  } else if (count === 1) {
    composeBtn.disabled = false;
    composeBtn.innerText = "Compose Email with 1 concern";
  } else {
    composeBtn.disabled = false;
    composeBtn.innerText = "Compose Email";
  }
}

function resetWizardState() {
  wizardState.selectedConcerns = [];
  
  // Unflip all cards in the UI
  const cards = document.querySelectorAll('#wizard-step-1 .card-flip-container');
  cards.forEach(card => {
    card.classList.remove('flipped');
  });
  
  // Reset input name
  const nameInput = document.getElementById('user-name');
  if (nameInput) nameInput.value = "";
  
  // Reset compose button
  updateComposeButton();
}


// ----------------------------------------------------
// Dynamic Recipient Rendering
// ----------------------------------------------------
function renderRecipients() {
  const container = document.getElementById('board-members-list');
  if (!container) return;
  container.innerHTML = '';

  recipients.forEach(member => {
    const div = document.createElement('div');
    div.className = 'board-member-card';

    const area = member.area || member.township || "";
    let roleText = member.role || "Board Member";
    if (roleText === 'Member') {
      roleText = 'Board Member';
    }

    div.innerHTML = `
      <div class="member-info">
        <span class="member-name">${member.name}</span>
        <span class="member-role">${roleText}</span>
        <span class="member-township">${area}</span>
      </div>
      <a class="member-email" href="mailto:${member.email}" title="Email ${member.name} individually">${member.email}</a>
    `;
    container.appendChild(div);
  });
}

// ----------------------------------------------------
// Dynamic On-The-Fly Argument Generator
// ----------------------------------------------------
function getArgumentParagraph(category) {
  const p1 = getRandomElement(templates[`${category}Part1`]);
  const p2 = getRandomElement(templates[`${category}Part2`]);
  const p3 = getRandomElement(templates[`${category}Part3`]);

  if (!p1 && !p2 && !p3) return "";
  return `${p1} ${p2} ${p3}`.trim();
}

// ----------------------------------------------------
// Main Email Generator Engine
// ----------------------------------------------------
function generateEmail() {
  const nameInput = document.getElementById('user-name');
  const nameVal = nameInput ? nameInput.value.trim() : "";

  // 1. Generate Subject line
  const prefix = getRandomElement(templates.subjectPrefixes);
  const school = getRandomElement(templates.subjectSchools);
  const suffix = getRandomElement(templates.subjectSuffixes);
  const subject = `${prefix} ${school}${suffix}`;

  // 2. Generate Body
  const salutation = "Dear Gaston County School Board Members and Superintendent Houchard,";

  // Gather openers from resident, parent, citizen pools
  let allOpeners = [];
  if (templates.relationshipOpeners) {
    allOpeners = [
      ...(templates.relationshipOpeners.resident || []),
      ...(templates.relationshipOpeners.parent || []),
      ...(templates.relationshipOpeners.citizen || [])
    ];
  }

  // Fallback check if opener list is empty
  const opener = allOpeners.length > 0 ? getRandomElement(allOpeners) : "I am writing to express my concern regarding W.B. Beam Intermediate School.";

  // Retrieve argument paragraphs based on selections
  let keysToUse = [...wizardState.selectedConcerns];

  // Fallback to random if empty (e.g. initial generation)
  if (keysToUse.length === 0) {
    const argKeys = ['financials', 'capacity', 'growth', 'educational'];
    keysToUse.push(getRandomElement(argKeys));
  }

  const selectedArgs = keysToUse.map(key => getArgumentParagraph(key)).filter(para => para !== "");
  const bodyParagraphs = selectedArgs.join("\n\n");
  const closing = getRandomElement(templates.closings);

  // Generate signature
  let signature = "";
  if (nameVal) {
    signature = `Respectfully,\n${nameVal}`;
  } else {
    const defaultSignoff = getRandomElement(templates.signoffs);
    signature = `${defaultSignoff}`;
  }

  const body = `${salutation}\n\n${opener}\n\n${bodyParagraphs}\n\n${closing}\n\n${signature}`;

  // Update UI preview elements if they exist
  const previewSubject = document.getElementById('preview-subject');
  const previewBody = document.getElementById('preview-body');

  if (previewSubject) previewSubject.value = subject;
  if (previewBody) previewBody.value = body;

  // Sync mailto links and buttons
  updateMailtoLink(subject, body);
}

/// Update mailto URL builder and sync with preview & desktop copy fields
function updateMailtoLink(subject, body) {
  const toEmails = recipients.map(r => r.email).join(',');
  const mailtoUrl = `mailto:${toEmails}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&bcc=zshuford@gmail.com`;

  const sendBtn = document.getElementById('send-btn');
  if (sendBtn) {
    sendBtn.href = mailtoUrl;
  }

  // Sync the "To" field in the preview container
  const previewToInput = document.getElementById('preview-to');
  if (previewToInput) {
    previewToInput.value = recipients.map(r => r.email).join(', ');
  }

  // Sync inputs inside the desktop copy assistant if they exist
  const copyRecipientsInput = document.getElementById('copy-recipients-input');
  const copySubjectInput = document.getElementById('copy-subject-input');
  const copyBodyInput = document.getElementById('copy-body-input');

  if (copyRecipientsInput) {
    copyRecipientsInput.value = recipients.map(r => r.email).join(', ');
  }
  if (copySubjectInput) {
    copySubjectInput.value = subject;
  }
  if (copyBodyInput) {
    copyBodyInput.value = body;
  }
}

// Copy to clipboard utility (Full Email)
function copyToClipboard() {
  const previewSubject = document.getElementById('preview-subject');
  const previewBody = document.getElementById('preview-body');

  const subject = previewSubject ? previewSubject.value : "";
  const body = previewBody ? previewBody.value : "";
  const fullText = `Subject: ${subject}\n\n${body}`;

  const copyBtn = document.getElementById('copy-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const copyIcon = document.getElementById('copy-icon');

  navigator.clipboard.writeText(fullText).then(() => {
    if (copyBtn) copyBtn.className = "btn btn-success";
    if (copyBtnText) copyBtnText.innerText = "Copied!";
    if (copyIcon) copyIcon.innerHTML = `<path d="M20 6L9 17l-5-5" stroke-width="3"/>`; // Checkmark icon

    setTimeout(() => {
      if (copyBtn) copyBtn.className = "btn btn-secondary";
      if (copyBtnText) copyBtnText.innerText = "Copy Text";
      if (copyIcon) copyIcon.innerHTML = `<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>`;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// Device detection & responsive layout adaptation
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 768);
}

function initializeDeviceLayout() {
  // Return early if we are not on the email page
  if (!document.getElementById('wizard-container')) return;

  const isMobile = isMobileDevice();
  const assistant = document.getElementById('desktop-copy-assistant');
  const sendBtn = document.getElementById('send-btn');
  
  if (isMobile) {
    if (assistant) assistant.classList.add('d-none');
    if (sendBtn) {
      sendBtn.className = "btn btn-primary";
      sendBtn.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        Open This Email in my Email Client
      `;
    }
  } else {
    if (assistant) assistant.classList.remove('d-none');
    if (sendBtn) {
      sendBtn.className = "btn btn-secondary";
      sendBtn.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        Open in Desktop Mail App (Outlook/Mail)
      `;
    }
  }
}

// Desktop Copy functions
function copyRecipientsToClipboard() {
  const input = document.getElementById('copy-recipients-input');
  if (!input) return;
  copyValueToClipboard(input.value, 'btn-copy-recipients', 'Copy List', 'Copied List!');
}

function copySubjectToClipboard() {
  const input = document.getElementById('copy-subject-input');
  if (!input) return;
  copyValueToClipboard(input.value, 'btn-copy-subject', 'Copy Subject', 'Copied Subject!');
}

function copyBodyToClipboard() {
  const input = document.getElementById('copy-body-input');
  if (!input) return;
  copyValueToClipboard(input.value, 'btn-copy-body', 'Copy Body', 'Copied Body!');
}

function copyValueToClipboard(value, btnId, defaultText, successText) {
  const btn = document.getElementById(btnId);
  navigator.clipboard.writeText(value).then(() => {
    if (btn) {
      btn.className = "btn btn-success";
      // Handle the text inside the button
      const textSpan = btn.querySelector('span');
      if (textSpan) {
        textSpan.innerText = successText;
      } else {
        btn.innerText = successText;
      }
      setTimeout(() => {
        btn.className = btnId === 'copy-emails-btn' || btnId === 'send-btn' ? "btn btn-primary btn-large" : "btn btn-secondary";
        if (textSpan) {
          textSpan.innerText = defaultText;
        } else {
          btn.innerText = defaultText;
        }
      }, 2000);
    }
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// Setup Event Listeners and Initializers
function setupListeners() {
  // Start wizard button
  const startWizardBtn = document.getElementById('btn-start-wizard');
  if (startWizardBtn) {
    startWizardBtn.addEventListener('click', () => {
      resetWizardState();
      showStep(1);
    });
  }
  
  // Back button in wizard header
  const wizardBackBtn = document.getElementById('btn-wizard-back');
  if (wizardBackBtn) {
    wizardBackBtn.addEventListener('click', () => {
      if (wizardState.currentStep > 1) {
        showStep(wizardState.currentStep - 1);
      } else {
        showStep(0); // Go back to landing
      }
    });
  }
  
  // Start Over button in wizard header
  const wizardResetBtn = document.getElementById('btn-wizard-reset');
  if (wizardResetBtn) {
    wizardResetBtn.addEventListener('click', () => {
      resetWizardState();
      showStep(0);
    });
  }
  
  // Concern selection card-flip containers
  const concernCards = document.querySelectorAll('#wizard-step-1 .card-flip-container');
  concernCards.forEach(card => {
    card.addEventListener('click', () => {
      const concern = card.getAttribute('data-concern');
      toggleConcern(concern, card);
    });
  });

  // Compose Email wizard proceed button
  const composeWizardBtn = document.getElementById('btn-compose-wizard');
  if (composeWizardBtn) {
    composeWizardBtn.addEventListener('click', () => {
      generateEmail();
      showStep(2);
    });
  }

  // Name input listener
  const userNameInput = document.getElementById('user-name');
  if (userNameInput) {
    userNameInput.addEventListener('input', generateEmail);
  }

  const previewSubject = document.getElementById('preview-subject');
  if (previewSubject) {
    previewSubject.addEventListener('input', (e) => {
      const previewBody = document.getElementById('preview-body');
      updateMailtoLink(e.target.value, previewBody ? previewBody.value : "");
    });
  }

  const previewBody = document.getElementById('preview-body');
  if (previewBody) {
    previewBody.addEventListener('input', (e) => {
      const previewSubject = document.getElementById('preview-subject');
      updateMailtoLink(previewSubject ? previewSubject.value : "", e.target.value);
    });
  }
}

// ----------------------------------------------------
// Initialization & Data Loading
// ----------------------------------------------------
async function loadData() {
  // Guard clause: only run if the email tool elements are present
  if (!document.getElementById('wizard-container') && !document.getElementById('landing-container')) {
    return;
  }

  // 1. Fetch Recipients
  try {
    const response = await fetch('recepients.json');
    if (response.ok) {
      recipients = await response.json();
    } else {
      recipients = fallbackRecipients;
    }
  } catch (e) {
    console.warn("Could not fetch recepients.json (likely due to CORS offline), using fallback data", e);
    recipients = fallbackRecipients;
  }

  // 2. Fetch Templates
  try {
    const response = await fetch('templates.json');
    if (response.ok) {
      templates = await response.json();
    } else {
      templates = fallbackTemplates;
    }
  } catch (e) {
    console.warn("Could not fetch templates.json (likely due to CORS offline), using fallback data", e);
    templates = fallbackTemplates;
  }

  renderRecipients();
  setupListeners();
  generateEmail();
  initializeDeviceLayout(); // Initialize responsive layout helper
  window.addEventListener('resize', initializeDeviceLayout);
  showStep(0); // Initialize on landing view
}

// Fire on DOMContentLoaded
window.addEventListener('DOMContentLoaded', loadData);
