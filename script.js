// ==========================================
// ANIMATED BACKGROUND
// ==========================================

const animatedBg = document.querySelector(".animated-bg");

const totalDots = 70;
const minDistance = 120;

const positions = [];
const particles = [];

if (animatedBg) {

    // CREATE DOTS
    for (let i = 0; i < totalDots; i++) {

        let x;
        let y;
        let validPosition = false;
        let attempts = 0;

        while (!validPosition && attempts < 1000) {

            x = Math.random() * window.innerWidth;
            y = Math.random() * window.innerHeight;

            validPosition = true;

            for (const position of positions) {

                const dx = x - position.x;
                const dy = y - position.y;

                const distance = Math.sqrt(
                    dx * dx + dy * dy
                );

                if (distance < minDistance) {
                    validPosition = false;
                    break;
                }
            }

            attempts++;
        }

        positions.push({ x, y });

        const dot = document.createElement("span");
        dot.classList.add("dot");

        animatedBg.appendChild(dot);

        particles.push({
            element: dot,

            x: x,
            y: y,

            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25
        });
    }


    // MOUSE POSITION

    let mouseX = -1000;
    let mouseY = -1000;

    document.addEventListener("mousemove", function (e) {

        mouseX = e.clientX;
        mouseY = e.clientY;

    });


    // ANIMATE DOTS

    function animateDots() {

        particles.forEach(function (particle) {

            // Normal movement
            particle.x += particle.vx;
            particle.y += particle.vy;


            // Bounce from screen edges
            if (
                particle.x <= 0 ||
                particle.x >= window.innerWidth
            ) {
                particle.vx *= -1;
            }

            if (
                particle.y <= 0 ||
                particle.y >= window.innerHeight
            ) {
                particle.vy *= -1;
            }


            // Cursor repel

            const dx = particle.x - mouseX;
            const dy = particle.y - mouseY;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );

            const repelDistance = 120;

            if (
                distance < repelDistance &&
                distance > 0
            ) {

                const angle = Math.atan2(dy, dx);

                const force =
                    (repelDistance - distance) /
                    repelDistance;

                particle.x +=
                    Math.cos(angle) * force * 5;

                particle.y +=
                    Math.sin(angle) * force * 5;
            }


            // Apply position

            particle.element.style.transform =
                `translate(${particle.x}px, ${particle.y}px)`;

        });

        requestAnimationFrame(animateDots);
    }

    animateDots();
}



// ==========================================
// REVENUE DATA
// ==========================================

const revenueData = {

    year: {

        labels: [
            "Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"
        ],

        data: [
            12000,
            15000,
            13500,
            18000,
            21000,
            19500,
            24000,
            27000,
            25000,
            30000,
            34000,
            38000
        ]

    },

    month: {

        labels: [
            "Week 1",
            "Week 2",
            "Week 3",
            "Week 4"
        ],

        data: [
            12500,
            18000,
            22000,
            27000
        ]

    },

    week: {

        labels: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ],

        data: [
            3200,
            4500,
            3800,
            5200,
            6100,
            4800,
            7200
        ]

    }

};



// ==========================================
// REVENUE CHART
// ==========================================

const ctx = document.getElementById("revenueChart");

let revenueChart = null;

if (ctx && typeof Chart !== "undefined") {

    revenueChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: revenueData.year.labels,

            datasets: [{

                label: "Revenue",

                data: revenueData.year.data,

                borderColor: "#db2777",

                backgroundColor: "rgba(219, 39, 119, 0.08)",

                borderWidth: 3,

                fill: true,

                tension: 0.4,

                pointRadius: 3,

                pointBackgroundColor: "#db2777"

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    grid: {
                        color: "rgba(0,0,0,0.05)"
                    }

                },

                x: {

                    grid: {
                        display: false
                    }

                }

            }

        }

    });

}



// ==========================================
// REVENUE FILTER
// ==========================================

const revenueFilter =
    document.getElementById("revenueFilter");

