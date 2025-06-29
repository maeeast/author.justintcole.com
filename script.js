document.addEventListener("DOMContentLoaded", function () {
  const mainContent = document.getElementById("main-content");
  const rightbar = document.getElementById("buy-sidebar");

  function loadPage(page) {
    fetch(`pages/${page}.html`)
      .then(res => res.text())
      .then(content => {
        mainContent.innerHTML = content;
        // Show rightbar only for book pages
        if (page.includes("-book")) {
        rightbar.style.display = "block";
        } else {
        rightbar.style.display = "none";
        }
        history.pushState({ page }, "", `#${page}`);
      })
      .catch(err => {
        mainContent.innerHTML = "<p>Sorry, this page couldn't be loaded.</p>";
        rightbar.style.display = "none";
      });
  }

  // Handle navigation clicks
  document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.dataset.page;
      loadPage(page);
    });
  });

  // Support browser back/forward buttons
  window.addEventListener("popstate", (e) => {
    const page = e.state?.page || "home";
    loadPage(page);
  });

  // Load default (or bookmarked) page
  const initialPage = location.hash.replace("#", "") || "home";
  loadPage(initialPage);
});
