/*
 * Shared header, navigation and footer.
 * Edit NAV below to add pages - every page picks up the change.
 * Pages in sub-folders set <body data-root="../../"> so links resolve correctly.
 */
(function () {
  var root = document.body.getAttribute("data-root") || "";

  var LINKS = {
    linkedin: "https://www.linkedin.com/in/nathan-everett-431a7533/",
    email: "mailto:nathaneverettgd@gmail.com",
    resume: "assets/Everett_Nathan_Resume.pdf"
  };

  var NAV = [
    { label: "Home", href: "index.html" },
    {
      label: "Projects",
      groups: [
        {
          title: "Professional",
          items: [
            { label: "Valorant - Riot Games", href: "valorant.html" },
            { label: "Unreal Vehicle Physics - Wargaming", href: "unreal-vehicle-physics.html" },
            { label: "BigWorld QA - Wargaming", href: "wargaming-bigworld.html" },
            { label: "Lumi & Dropple - Foundation Mobile", href: "foundation-mobile.html" }
          ]
        }
      ]
    },
    {
      label: "Board Games",
      groups: [
        {
          title: "Published",
          items: [{ label: "War of Supremacy", href: "war-of-supremacy.html" }]
        },
        {
          title: "In Development",
          items: [{ label: "Current Prototypes", href: "prototypes.html" }]
        }
      ]
    },
    { label: "Uni Work", href: "uni-work.html" },
    { label: "About & Resume", href: "about.html" }
  ];

  var ICONS = {
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.84-2.05 3.78-2.05 4.05 0 4.8 2.66 4.8 6.12V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.1 1.43-2.1 2.9V21H9z"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 5h20v14H2zm2 2v.4l8 5.1 8-5.1V7zm16 2.8-8 5.1-8-5.1V17h16z"/></svg>',
    resume: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h9l5 5v15H6zm8 1.5V8h4.5zM8 12h10v1.5H8zm0 3h10v1.5H8zm0 3h7v1.5H8z"/></svg>'
  };

  var here = location.pathname.split("/").pop() || "index.html";

  function link(item) {
    var cls = item.href === here && root === "" ? ' class="active"' : "";
    return '<a href="' + root + item.href + '"' + cls + ">" + item.label + "</a>";
  }

  var navHtml = NAV.map(function (entry) {
    if (!entry.groups) return "<li>" + link(entry) + "</li>";
    var inner = entry.groups.map(function (g) {
      return '<div class="group-label">' + g.title + "</div>" +
        "<ul>" + g.items.map(function (i) { return "<li>" + link(i) + "</li>"; }).join("") + "</ul>";
    }).join("");
    return '<li><button type="button" aria-haspopup="true">' + entry.label +
      ' &#9662;</button><div class="dropdown">' + inner + "</div></li>";
  }).join("");

  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<div class="wrap">' +
      '<a class="brand" href="' + root + 'index.html">Nathan <span>Everett</span></a>' +
      '<div class="header-right">' +
        '<nav aria-label="Main"><ul class="nav">' + navHtml + "</ul></nav>" +
        '<div class="socials">' +
          '<a href="' + LINKS.linkedin + '" target="_blank" rel="noopener" title="LinkedIn" aria-label="LinkedIn">' + ICONS.linkedin + "</a>" +
          '<a href="' + LINKS.email + '" title="Email" aria-label="Email">' + ICONS.email + "</a>" +
          '<a href="' + root + LINKS.resume + '" target="_blank" title="Resume (PDF)" aria-label="Resume">' + ICONS.resume + "</a>" +
        "</div>" +
      "</div>" +
    "</div>";
  document.body.insertBefore(header, document.body.firstChild);

  // Tap-to-open dropdowns for touch screens
  header.querySelectorAll(".nav button").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var li = btn.parentElement;
      var wasOpen = li.classList.contains("open");
      header.querySelectorAll(".nav li.open").forEach(function (o) { o.classList.remove("open"); });
      if (!wasOpen) li.classList.add("open");
    });
  });
  document.addEventListener("click", function () {
    header.querySelectorAll(".nav li.open").forEach(function (o) { o.classList.remove("open"); });
  });

  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="wrap">' +
      "<p>&copy; " + new Date().getFullYear() + " Nathan Everett. All rights reserved.</p>" +
      "<p>All trademarks and game titles are the property of their respective owners.</p>" +
    "</div>";
  document.body.appendChild(footer);

  // YouTube thumbnails: swap in the player on click. Pages opened from disk (file://)
  // can't embed YouTube, so there the link just opens the video on YouTube.
  document.querySelectorAll("a.yt[data-yt]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (!/^https?:$/.test(location.protocol)) return;
      e.preventDefault();
      var frame = document.createElement("iframe");
      frame.className = "video";
      frame.src = "https://www.youtube.com/embed/" + a.getAttribute("data-yt") + "?autoplay=1";
      frame.title = a.getAttribute("aria-label") || "YouTube video";
      frame.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      frame.allowFullscreen = true;
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      a.replaceWith(frame);
    });
  });
})();