if (revenueFilter && revenueChart) {

    revenueFilter.addEventListener("change", function () {

        const selected = this.value;

        revenueChart.data.labels =
            revenueData[selected].labels;

        revenueChart.data.datasets[0].data =
            revenueData[selected].data;

        revenueChart.update();

    });

}



// ==========================================
// ORDERS CHART
// ==========================================

const ordersCanvas =
    document.getElementById("ordersChart");

if (ordersCanvas && typeof Chart !== "undefined") {

    new Chart(ordersCanvas, {

        type: "bar",

        data: {

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ],

            datasets: [{

                label: "Orders",

                data: [
                    120,
                    180,
                    150,
                    220,
                    260,
                    210,
                    290,
                    340,
                    280,
                    390,
                    420,
                    480
                ],

                backgroundColor: [
                    "#f9a8d4",
                    "#f9a8d4",
                    "#f9a8d4",
                    "#f9a8d4",
                    "#f9a8d4",
                    "#f9a8d4",
                    "#f9a8d4",
                    "#db2777",
                    "#f9a8d4",
                    "#f9a8d4",
                    "#f9a8d4",
                    "#db2777"
                ],

                borderRadius: 8,

                borderSkipped: false

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    grid: {
                        color: "rgba(0,0,0,0.05)"
                    }

                },

                x: {

                    grid: {
                        display: false
                    }

                }

            }

        }

    });

}



// ==========================================
// USER DISTRIBUTION CHART
// ==========================================

const usersCanvas =
    document.getElementById("usersChart");

if (usersCanvas && typeof Chart !== "undefined") {

    new Chart(usersCanvas, {

        type: "doughnut",

        data: {

            labels: [
                "New Users",
                "Active Users",
                "Returning Users",
                "Inactive Users"
            ],

            datasets: [{

                data: [
                    35,
                    40,
                    18,
                    7
                ],

                backgroundColor: [
                    "#f9a8d4",
                    "#db2777",
                    "#c4b5fd",
                    "#e9d5ff"
                ],

                borderWidth: 0,

                hoverOffset: 8

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            cutout: "68%",

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        padding: 15,

                        usePointStyle: true,

                        font: {
                            size: 12
                        }

                    }

                }

            }

        }

    });

}



// ==========================================
// DOWNLOAD REPORT
// ==========================================

const downloadReportBtn =
    document.getElementById("downloadReportBtn");

if (downloadReportBtn) {

    downloadReportBtn.addEventListener("click", function () {

        window.print();

    });

}



// ==========================================
// SEARCH SIDEBAR
// ==========================================

const searchBox =
    document.querySelector(".search-box");

const sidebarLinks =
    document.querySelectorAll(".sidebar-link");

if (searchBox) {

    searchBox.addEventListener("input", function () {

        const searchValue =
            this.value.toLowerCase().trim();

        sidebarLinks.forEach(function (link) {

            const text =
                link.textContent.toLowerCase();

            if (text.includes(searchValue)) {

                link.style.display = "flex";

            } else {

                link.style.display = "none";

            }

        });

    });

}



// ==========================================
// NOTIFICATION PANEL
// ==========================================

const notificationBell =
    document.getElementById("notificationBell");

const notificationPanel =
    document.getElementById("notificationPanel");

const closeNotification =
    document.getElementById("closeNotification");


if (notificationBell && notificationPanel) {

    notificationBell.addEventListener(
        "click",
        function () {

            notificationPanel.classList.add("active");

        }
    );

}


if (closeNotification && notificationPanel) {

    closeNotification.addEventListener(
        "click",
        function () {

            notificationPanel.classList.remove("active");

        }
    );

}



// ==========================================
// SETTINGS ELEMENTS
// ==========================================

const settingsLink =
    document.getElementById("settingsLink");

const dashboardLink =
    document.getElementById("dashboardLink");

const settingsPage =
    document.getElementById("settingsPage");

const dashboardMain =
    document.querySelector(".dashboard-main");



// ==========================================
// SHOW SETTINGS
// ==========================================

