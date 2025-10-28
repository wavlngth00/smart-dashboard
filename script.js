// === NAVBAR TOGGLE ===
const navbarNav = document.querySelector(".navbar-nav");
const hamburger = document.querySelector("#hamburger-menu");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  navbarNav.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// === FOOTER YEAR ===
document.getElementById("year").textContent = new Date().getFullYear();

const ctx = document.getElementById("tempChart").getContext("2d");
const tempChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [],
        borderColor: "#1a4bb8",
        borderWidth: 2,
        fill: false,
        tension: 0.3,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.8,
    scales: {
      x: { title: { display: true, text: "Waktu" } },
      y: {
        title: { display: true, text: "Suhu (°C)" },
        suggestedMin: 20,
        suggestedMax: 35,
      },
    },
    plugins: { legend: { display: false } },
  },
});

async function fetchData() {
  try {
    const res = await fetch("backend/get_data.php");
    const data = await res.json();
    console.log("Data dari backend:", data);

    if (!Array.isArray(data) || data.length === 0) return;

    const labels = data.map((d) =>
      new Date(d.created_at).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    const temps = data.map((d) => parseFloat(d.temperature));

    // Urutkan dari lama ke baru
    tempChart.data.labels = labels.reverse();
    tempChart.data.datasets[0].data = temps.reverse();
    tempChart.update();

    const latest = temps[temps.length - 1];
    document.getElementById("tempValue").textContent =
      latest.toFixed(2) + " °C";
    document.getElementById("statusText").textContent =
      latest < 24 ? "Cool" : latest < 30 ? "Normal" : "Hot";
  } catch (err) {
    console.error("Fetch error:", err);
    document.getElementById("tempValue").textContent = "Error";
    document.getElementById("statusText").textContent = "Can't load data";
  }
}

fetchData();
setInterval(fetchData, 5000);
