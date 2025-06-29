document.addEventListener("DOMContentLoaded", function () {
  const mainContent = document.getElementById("main-content");

  function loadPage(page) {
    fetch(`pages/${page}.html`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then(content => {
        mainContent.innerHTML = content;
        history.pushState({ page }, "", `#${page}`);
      })
      .catch(err => {
        console.error("Error loading page:", err);
        mainContent.innerHTML = "<p>Sorry, this page couldn't be loaded.</p>";
      });
  }

  document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.dataset.page;
      loadPage(page);
    });
  });

  window.addEventListener("popstate", (e) => {
    const page = e.state?.page || "home";
    loadPage(page);
  });

  const initialPage = location.hash.replace("#", "") || "home";
  loadPage(initialPage);
});