if (
    settingsLink &&
    settingsPage &&
    dashboardMain
) {

    settingsLink.addEventListener(
        "click",
        function (e) {

            e.preventDefault();

            dashboardMain.classList.add(
                "settings-mode"
            );

            settingsPage.classList.add(
                "active"
            );

        }
    );

}



// ==========================================
// OTHER SIDEBAR LINKS
// ==========================================

document.querySelectorAll(".sidebar-link")
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                // Settings ke ilawa
                // koi bhi sidebar link click ho

                if (this.id !== "settingsLink") {

                    if (dashboardMain) {

                        dashboardMain.classList.remove(
                            "settings-mode"
                        );

                    }

                    if (settingsPage) {

                        settingsPage.classList.remove(
                            "active"
                        );

                    }

                }

            }
        );

    });



// ==========================================
// DASHBOARD CLICK
// ==========================================

if (dashboardLink) {

    dashboardLink.addEventListener(
        "click",
        function (e) {

            e.preventDefault();

            if (dashboardMain) {

                dashboardMain.classList.remove(
                    "settings-mode"
                );

            }

            if (settingsPage) {

                settingsPage.classList.remove(
                    "active"
                );

            }

        }
    );

}



// ==========================================
// SAVE SETTINGS
// ==========================================

const saveSettings =
    document.getElementById("saveSettings");

if (saveSettings) {

    saveSettings.addEventListener(
        "click",
        function () {

            const name =
                document.getElementById("userName").value;

            const email =
                document.getElementById("userEmail").value;

            const emailNotifications =
                document.getElementById(
                    "emailNotifications"
                );

            const pushNotifications =
                document.getElementById(
                    "pushNotifications"
                );


            localStorage.setItem(
                "userName",
                name
            );

            localStorage.setItem(
                "userEmail",
                email
            );


            if (emailNotifications) {

                localStorage.setItem(
                    "emailNotifications",
                    emailNotifications.checked
                );

            }


            if (pushNotifications) {

                localStorage.setItem(
                    "pushNotifications",
                    pushNotifications.checked
                );

            }


            alert(
                "Settings saved successfully!"
            );

        }
    );

}



// ==========================================
// RESET SETTINGS
// ==========================================

const resetSettings =
    document.getElementById("resetSettings");

if (resetSettings) {

    resetSettings.addEventListener(
        "click",
        function () {

            const userName =
                document.getElementById("userName");

            const userEmail =
                document.getElementById("userEmail");

            const emailNotifications =
                document.getElementById(
                    "emailNotifications"
                );

            const pushNotifications =
                document.getElementById(
                    "pushNotifications"
                );


            if (userName) {

                userName.value =
                    "Anfal Tanveer";

            }


            if (userEmail) {

                userEmail.value =
                    "anfal@example.com";

            }


            if (emailNotifications) {

                emailNotifications.checked = true;

            }


            if (pushNotifications) {

                pushNotifications.checked = true;

            }

        }
    );

}



// ==========================================
// LOAD SAVED SETTINGS
// ==========================================

window.addEventListener(
    "DOMContentLoaded",
    function () {

        const savedName =
            localStorage.getItem("userName");

        const savedEmail =
            localStorage.getItem("userEmail");

        const savedEmailNotifications =
            localStorage.getItem(
                "emailNotifications"
            );

        const savedPushNotifications =
            localStorage.getItem(
                "pushNotifications"
            );


        const userName =
            document.getElementById("userName");

        const userEmail =
            document.getElementById("userEmail");

        const emailNotifications =
            document.getElementById(
                "emailNotifications"
            );

        const pushNotifications =
            document.getElementById(
                "pushNotifications"
            );


        if (savedName && userName) {

            userName.value =
                savedName;

        }


        if (savedEmail && userEmail) {

            userEmail.value =
                savedEmail;

        }


        if (
            savedEmailNotifications !== null &&
            emailNotifications
        ) {

            emailNotifications.checked =
                savedEmailNotifications === "true";

        }


        if (
            savedPushNotifications !== null &&
            pushNotifications
        ) {

            pushNotifications.checked =
                savedPushNotifications === "true";

        }

    }
);