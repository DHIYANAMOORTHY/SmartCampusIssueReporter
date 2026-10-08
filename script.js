const issueForm = document.getElementById("issueForm");
const issueList = document.getElementById("issueList");

const totalIssues = document.getElementById("totalIssues");
const reportedIssues = document.getElementById("reportedIssues");
const progressIssues = document.getElementById("progressIssues");
const resolvedIssues = document.getElementById("resolvedIssues");

let issueCount = 0;
let reportedCount = 0;
let progressCount = 0;
let resolvedCount = 0;


// Submit Issue
issueForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const category = document.getElementById("category").value;
    const location = document.getElementById("location").value;
    const priority = document.getElementById("priority").value;
    const description = document.getElementById("description").value;

    // Create Issue ID
    issueCount++;
    reportedCount++;

    const issueId = "ISS-" + String(issueCount).padStart(3, "0");

    // Create Issue Card
    const issueCard = document.createElement("div");

    issueCard.className = "issue-card";

    issueCard.innerHTML = `
        <h3>${issueId} - ${category} Issue</h3>

        <p>
            <strong>Location:</strong>
            ${location}
        </p>

        <p>
            <strong>Priority:</strong>
            ${priority}
        </p>

        <p>
            <strong>Description:</strong>
            ${description}
        </p>

        <p class="status">
            <strong>Status:</strong>

            <span class="status-text status-reported">
                Reported
            </span>
        </p>

        <div class="status-buttons">

            <button onclick="changeStatus(this, 'progress')">
                In Progress
            </button>

            <button onclick="changeStatus(this, 'resolved')">
                Resolved
            </button>

        </div>
    `;

    // Remove empty message
    const emptyMessage = document.querySelector(".empty-message");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    // Add issue to page
    issueList.appendChild(issueCard);

    // Update dashboard
    updateDashboard();

    // Clear form
    issueForm.reset();

});


// Change Status
function changeStatus(button, newStatus) {

    const issueCard = button.closest(".issue-card");

    const statusText = issueCard.querySelector(".status-text");

    const oldStatus = statusText.textContent.trim();


    // Reported → In Progress
    if (oldStatus === "Reported" && newStatus === "progress") {

        reportedCount--;
        progressCount++;

        statusText.textContent = "In Progress";

        statusText.className =
            "status-text status-progress";
    }


    // Reported → Resolved
    else if (oldStatus === "Reported" && newStatus === "resolved") {

        reportedCount--;
        resolvedCount++;

        statusText.textContent = "Resolved";

        statusText.className =
            "status-text status-resolved";
    }


    // In Progress → Resolved
    else if (oldStatus === "In Progress" && newStatus === "resolved") {

        progressCount--;
        resolvedCount++;

        statusText.textContent = "Resolved";

        statusText.className =
            "status-text status-resolved";
    }


    // Update dashboard
    updateDashboard();
}


// Update Dashboard
function updateDashboard() {

    totalIssues.textContent = issueCount;

    reportedIssues.textContent = reportedCount;

    progressIssues.textContent = progressCount;

    resolvedIssues.textContent = resolvedCount;
}