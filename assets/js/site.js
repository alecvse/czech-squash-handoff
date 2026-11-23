(function initialize() {
  "use strict";

  document.documentElement.classList.add("js");
  // A synchronous head script can expose loading before a large table is parsed.
  // Existing deferred pages are already interactive and initialize immediately.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
    return;
  }

  document.querySelectorAll("[data-copy-text]").forEach(function (button) {
    if (!navigator.clipboard || !navigator.clipboard.writeText) { return; }
    var status = button.parentElement.querySelector("[data-copy-status]");
    button.hidden = false;
    button.addEventListener("click", async function () {
      status.textContent = "";
      try {
        await navigator.clipboard.writeText(button.getAttribute("data-copy-text"));
        status.classList.add("visually-hidden");
        status.textContent = "Údaj byl zkopírován.";
        button.title = "Zkopírováno";
      } catch (error) {
        status.classList.remove("visually-hidden");
        status.textContent = "Kopírování se nezdařilo. Označte a zkopírujte údaj ručně.";
      }
    });
  });

  document.querySelectorAll("[data-schedule]").forEach(function (root) {
    var form = root.querySelector("[data-schedule-filters]");
    var team = form.elements.team;
    var round = form.elements.round;
    var groups = Array.from(root.querySelectorAll("[data-schedule-round]"));
    var empty = root.querySelector("[data-schedule-empty]");
    var count = root.querySelector("[data-schedule-count]");
    function applyFilters() {
      var total = 0;
      groups.forEach(function (group) {
        var shown = 0;
        group.querySelectorAll("[data-schedule-row]").forEach(function (row) {
          var visible = (!round.value || group.getAttribute("data-schedule-round") === round.value)
            && (!team.value || row.getAttribute("data-team-a") === team.value || row.getAttribute("data-team-b") === team.value || row.getAttribute("data-team-c") === team.value);
          row.hidden = !visible;
          if (visible) { shown += 1; }
        });
        group.hidden = shown === 0;
        total += shown;
      });
      empty.hidden = total !== 0;
      count.textContent = "Zobrazeno utkání: " + total + ".";
    }
    form.addEventListener("change", applyFilters);
    form.addEventListener("reset", function () { window.setTimeout(applyFilters, 0); });
    form.addEventListener("submit", function (event) { event.preventDefault(); });
    form.hidden = false;
    applyFilters();
  });

  document.querySelectorAll(".competition-rounds").forEach(function (list) {
    if (list.closest(".catalog-preview")) { return; }
    var parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Prague", year: "numeric", month: "2-digit", day: "2-digit"
    }).formatToParts(new Date());
    function part(type) { return parts.find(function (value) { return value.type === type; }).value; }
    var today = part("year") + "-" + part("month") + "-" + part("day");
    var cards = Array.from(list.querySelectorAll("[data-competition-round]"));
    var dates = cards.map(function (card) { return card.getAttribute("data-round-date"); }).sort();
    var playedDates = cards.filter(function (card) { return card.hasAttribute("data-round-played"); })
      .map(function (card) { return card.getAttribute("data-round-date"); }).sort();
    var current = dates.find(function (day) { return day >= today; }) || playedDates[playedDates.length - 1];
    cards.sort(function (a, b) {
      var first = a.getAttribute("data-round-date"), second = b.getAttribute("data-round-date");
      return Number(second === current) - Number(first === current) || first.localeCompare(second);
    }).forEach(function (card) {
      var selected = card.getAttribute("data-round-date") === current;
      card.toggleAttribute("data-current-round", selected);
      var toggle = card.querySelector("[data-disclosure-toggle]");
      if (toggle) { toggle.setAttribute("aria-expanded", String(selected)); }
      list.appendChild(card);
    });
  });

  document.querySelectorAll("[data-disclosure-toggle]").forEach(function (button) {
    var panel = document.getElementById(button.getAttribute("aria-controls"));
    if (!panel) { return; }
    var label = button.getAttribute("data-disclosure-label") || "zápasy kola";
    function setExpanded(expanded) {
      button.setAttribute("aria-expanded", String(expanded));
      button.setAttribute("aria-label", (expanded ? "Sbalit " : "Rozbalit ") + label);
      panel.hidden = !expanded;
    }
    setExpanded(button.getAttribute("aria-expanded") === "true");
    button.addEventListener("click", function () {
      setExpanded(button.getAttribute("aria-expanded") !== "true");
    });
    button.hidden = false;
  });

  document.querySelectorAll(".section-nav__list").forEach(function (list) {
    var active = list.querySelector('a[aria-current]:not([aria-current="false"])');

    function updateEdges() {
      list.classList.toggle("is-overflowing-start", list.scrollLeft > 1);
      list.classList.toggle("is-overflowing-end", list.scrollWidth - list.clientWidth - list.scrollLeft > 1);
    }

    function revealActive() {
      if (active && list.clientWidth) {
        var bounds = list.getBoundingClientRect();
        var item = active.getBoundingClientRect();
        var padding = parseFloat(getComputedStyle(list).paddingInlineStart) || 0;
        if (item.left < bounds.left + padding) {
          list.scrollLeft += item.left - bounds.left - padding;
        } else if (item.right > bounds.right - padding) {
          list.scrollLeft += item.right - bounds.right + padding;
        }
      }
      updateEdges();
    }

    list.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", revealActive);
    if (window.ResizeObserver) {
      new ResizeObserver(revealActive).observe(list);
    }
    revealActive();
    if (document.fonts) {
      document.fonts.ready.then(revealActive);
    }
  });

  var header = document.querySelector("[data-site-header]");
  var menuToggle = document.querySelector("[data-menu-toggle]");
  var mobileMenu = document.querySelector("[data-mobile-menu]");
  var desktopQuery = window.matchMedia("(min-width: 1200px)");

  function updateHeader() {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 0);
    }
  }

  function setMenu(open, restoreFocus) {
    if (!menuToggle || !mobileMenu) {
      return;
    }

    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Zavřít menu" : "Otevřít menu");
    mobileMenu.hidden = !open;

    if (!open && restoreFocus) {
      menuToggle.focus();
    }
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (menuToggle && mobileMenu) {
    setMenu(false, false);
    menuToggle.hidden = false;

    mobileMenu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setMenu(false, false);
      }
    });

    menuToggle.addEventListener("click", function () {
      setMenu(menuToggle.getAttribute("aria-expanded") !== "true", false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false, true);
      }
    });

    desktopQuery.addEventListener("change", function (event) {
      if (event.matches) {
        setMenu(false, false);
      }
    });
  }

  function normalized(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("cs").trim();
  }

  var catalogSearch = document.querySelector("[data-catalog-search]");
  if (catalogSearch) {
    var catalogInput = catalogSearch.querySelector("input");
    var catalogCount = document.getElementById("catalog-search-count");
    var catalogEmpty = document.querySelector("[data-catalog-empty]");
    var catalogExamples = Array.from(document.querySelectorAll("[data-catalog-example]"));
    var catalogFamilies = Array.from(document.querySelectorAll(".catalog-family"));
    var catalogGroups = Array.from(document.querySelectorAll("[data-catalog-group]"));
    function searchCatalog() {
      var query = normalized(catalogInput.value);
      var visible = 0;
      catalogExamples.forEach(function (example) {
        var note = example.querySelector(".catalog-spec p");
        var text = example.getAttribute("data-catalog-keywords") + " " + (note ? note.textContent : "");
        example.hidden = !normalized(text).includes(query);
        if (!example.hidden) { visible += 1; }
      });
      catalogFamilies.concat(catalogGroups).forEach(function (group) {
        group.hidden = !Array.from(group.querySelectorAll("[data-catalog-example]")).some(function (example) { return !example.hidden; });
      });
      catalogCount.textContent = "Zobrazeno: " + visible + " z " + catalogExamples.length + " ukázek komponent.";
      catalogEmpty.hidden = visible !== 0;
    }
    catalogSearch.hidden = false;
    catalogSearch.addEventListener("submit", function (event) { event.preventDefault(); });
    catalogInput.addEventListener("input", searchCatalog);
    document.querySelectorAll("[data-catalog-copy-feedback]").forEach(function (feedback) {
      var status = feedback.closest(".catalog-example").querySelector("[data-copy-status]");
      if (!status) { return; }
      new MutationObserver(function () {
        feedback.textContent = status.textContent;
        feedback.hidden = !feedback.textContent || !status.classList.contains("visually-hidden");
      }).observe(status, { childList: true, characterData: true, subtree: true });
    });
    document.querySelectorAll("[data-catalog-pagination-demo]").forEach(function (pagination) {
      var page = 1;
      var pages = 3;
      function updateDemo() { renderListingPagination(pagination, pages, page); }
      pagination.addEventListener("click", function (event) {
        var control = event.target.closest("button[data-page]");
        if (!control || !pagination.contains(control) || control.disabled) { return; }
        page = Number(control.dataset.page);
        updateDemo();
        pagination.querySelector('button[aria-current="page"]').focus({ preventScroll: true });
      });
      updateDemo();
    });
    document.querySelector(".catalog-app").addEventListener("click", function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (link && catalogInput.value) {
        catalogInput.value = "";
        searchCatalog();
      }
    });
    searchCatalog();

    var catalogNavigation = document.getElementById("catalog-navigation");
    var catalogNavToggle = document.querySelector("[data-catalog-nav-toggle]");
    var catalogMobile = window.matchMedia("(max-width: 767px)");
    var catalogNavLinks = Array.from(catalogNavigation.querySelectorAll('a[href^="#"]'));
    var catalogNavTargets = catalogNavLinks.map(function (link) {
      return { id: link.hash.slice(1), target: document.getElementById(link.hash.slice(1)), link: link };
    }).filter(function (entry) { return entry.target; });
    var activeCatalogLink = null;
    var catalogScrollFrame = null;
    function revealCatalogLocation() {
      if (!activeCatalogLink || catalogNavigation.hidden) { return; }
      var scroller = catalogMobile.matches ? catalogNavigation : catalogNavToggle.closest(".catalog-sidebar");
      var bounds = scroller.getBoundingClientRect();
      var item = activeCatalogLink.getBoundingClientRect();
      if (item.top < bounds.top + 12) { scroller.scrollTop -= bounds.top + 12 - item.top; }
      else if (item.bottom > bounds.bottom - 12) { scroller.scrollTop += item.bottom - bounds.bottom + 12; }
    }
    function setCatalogNavigation(open, restoreFocus) {
      catalogNavigation.hidden = catalogMobile.matches && !open;
      catalogNavToggle.setAttribute("aria-expanded", String(!catalogNavigation.hidden));
      if (!catalogNavigation.hidden) { revealCatalogLocation(); }
      if (restoreFocus) { catalogNavToggle.focus(); }
    }
    function setCatalogLocation(id) {
      var entry = catalogNavTargets.find(function (item) { return item.id === id; });
      if (!entry || entry.link === activeCatalogLink) { return; }
      activeCatalogLink = entry.link;
      catalogNavLinks.forEach(function (link) {
        if (link === activeCatalogLink) {
          link.setAttribute("aria-current", "location");
          var group = link.closest("details");
          if (group) { group.open = true; }
        } else { link.removeAttribute("aria-current"); }
      });
      revealCatalogLocation();
    }
    function highlightCatalogNavigation() {
      var target = document.getElementById(window.location.hash.slice(1));
      var section = target && target.closest(".catalog-family, .catalog-foundation, .catalog-section");
      setCatalogLocation(section ? section.id : "zaklady");
    }
    function updateCatalogLocation() {
      catalogScrollFrame = null;
      var visible = catalogNavTargets.filter(function (entry) { return entry.target.getClientRects().length; });
      if (!visible.length) { return; }
      var current = visible[0];
      var readingLine = Math.min(120, window.innerHeight / 4);
      visible.forEach(function (entry) {
        if (entry.target.getBoundingClientRect().top <= readingLine) { current = entry; }
      });
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = visible[visible.length - 1];
      }
      setCatalogLocation(current.id);
    }
    function scheduleCatalogLocation() {
      if (catalogScrollFrame === null) { catalogScrollFrame = window.requestAnimationFrame(updateCatalogLocation); }
    }
    catalogNavToggle.hidden = false;
    setCatalogNavigation(!catalogMobile.matches, false);
    catalogNavToggle.addEventListener("click", function () { setCatalogNavigation(catalogNavigation.hidden, false); });
    catalogNavToggle.closest(".catalog-sidebar").addEventListener("keydown", function (event) {
      if (event.key === "Escape" && catalogMobile.matches) { setCatalogNavigation(false, true); }
    });
    catalogNavigation.addEventListener("click", function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (link && catalogMobile.matches) {
        if (catalogInput.value) { catalogInput.value = ""; searchCatalog(); }
        var target = document.getElementById(link.getAttribute("href").slice(1));
        setCatalogNavigation(false, false);
        if (target) { target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true }); }
      }
    });
    catalogMobile.addEventListener("change", function () { setCatalogNavigation(!catalogMobile.matches, false); scheduleCatalogLocation(); });
    window.addEventListener("hashchange", highlightCatalogNavigation);
    window.addEventListener("scroll", scheduleCatalogLocation, { passive: true });
    window.addEventListener("resize", scheduleCatalogLocation);
    catalogInput.addEventListener("input", scheduleCatalogLocation);
    if (window.ResizeObserver) {
      var catalogLayoutObserver = new ResizeObserver(scheduleCatalogLocation);
      catalogLayoutObserver.observe(document.querySelector(".catalog-content"));
    }
    highlightCatalogNavigation();
    scheduleCatalogLocation();

    function measureCatalogType() {
      document.querySelectorAll("[data-catalog-measure]").forEach(function (row) {
        var rootSelector = row.getAttribute("data-catalog-measure-root");
        var host = rootSelector && document.querySelector(rootSelector);
        var scope = rootSelector ? host && host.shadowRoot : document;
        var sample = scope && scope.querySelector(row.getAttribute("data-catalog-measure"));
        var value = row.querySelector("[data-catalog-measure-value]");
        if (!sample || !value) { return; }
        var style = window.getComputedStyle(sample);
        value.textContent = style.fontSize + " / " + style.lineHeight + " · " + style.fontWeight;
      });
    }
    document.querySelectorAll("[data-catalog-type-shadow]").forEach(function (host) {
      if (host.shadowRoot) {
        host.shadowRoot.querySelectorAll('link[rel="stylesheet"]').forEach(function (link) {
          link.addEventListener("load", measureCatalogType);
        });
      }
    });
    measureCatalogType();
    window.addEventListener("resize", measureCatalogType);
    if (document.fonts) { document.fonts.ready.then(measureCatalogType); }
  }

  function setupClubMap(list, items) {
    var canvas = list.querySelector("[data-club-map]");
    var status = list.querySelector("[data-club-map-status]");
    var key = window.CZECH_SQUASH_MAPY_KEY;
    if (!canvas || !window.L || !key || !["127.0.0.1", "localhost", "czech-squash.netlify.app"].includes(window.location.hostname)) { return null; }
    var L = window.L;
    canvas.hidden = false;
    var map = L.map(canvas, { scrollWheelZoom: false, zoomAnimation: false, fadeAnimation: false, markerZoomAnimation: false });
    map.zoomControl.setPosition("topright");
    map.zoomControl.getContainer().querySelector(".leaflet-control-zoom-in").setAttribute("aria-label", "Přiblížit mapu");
    map.zoomControl.getContainer().querySelector(".leaflet-control-zoom-out").setAttribute("aria-label", "Oddálit mapu");
    // Retina tiles cover the same area; render 512 source pixels in 256 CSS pixels.
    var tiles = L.tileLayer("https://api.mapy.com/v1/maptiles/basic/256@2x/{z}/{x}/{y}?apikey=" + encodeURIComponent(key) + "&lang=cs", {
      tileSize: 256, minZoom: 3, maxZoom: 19,
      attribution: '<a href="https://api.mapy.com/copyright">Seznam.cz a.s. a další</a>'
    });
    tiles.on("tileerror", function () { status.textContent = "Mapový podklad se nepodařilo načíst. Seznam klubů funguje dál; mapu můžete otevřít na Mapy.com."; });
    tiles.on("load", function () {
      if (canvas.querySelector(".leaflet-tile-loaded")) { status.textContent = ""; }
    });
    tiles.addTo(map);
    var branding = L.control({ position: "bottomleft" });
    branding.onAdd = function () {
      var link = L.DomUtil.create("a", "club-map__provider");
      link.href = "https://mapy.com/";
      link.setAttribute("aria-label", "Mapy.com");
      var logo = document.createElement("img");
      logo.src = "../assets/ui/logo-mapy.svg";
      logo.alt = "Mapy.com";
      logo.height = 40;
      link.append(logo);
      L.DomEvent.disableClickPropagation(link);
      return link;
    };
    branding.addTo(map);
    var icon = L.icon({ iconUrl: "../assets/ui/club-map-marker.svg", iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] });
    var layer = L.layerGroup().addTo(map);
    var venues = new Map();
    items.forEach(function (item) {
      var lat = Number(item.getAttribute("data-latitude"));
      var lon = Number(item.getAttribute("data-longitude"));
      if (!item.getAttribute("data-latitude") || !item.getAttribute("data-longitude") || !Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) { return; }
      var id = lat + "," + lon;
      if (!venues.has(id)) { venues.set(id, { coordinates: [lat, lon], items: [] }); }
      venues.get(id).items.push(item);
    });
    function update() {
      layer.clearLayers();
      var points = [];
      venues.forEach(function (venue) {
        var visible = venue.items.filter(function (item) { return !item.hidden; });
        if (!visible.length) { return; }
        points.push(venue.coordinates);
        var name = visible[0].querySelector("dd").textContent;
        var content = document.createElement("div");
        var heading = document.createElement("strong");
        heading.textContent = name;
        content.append(heading);
        var links = document.createElement("ul");
        visible.forEach(function (item) {
          var row = document.createElement("li");
          var original = item.querySelector("h2 a");
          var link = document.createElement("a");
          link.href = original.href;
          link.textContent = original.textContent;
          row.append(link);
          links.append(row);
        });
        content.append(links);
        L.marker(venue.coordinates, { icon: icon, title: name, alt: name, keyboard: true }).bindPopup(content).addTo(layer);
      });
      if (points.length) { map.fitBounds(points, { padding: [40, 40], maxZoom: points.length === 1 ? 13 : 12, animate: false }); }
    }
    map.on("resize", update);
    return { update: update };
  }

  function setupCatalogClubMap(list, ready) {
    var button = list.querySelector("[data-catalog-map-load]");
    var canvas = list.querySelector("[data-club-map]");
    var status = list.querySelector("[data-club-map-status]");
    if (!button || !canvas || !status) { return; }
    if (!["127.0.0.1", "localhost", "czech-squash.netlify.app"].includes(window.location.hostname)) {
      status.textContent = "Živá ukázka mapy není na této adrese dostupná. Seznam a odkazy na Mapy.com fungují dál.";
      return;
    }
    var assets = new Map();
    function loadAsset(url, stylesheet) {
      if (!assets.has(url)) {
        assets.set(url, new Promise(function (resolve, reject) {
          var asset = document.createElement(stylesheet ? "link" : "script");
          if (stylesheet) { asset.rel = "stylesheet"; asset.href = url; }
          else { asset.src = url; }
          asset.onload = resolve;
          asset.onerror = function () {
            asset.remove();
            assets.delete(url);
            reject(new Error("Mapový soubor není dostupný."));
          };
          if (stylesheet) {
            document.head.insertBefore(asset, document.querySelector('link[href*="assets/css/site.css"]'));
          } else { document.head.append(asset); }
        }));
      }
      return assets.get(url);
    }
    button.hidden = false;
    button.addEventListener("click", function () {
      button.disabled = true;
      button.textContent = "Načítám mapu…";
      canvas.setAttribute("aria-busy", "true");
      status.textContent = "Načítáme mapu…";
      loadAsset(button.getAttribute("data-catalog-map-css"), true)
        .then(function () { return loadAsset(button.getAttribute("data-catalog-map-library"), false); })
        .then(function () { return loadAsset(button.getAttribute("data-catalog-map-config"), false); })
        .then(function () {
          ready();
          canvas.removeAttribute("aria-busy");
          button.hidden = true;
          button.parentElement.hidden = true;
          status.textContent = "Mapa je načtená. Hledání a město filtrují mapu i seznam.";
          canvas.focus({ preventScroll: true });
        })
        .catch(function () {
          canvas.removeAttribute("aria-busy");
          button.disabled = false;
          button.textContent = "Zkusit načíst mapu";
          status.textContent = "Mapu se nepodařilo načíst. Seznam a filtry fungují dál; mapu můžete otevřít na Mapy.com.";
        });
    });
  }

  function setupClubFinder(list, form, items) {
    if (!list.hasAttribute("data-club-finder")) { return null; }
    var controls = list.querySelector("[data-club-location]");
    var locate = list.querySelector("[data-club-locate]");
    var clear = list.querySelector("[data-club-location-clear]");
    var status = list.querySelector("[data-club-location-status]");
    var grid = list.querySelector(".club-grid");
    if (!controls || !locate || !clear || !status || !grid) { return null; }
    var request = 0;
    var hasLocation = false;
    var supported = !!(navigator.geolocation && window.isSecureContext);
    var unavailable = "Poloha v tomto prohlížeči není dostupná. Vyberte město nebo použijte hledání.";

    function resetLocation() {
      request += 1;
      hasLocation = false;
      items.forEach(function (item) {
        grid.append(item);
        var label = item.querySelector("[data-club-distance]");
        if (label) { label.hidden = true; label.textContent = ""; }
      });
      locate.disabled = !supported;
      locate.textContent = "Použít moji polohu";
      clear.hidden = true;
      status.textContent = supported ? "" : unavailable;
    }
    clear.addEventListener("click", function () { resetLocation(); locate.focus(); });
    form.addEventListener("reset", resetLocation);
    controls.hidden = false;
    if (!supported) {
      locate.disabled = true;
      status.textContent = unavailable;
      return;
    }

    function distance(lat1, lon1, lat2, lon2) {
      var radians = Math.PI / 180;
      var dLat = (lat2 - lat1) * radians;
      var dLon = (lon2 - lon1) * radians;
      var a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * radians) * Math.cos(lat2 * radians) * Math.sin(dLon / 2) ** 2;
      return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
    }
    locate.addEventListener("click", function () {
      var current = ++request;
      locate.disabled = true;
      status.textContent = "Zjišťujeme polohu…";
      function failure(error) {
        if (current !== request) { return; }
        locate.disabled = false;
        status.textContent = error.code === 1 ?
          "Přístup k poloze nebyl povolen. Vyberte město nebo použijte hledání." :
          "Polohu se nepodařilo zjistit. Zkuste to znovu nebo vyberte město.";
        if (hasLocation) { status.textContent += " Seznam zůstává seřazený podle předchozí polohy."; }
      }
      navigator.geolocation.getCurrentPosition(function (position) {
        if (current !== request) { return; }
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
          failure({ code: 2 }); return;
        }
        var ordered = items.map(function (item, index) {
          var latText = item.getAttribute("data-latitude");
          var lonText = item.getAttribute("data-longitude");
          var lat = Number(latText);
          var lon = Number(lonText);
          var known = latText !== null && latText.trim() !== "" && lonText !== null && lonText.trim() !== "" &&
            Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180;
          return { item: item, index: index, km: known ? distance(latitude, longitude, lat, lon) : Infinity };
        });
        ordered.sort(function (a, b) { return a.km - b.km || a.index - b.index; });
        ordered.forEach(function (entry) {
          grid.append(entry.item);
          var label = entry.item.querySelector("[data-club-distance]");
          if (label) {
            label.hidden = false;
            label.textContent = Number.isFinite(entry.km) ? "Přibližně " + Math.round(entry.km).toLocaleString("cs") + " km vzdušnou čarou" : "Vzdálenost není k dispozici";
          }
        });
        hasLocation = true;
        locate.disabled = false;
        locate.textContent = "Aktualizovat moji polohu";
        clear.hidden = false;
        status.textContent = "Seřazeno od nejbližšího sportoviště. Vzdálenosti jsou orientační, vzdušnou čarou.";
      }, failure, { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 });
    });
    return;
  }

  // Rankings select one official category and edition before filtering its players.
  document.querySelectorAll("[data-rankings]").forEach(function (root) {
    var form = root.querySelector("[data-list-filters]");
    var controls = form.elements;
    var ageField = form.querySelector("[data-ranking-age-field]");
    var status = root.querySelector("[data-result-count]");
    var empty = root.querySelector("[data-filter-empty]");
    var pagination = root.querySelector("[data-pagination]");
    var results = root.querySelector("[data-ranking-results]");
    var content = root.querySelector("[data-ranking-content]");
    var loading = root.querySelector("[data-ranking-loading]");
    var pageSize = Number(root.getAttribute("data-page-size")) || 50;
    var page = 1;
    var shownRecord = null;
    var renderVersion = 0;
    var renderTimer = 0;
    var loadingTimer = 0;
    var busyFocus = null;
    var categories = new Map();
    var remembered = {
      adults: { division: "male", age: "" },
      juniors: { division: "male", age: "19" },
      masters: { division: "male", age: "35" }
    };
    var records = Array.from(root.querySelectorAll("section[data-category][data-edition]")).map(function (section) {
      var category = section.getAttribute("data-category");
      var meta = {
        category: category,
        audience: section.getAttribute("data-ranking-audience"),
        division: section.getAttribute("data-ranking-division"),
        age: section.getAttribute("data-ranking-age")
      };
      categories.set(category, meta);
      return {
        element: section, meta: meta, edition: section.getAttribute("data-edition"),
        table: section.querySelector(".table-scroll"),
        // Index only the selected edition; keep the original DOM for no-JS access.
        rowElements: null, rows: []
      };
    });
    var available = Array.from(categories.values()).filter(function (meta) {
      return records.some(function (record) { return record.meta.category === meta.category && record.edition; });
    });
    if (!available.length) { return; }
    records.forEach(function (record) { record.element.hidden = true; });

    function setBusy(busy) {
      content.setAttribute("aria-busy", String(busy));
      if (busy) { busyFocus = shownRecord && shownRecord.element.contains(document.activeElement) ? document.activeElement : null; }
      if (shownRecord) { shownRecord.element.inert = busy; }
      window.clearTimeout(loadingTimer);
      if (busy) {
        results.dataset.rankingState = "loading";
        loading.setAttribute("role", "status");
        loading.textContent = "Načítání žebříčku…";
        loadingTimer = window.setTimeout(function () { loading.hidden = false; }, 120);
      } else {
        results.dataset.rankingState = "ready";
        root.setAttribute("data-ranking-initialized", "");
        loading.hidden = true;
        // A BFCache restore may start with focus on a player link inside the table.
        if (busyFocus && document.activeElement === document.body && busyFocus.isConnected && !busyFocus.closest("[hidden]")) {
          busyFocus.focus({ preventScroll: true });
        }
        busyFocus = null;
      }
    }
    function renderError() {
      setBusy(false);
      results.dataset.rankingState = "error";
      loading.setAttribute("role", "alert");
      loading.textContent = "Žebříček se nepodařilo zobrazit. ";
      var retry = document.createElement("button");
      retry.className = "button button--secondary button--small";
      retry.type = "button";
      retry.textContent = "Zkusit znovu";
      retry.addEventListener("click", function () { requestRender(false, retry); });
      loading.append(retry);
      loading.hidden = false;
    }
    function prepareRows(record, version, done) {
      if (!record) { done(); return; }
      if (!record.rowElements) { record.rowElements = Array.from(record.element.querySelectorAll("[data-filter-item]")); }
      // Yield on slower devices so loading, input and the latest filter can paint.
      var deadline = performance.now() + 8;
      while (record.rows.length < record.rowElements.length) {
        var row = record.rowElements[record.rows.length];
        var name = row.querySelector('th[scope="row"]');
        var club = row.querySelector("[data-ranking-club]");
        record.rows.push({ element: row, search: normalized((name ? name.textContent : "") + " " + (club ? club.textContent : "")) });
        if (performance.now() >= deadline && record.rows.length < record.rowElements.length) {
          renderTimer = window.setTimeout(function () {
            if (version !== renderVersion) { return; }
            try { prepareRows(record, version, done); } catch (error) { renderError(); }
          }, 0);
          return;
        }
      }
      done();
    }
    function requestRender(dateChanged, focusOwner) {
      var version = ++renderVersion;
      var requestedFocus = focusOwner && document.activeElement === focusOwner;
      window.clearTimeout(renderTimer);
      // Coalesce inputs without adding a fixed waiting period to fast operations.
      if (results.dataset.rankingState !== "loading") { setBusy(true); }
      renderTimer = window.setTimeout(function () {
        if (version !== renderVersion) { return; }
        try {
          prepareRows(activeRecord(), version, function () {
            if (version !== renderVersion) { return; }
            var moveFocus = requestedFocus && (document.activeElement === focusOwner || (!focusOwner.isConnected && document.activeElement === document.body));
            render(dateChanged);
            setBusy(false);
            if (moveFocus && shownRecord) {
              var heading = shownRecord.element.querySelector("h2");
              heading.tabIndex = -1;
              heading.focus({ preventScroll: true });
              heading.scrollIntoView({ block: "start" });
            }
          });
        } catch (error) { renderError(); }
      }, 0);
    }

    function dateLabel(date) { return date.split("-").reverse().join("."); }
    function setOptions(control, values, selected, label) {
      control.replaceChildren();
      values.forEach(function (value) {
        var option = document.createElement("option");
        option.value = value;
        option.textContent = label(value);
        control.append(option);
      });
      control.value = selected;
    }
    function editions(category) {
      return records.filter(function (record) { return record.meta.category === category && record.edition; })
        .map(function (record) { return record.edition; }).sort().reverse();
    }
    function syncDates(preferred, year) {
      var dates = editions(controls.category.value);
      var selected = dates.includes(preferred) ? preferred : dates[0] || "";
      if (year) {
        var inYear = dates.filter(function (date) { return date.slice(0, 4) === year; });
        selected = inYear.find(function (date) { return date.slice(5) === preferred.slice(5); }) || inYear[0] || selected;
      }
      var years = Array.from(new Set(dates.map(function (date) { return date.slice(0, 4); })));
      setOptions(controls.year, years.length ? years : [""], selected.slice(0, 4), function (value) { return value || "Žádný rok"; });
      setOptions(controls.edition, dates.length ? dates.filter(function (date) { return date.slice(0, 4) === selected.slice(0, 4); }) : [""], selected,
        function (value) { return value ? dateLabel(value) : "Žádné vydání"; });
      controls.year.disabled = !dates.length;
      controls.edition.disabled = !dates.length;
      return !!preferred && preferred !== selected;
    }
    function setCategory(category) {
      var meta = categories.get(category) || categories.get("muzi") || available[0];
      controls.category.value = meta.category;
      controls.audience.value = meta.audience;
      controls.division.value = meta.division;
      remembered[meta.audience] = { division: meta.division, age: meta.age };
      var ages = available.filter(function (entry) { return entry.audience === meta.audience && entry.division === meta.division; })
        .map(function (entry) { return entry.age; }).sort(function (a, b) { return Number(a) - Number(b); });
      // An incoming empty category remains identifiable, without offering it in ordinary navigation.
      if (meta.age && !ages.includes(meta.age)) { ages.push(meta.age); ages.sort(function (a, b) { return Number(a) - Number(b); }); }
      setOptions(controls.age, ages, meta.age, function (value) { return meta.audience === "juniors" ? "U" + value : value + "+"; });
      if (!editions(meta.category).length && meta.age) { controls.age.selectedOptions[0].disabled = true; }
      ageField.hidden = meta.audience === "adults";
      controls.age.disabled = ageField.hidden;
      form.querySelectorAll("[data-ranking-division-label]").forEach(function (label, index) {
        label.textContent = meta.audience === "juniors" ? ["Chlapci", "Dívky"][index] : ["Muži", "Ženy"][index];
      });
    }
    function chooseCategory(audience, division, age) {
      var choices = available.filter(function (meta) { return meta.audience === audience && meta.division === division; });
      var selected = choices.find(function (meta) { return meta.age === age; }) || choices[0];
      setCategory(selected ? selected.category : available[0].category);
    }
    function activeRecord() {
      return records.find(function (record) { return record.meta.category === controls.category.value && record.edition === controls.edition.value; });
    }
    function saveURL() {
      var url = new URL(window.location.href);
      url.searchParams.set("category", controls.category.value);
      if (controls.edition.value) { url.searchParams.set("edition", controls.edition.value); }
      else { url.searchParams.delete("edition"); }
      if (controls.search.value) { url.searchParams.set("search", controls.search.value); }
      else { url.searchParams.delete("search"); }
      if (page > 1) { url.searchParams.set("page", String(page)); }
      else { url.searchParams.delete("page"); }
      // Ranking fragments become query state; unrelated anchors (including the skip link) stay usable.
      var target = null;
      try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch (error) { /* Keep unrelated fragments. */ }
      if (target && root.contains(target) && target.hasAttribute("data-category")) { url.hash = ""; }
      if (url.href !== window.location.href) { window.history.replaceState(window.history.state, "", url); }
    }
    function renderPagination(pages) {
      pagination.replaceChildren();
      pagination.hidden = pages < 2;
      if (pages < 2) { return; }
      function button(number, label, disabled, direction) {
        var control = document.createElement("button");
        control.type = "button";
        control.className = "button button--secondary";
        control.dataset.rankingPage = String(number);
        control.disabled = disabled;
        control.setAttribute("aria-label", direction ? label + " strana" : "Strana " + number);
        if (direction) {
          var arrow = document.createElement("span");
          arrow.className = "ui-icon ui-icon--arrow-" + direction;
          arrow.setAttribute("aria-hidden", "true");
          control.append(arrow);
        } else {
          control.textContent = String(number);
          if (number === page) { control.setAttribute("aria-current", "page"); }
        }
        pagination.append(control);
      }
      button(page - 1, "Předchozí", page === 1, "left");
      var numbers = new Set([1, pages]);
      if (pages <= 7) { for (var number = 1; number <= pages; number += 1) { numbers.add(number); } }
      else {
        var start = Math.max(2, Math.min(page - 1, pages - 3));
        for (var middle = start; middle <= Math.min(pages - 1, start + 2); middle += 1) { numbers.add(middle); }
      }
      var previous = 0;
      Array.from(numbers).sort(function (a, b) { return a - b; }).forEach(function (number) {
        if (previous && number > previous + 1) {
          var gap = document.createElement("span");
          gap.className = "pagination__ellipsis";
          gap.setAttribute("aria-hidden", "true");
          gap.textContent = "…";
          pagination.append(gap);
        }
        button(number, "", false);
        previous = number;
      });
      button(page + 1, "Další", page === pages, "right");
    }
    function render(dateChanged) {
      var record = activeRecord();
      var terms = normalized(controls.search.value).trim().split(/\s+/).filter(Boolean);
      var matches = record ? record.rows.filter(function (row) { return terms.every(function (term) { return row.search.includes(term); }); }) : [];
      var pages = Math.ceil(matches.length / pageSize);
      page = Math.max(1, Math.min(page, pages || 1));
      var start = (page - 1) * pageSize;
      var visible = new Set(matches.slice(start, start + pageSize));
      if (shownRecord !== record) {
        if (shownRecord) { shownRecord.element.hidden = true; shownRecord.element.inert = false; }
        shownRecord = record;
      }
      if (record) {
        record.rows.forEach(function (row) {
          var hidden = !visible.has(row);
          if (row.element.hidden !== hidden) { row.element.hidden = hidden; }
        });
        if (record.element.hidden) { record.element.hidden = false; }
      }
      if (record && record.table) { record.table.hidden = matches.length === 0; }
      empty.hidden = !record || !record.rows.length || matches.length !== 0;
      var title = record ? record.element.querySelector("h2").textContent : "Žebříček";
      status.textContent = title + ". " +
        (matches.length ? "Zobrazeno: " + (start + 1) + "–" + Math.min(start + pageSize, matches.length) + " z " + matches.length : "Zobrazeno: 0") +
        (dateChanged ? ". Datum vydání bylo změněno na " + (controls.edition.value ? dateLabel(controls.edition.value) : "žádné vydání") : "");
      renderPagination(pages);
      saveURL();
    }
    function restoreURL() {
      var url = new URL(window.location.href);
      var target = null;
      try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch (error) { /* Ignore malformed fragments. */ }
      var linked = target && root.contains(target) && target.hasAttribute("data-edition") ? target : null;
      setCategory(url.searchParams.get("category") || (linked && linked.getAttribute("data-category")) || "muzi");
      var changed = syncDates(url.searchParams.get("edition") || (linked && linked.getAttribute("data-edition")) || "");
      controls.search.value = url.searchParams.get("search") || "";
      var requested = Number(url.searchParams.get("page"));
      page = Number.isSafeInteger(requested) && requested > 0 ? requested : 1;
      requestRender(changed);
    }
    form.addEventListener("change", function (event) {
      var preferred = controls.edition.value;
      var name = event.target.name;
      if (name === "audience") {
        var memory = remembered[controls.audience.value];
        chooseCategory(controls.audience.value, memory.division, memory.age);
      } else if (name === "division" || name === "age") {
        chooseCategory(controls.audience.value, controls.division.value, controls.age.value);
      }
      var changed = name === "edition" ? false : syncDates(preferred, name === "year" ? controls.year.value : "");
      page = 1;
      requestRender(changed);
    });
    form.addEventListener("input", function (event) {
      if (event.target !== controls.search) { return; }
      page = 1;
      requestRender(false);
    });
    form.addEventListener("submit", function (event) { event.preventDefault(); });
    form.addEventListener("reset", function (event) {
      event.preventDefault();
      controls.search.value = "";
      syncDates("");
      page = 1;
      requestRender(false);
    });
    root.querySelectorAll("[data-filter-reset]").forEach(function (button) {
      button.addEventListener("click", function () { form.reset(); controls.search.focus(); });
    });
    pagination.addEventListener("click", function (event) {
      var button = event.target.closest("button[data-ranking-page]");
      if (!button || button.disabled || !pagination.contains(button) || content.getAttribute("aria-busy") === "true") { return; }
      page = Number(button.dataset.rankingPage);
      requestRender(false, button);
    });
    window.addEventListener("popstate", restoreURL);
    window.addEventListener("hashchange", function () {
      var target = null;
      try { target = document.getElementById(decodeURIComponent(window.location.hash.slice(1))); } catch (error) { return; }
      if (!target || !root.contains(target) || !target.hasAttribute("data-category")) { return; }
      var record = activeRecord();
      if (record && window.location.hash === "#" + record.element.id) { return; }
      // A newly followed legacy fragment takes precedence over the previous selection.
      var url = new URL(window.location.href);
      ["category", "edition", "page"].forEach(function (key) { url.searchParams.delete(key); });
      window.history.replaceState(window.history.state, "", url);
      restoreURL();
    });
    window.addEventListener("pageshow", function (event) { if (event.persisted) { restoreURL(); } });
    restoreURL();
    form.hidden = false;
  });

  document.querySelectorAll("[data-download-search]").forEach(function (root) {
    var form = root.querySelector("[data-download-search-form]");
    var input = form.elements.q;
    var section = root.querySelector("[data-download-section]");
    var results = root.querySelector("[data-download-search-results]");
    var count = root.querySelector("[data-download-search-count]");
    var empty = root.querySelector("[data-download-search-empty]");
    var ready = false;
    function update() {
      var query = normalized(input.value.trim());
      if (query && !ready) {
        results.append(root.querySelector("[data-download-search-template]").content.cloneNode(true));
        ready = true;
      }
      var found = 0;
      results.querySelectorAll("[data-download-search-item]").forEach(function (item) {
        item.hidden = !normalized(item.textContent).includes(query);
        if (!item.hidden) { found += 1; }
      });
      results.querySelectorAll("[data-download-search-group]").forEach(function (group) {
        group.hidden = !Array.from(group.querySelectorAll("[data-download-search-item]")).some(function (item) { return !item.hidden; });
      });
      section.hidden = !!query;
      results.hidden = !query;
      empty.hidden = !query || found > 0;
      count.textContent = query ? "Nalezeno: " + found : "";
      var url = new URL(window.location.href);
      if (input.value.trim()) { url.searchParams.set("q", input.value.trim()); }
      else { url.searchParams.delete("q"); }
      window.history.replaceState(window.history.state, "", url);
      root.querySelectorAll(".section-nav a").forEach(function (link) {
        var target = new URL(link.href);
        if (input.value.trim()) { target.searchParams.set("q", input.value.trim()); }
        else { target.searchParams.delete("q"); }
        link.href = target.href;
      });
    }
    input.value = new URL(window.location.href).searchParams.get("q") || "";
    form.hidden = false;
    form.addEventListener("submit", function (event) { event.preventDefault(); update(); });
    input.addEventListener("input", update);
    update();
  });

  function renderListingPagination(pagination, pages, page) {
    if (!pagination) { return; }
    pagination.replaceChildren();
    pagination.hidden = pages < 2;
    if (pages < 2) { return; }
    function button(number, label, disabled, direction) {
      var control = document.createElement("button");
      control.type = "button";
      control.className = "button button--secondary";
      control.dataset.page = String(number);
      control.disabled = disabled;
      control.setAttribute("aria-label", direction ? label + " strana" : "Strana " + number);
      if (direction) {
        var arrow = document.createElement("span");
        arrow.setAttribute("aria-hidden", "true");
        arrow.className = "ui-icon ui-icon--arrow-" + (direction === "previous" ? "left" : "right");
        control.append(arrow);
      } else {
        control.textContent = label;
        if (number === page) { control.setAttribute("aria-current", "page"); }
      }
      pagination.append(control);
    }
    button(page - 1, "Předchozí", page === 1, "previous");
    function ellipsis() {
      var gap = document.createElement("span");
      gap.className = "pagination__ellipsis";
      gap.setAttribute("aria-hidden", "true");
      gap.textContent = "…";
      pagination.append(gap);
    }
    if (pages <= 7) {
      for (var number = 1; number <= pages; number += 1) { button(number, String(number), false); }
    } else {
      var first = Math.max(2, Math.min(page - 1, pages - 3));
      var last = Math.min(pages - 1, first + 2);
      button(1, "1", false);
      if (first > 2) { ellipsis(); }
      for (var nearby = first; nearby <= last; nearby += 1) { button(nearby, String(nearby), false); }
      if (last < pages - 1) { ellipsis(); }
      button(pages, String(pages), false);
    }
    button(page + 1, "Další", page === pages, "next");
  }

  document.querySelectorAll("[data-filter-list]").forEach(function (list) {
    if (list.hasAttribute("data-rankings")) { return; }
    var form = list.querySelector("[data-list-filters]");
    var items = Array.from(list.querySelectorAll("[data-filter-item]"));
    var count = list.querySelector("[data-result-count]");
    var empty = list.querySelector("[data-filter-empty]");
    var emptyEditions = Array.from(list.querySelectorAll("[data-filter-empty-edition]"));
    var error = list.querySelector("[data-filter-error]");
    if (!form || !items.length || !count || !empty) { return; }
    var editionControl = list.hasAttribute("data-linked-editions") ? form.elements.edition : null;
    var editionOptions = editionControl ? Array.from(editionControl.options) : [];
    var editionGroups = editionControl ? Array.from(list.querySelectorAll("[data-filter-group][data-edition]")) : [];
    var noEditionOption = null;
    function syncEditions(category) {
      if (!editionControl) { return; }
      var available = new Set(editionGroups.filter(function (group) {
        return !category || (group.getAttribute("data-category") || "").split(" ").includes(category);
      }).map(function (group) { return group.getAttribute("data-edition"); }));
      editionOptions.forEach(function (option) {
        option.disabled = !available.has(option.value);
        option.hidden = option.disabled;
      });
      editionControl.disabled = available.size === 0;
      if (!available.size) {
        if (!noEditionOption) {
          noEditionOption = document.createElement("option");
          noEditionOption.value = "";
          noEditionOption.textContent = "Žádné vydání";
          editionControl.append(noEditionOption);
        }
        noEditionOption.hidden = false;
        noEditionOption.disabled = false;
        editionControl.value = "";
      } else {
        if (noEditionOption) { noEditionOption.hidden = true; noEditionOption.disabled = true; }
        if (!available.has(editionControl.value)) {
          editionControl.value = editionOptions.find(function (option) { return !option.disabled; }).value;
        }
      }
    }
    var pagination = list.querySelector("[data-pagination]");
    var pageSize = pagination ? Number(list.getAttribute("data-page-size")) : 0;
    if (!Number.isInteger(pageSize) || pageSize < 1) { pageSize = 0; }
    var page = 1;
    setupClubFinder(list, form, items);
    var clubMap = list.hasAttribute("data-catalog-map-lazy") ? null : setupClubMap(list, items);
    if (list.hasAttribute("data-catalog-map-lazy")) {
      setupCatalogClubMap(list, function () {
        clubMap = setupClubMap(list, items);
        if (!clubMap) { throw new Error("Mapa není nakonfigurovaná pro tento náhled."); }
        clubMap.update();
      });
    }

    function value(name) { return form.elements[name] ? form.elements[name].value : ""; }
    function update(resetPage) {
      if (resetPage !== false) { page = 1; }
      var from = value("from");
      var to = value("to");
      var invalid = !!(from && to && from > to);
      if (error) {
        error.hidden = !invalid;
        form.elements.from.setAttribute("aria-invalid", String(invalid));
        form.elements.to.setAttribute("aria-invalid", String(invalid));
        form.elements.to.setCustomValidity(invalid ? "Datum do musí být stejné nebo pozdější než datum od." : "");
      }
      if (invalid) { return; }
      var search = normalized(value("search"));
      var category = value("category");
      var periodControl = form.elements.period;
      if (periodControl) {
        var periods = new Set(items.filter(function (item) {
          return !category || (item.getAttribute("data-category") || "").split(" ").includes(category);
        }).map(function (item) { return item.getAttribute("data-period"); }).filter(Boolean));
        Array.from(periodControl.options).forEach(function (option) {
          option.disabled = !!option.value && !periods.has(option.value);
          option.hidden = option.disabled;
        });
        if (periodControl.selectedOptions[0] && periodControl.selectedOptions[0].disabled) { periodControl.value = ""; }
        periodControl.disabled = periods.size === 0;
      }
      var period = value("period");
      var year = value("year");
      var group = value("group");
      syncEditions(category);
      var edition = value("edition");
      var matching = [];
      var editionTotal = 0;
      function inScope(item, undatedEdition) {
        var start = item.getAttribute("data-date") || "";
        var end = item.getAttribute("data-end-date") || start;
        return (!category || (item.getAttribute("data-category") || "").split(" ").includes(category)) &&
          (!period || item.getAttribute("data-period") === period) &&
          (!year || item.getAttribute("data-year") === year) &&
          (!group || item.getAttribute("data-group") === group) &&
          (!edition || item.getAttribute("data-edition") === edition ||
            (undatedEdition && item.getAttribute("data-edition") === "")) &&
          (!from || end >= from) && (!to || start <= to);
      }
      items.forEach(function (item) {
        if (!inScope(item)) { return; }
        editionTotal += 1;
        if (!search || normalized(item.textContent).includes(search)) { matching.push(item); }
      });
      var pages = pageSize ? Math.ceil(matching.length / pageSize) : 1;
      page = Math.min(page, Math.max(1, pages));
      var start = pageSize ? (page - 1) * pageSize : 0;
      var visible = matching.slice(start, pageSize ? start + pageSize : matching.length);
      var visibleItems = new Set(visible);
      items.forEach(function (item) { item.hidden = !visibleItems.has(item); });
      if (clubMap) { clubMap.update(); }
      list.querySelectorAll("[data-filter-group]").forEach(function (group) {
        group.hidden = !Array.from(group.querySelectorAll("[data-filter-item]")).some(function (item) { return !item.hidden; });
      });
      var total = form.elements.edition ? editionTotal : items.length;
      count.textContent = pageSize && matching.length ?
        "Zobrazeno: " + (start + 1) + "–" + (start + visible.length) + " z " + matching.length +
          (matching.length !== total ? " (celkem " + total + ")" : "") :
        "Zobrazeno: " + matching.length + " z " + total;
      if (editionControl && edition) {
        count.textContent += " · vydání " + editionControl.selectedOptions[0].textContent;
      }
      emptyEditions.forEach(function (notice) {
        notice.hidden = !inScope(notice, true) || (!!search && !category);
      });
      empty.hidden = matching.length !== 0 || emptyEditions.some(function (notice) { return !notice.hidden; });
      renderListingPagination(pagination, pages, page);
    }
    if (pagination && pageSize) {
      pagination.addEventListener("click", function (event) {
        var control = event.target.closest("button[data-page]");
        if (!control || !pagination.contains(control) || control.disabled) { return; }
        var requested = Number(control.dataset.page);
        if (requested === page) { return; }
        page = requested;
        update(false);
        var current = pagination.querySelector('button[aria-current="page"]');
        if (current) { current.focus({ preventScroll: true }); }
        var heading = list.querySelector(".page-heading");
        if (heading) { heading.scrollIntoView({ block: "start" }); }
      });
    }
    form.hidden = false;
    form.addEventListener("submit", function (event) { event.preventDefault(); update(); });
    form.addEventListener("input", update);
    form.addEventListener("change", update);
    form.addEventListener("reset", function () { window.setTimeout(update, 0); });
    list.querySelectorAll("[data-filter-reset]").forEach(function (button) {
      button.addEventListener("click", function () { form.reset(); form.elements.search.focus(); });
    });
    function fromEditionHash() {
      if (!editionControl || !window.location.hash) { return false; }
      var id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); }
      catch (error) { return false; }
      var target = document.getElementById(id);
      var group = target && target.closest("[data-filter-group][data-edition], [data-filter-empty-edition]");
      if (!group || !list.contains(group)) { return false; }
      if (form.elements.category) { form.elements.category.value = group.getAttribute("data-category") || ""; }
      editionControl.value = group.getAttribute("data-edition") || "";
      update();
      window.requestAnimationFrame(function () { target.scrollIntoView({ block: "start" }); });
      return true;
    }
    if (editionControl) { window.addEventListener("hashchange", fromEditionHash); }
    if (!fromEditionHash()) { update(); }
  });

  document.querySelectorAll("[data-tabs]").forEach(function (root) {
    var controls = Array.from(root.querySelectorAll("[data-tabs-controls]")).find(function (item) { return item.closest("[data-tabs]") === root; });
    var buttons = Array.from(root.querySelectorAll("[data-tab-target]")).filter(function (item) { return item.closest("[data-tabs]") === root; });
    var panels = Array.from(root.querySelectorAll("[data-tab-panel]")).filter(function (item) { return item.closest("[data-tabs]") === root; });
    var queryKey = root.getAttribute("data-tabs-query-key");
    if (!controls || !buttons.length || buttons.length !== panels.length) { return; }
    function activate(id, moveFocus, updateHash) {
      buttons.forEach(function (button) {
        var selected = button.getAttribute("data-tab-target") === id;
        button.setAttribute("aria-selected", String(selected));
        button.tabIndex = selected ? 0 : -1;
        if (selected && moveFocus) { button.focus(); }
      });
      panels.forEach(function (panel) { panel.hidden = panel.id !== id; });
      if (updateHash) {
        if (queryKey) {
          var url = new URL(window.location.href);
          var current = buttons.find(function (button) { return button.getAttribute("data-tab-target") === id; });
          url.searchParams.set(queryKey, current.getAttribute("data-tab-value"));
          window.history.replaceState(window.history.state, "", url);
        } else { window.history.replaceState(window.history.state, "", "#" + id); }
      }
      root.dispatchEvent(new CustomEvent("tabs:change", { bubbles: true, detail: { panel: id } }));
    }
    buttons.forEach(function (button, index) {
      var panel = panels.find(function (item) { return item.id === button.getAttribute("data-tab-target"); });
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", button.id);
      panel.tabIndex = 0;
      button.addEventListener("click", function () { activate(panel.id, false, true); });
      button.addEventListener("keydown", function (event) {
        var next = index;
        if (event.key === "ArrowRight") { next = (index + 1) % buttons.length; }
        else if (event.key === "ArrowLeft") { next = (index + buttons.length - 1) % buttons.length; }
        else if (event.key === "Home") { next = 0; }
        else if (event.key === "End") { next = buttons.length - 1; }
        else { return; }
        event.preventDefault();
        activate(buttons[next].getAttribute("data-tab-target"), true, true);
      });
    });
    function fromHash() {
      var id = window.location.hash.slice(1);
      var target = document.getElementById(id);
      var panel = panels.find(function (item) { return item.id === id || (target && item.contains(target)); });
      if (panel) { activate(panel.id, false); }
    }
    controls.hidden = false;
    var defaultPanel = root.getAttribute("data-default-panel");
    function fromQuery() {
      if (!queryKey) { return false; }
      var value = new URL(window.location.href).searchParams.get(queryKey);
      var button = buttons.find(function (item) { return item.getAttribute("data-tab-value") === value; });
      if (!button) { return false; }
      activate(button.getAttribute("data-tab-target"), false);
      return true;
    }
    activate(panels.some(function (panel) { return panel.id === defaultPanel; }) ? defaultPanel : panels[0].id, false);
    if (!fromQuery()) { fromHash(); }
    if (root.hasAttribute("data-tabs-sync-hash") && panels.some(function (panel) { var target = document.getElementById(window.location.hash.slice(1)); return "#" + panel.id === window.location.hash || (target && panel.contains(target)); })) {
      window.requestAnimationFrame(function () { window.scrollTo({ top: 0, behavior: "instant" }); });
    }
    window.addEventListener("hashchange", fromHash);
    if (queryKey) { window.addEventListener("popstate", function () { if (!fromQuery()) { activate(panels[0].id, false); } }); }
  });

  document.querySelectorAll("[data-tournament]").forEach(function (root) {
    var refined = root.hasAttribute("data-tournament-refined");
    var category = root.querySelector("[data-tournament-category]");
    var legacyOptions = root.querySelector("[data-tournament-legacy-options]");
    var categoryControls = root.querySelector("[data-tournament-controls]");
    var sections = Array.from(root.querySelectorAll("[data-tournament-category-panel]"));
    var controls = root.querySelector("[data-tournament-match-controls]");
    var search = root.querySelector("[data-tournament-search]");
    var phase = root.querySelector("[data-tournament-phase]");
    var scope = root.querySelector("[data-tournament-scope]");
    var params = new URL(window.location.href).searchParams;
    function normalize(value) { return value.toLocaleLowerCase("cs").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim(); }
    function categoryFromHash() {
      var match = window.location.hash.match(/^#(?:los-|vysledky-|zapasy-|skupiny-)?kategorie-(.+)$/);
      return match ? decodeURIComponent(match[1]) : "";
    }
    function validCategory(value) {
      if (!category || !value) { return false; }
      if (Array.from(category.options).some(function (option) { return option.value === value; })) { return true; }
      var legacy = legacyOptions && Array.from(legacyOptions.content.querySelectorAll("option")).find(function (option) { return option.value === value; });
      if (!legacy) { return false; }
      var option = legacy.cloneNode(true);
      option.hidden = true;
      option.setAttribute("data-tournament-legacy-option", "");
      category.appendChild(option);
      return true;
    }
    function activePanel() { return root.querySelector('[data-tab-panel]:not([hidden])'); }
    if (category) {
      var initial = categoryFromHash() || params.get("kategorie");
      if (validCategory(initial)) { category.value = initial; }
    }
    if (search) { search.value = params.get("hrac") || ""; }
    if (scope && params.get("rozsah") === "vse") { scope.value = "all"; }
    if (phase && Array.from(phase.options).some(function (option) { return option.value === params.get("faze"); })) { phase.value = params.get("faze"); }
    function update(write) {
      var selected = category ? category.value : (sections[0] && sections[0].getAttribute("data-tournament-category-panel"));
      var all = scope && scope.value === "all";
      var panel = activePanel();
      sections.forEach(function (section) {
        section.hidden = !!category && section.getAttribute("data-tournament-category-panel") !== selected;
      });
      if (phase) {
        Array.from(phase.options).forEach(function (option) { option.hidden = !!option.value && !!category && option.dataset.category !== selected; });
        if (all || (phase.selectedOptions[0] && phase.selectedOptions[0].hidden)) { phase.value = ""; }
        if (refined) { phase.closest(".field").hidden = !!all; }
      }
      var needle = normalize(search ? search.value : "");
      var total = 0;
      var selectedHasMatches = false;
      root.querySelectorAll('[data-tournament-view="matches"]').forEach(function (section) {
        var count = 0;
        var rows = section.querySelectorAll("[data-tournament-item]");
        var isSelected = section.getAttribute("data-tournament-category-panel") === selected;
        if (isSelected && rows.length) { selectedHasMatches = true; }
        rows.forEach(function (row) {
          var visible = (!needle || normalize(row.dataset.search || "").includes(needle)) && (!phase || !phase.value || row.dataset.phase === phase.value);
          row.hidden = !visible;
          if (visible) { count++; }
        });
        var empty = section.querySelector("[data-tournament-empty]");
        if (empty) { empty.hidden = count > 0 || !!all; }
        var table = section.querySelector(".table-scroll");
        if (table) { table.hidden = count === 0; }
        if (all) { section.hidden = count === 0; }
        if (all || isSelected) { total += count; }
      });
      if (categoryControls) { categoryControls.hidden = refined && ((panel && panel.id === "propozice") || (all && panel && panel.id === "zapasy")); }
      if (controls) {
        controls.hidden = false;
        if (refined) {
          var unavailable = !all && !selectedHasMatches;
          if (search) { search.closest(".field").hidden = unavailable; }
          if (phase) { phase.closest(".field").hidden = unavailable || !!all; }
          var reset = controls.querySelector("[data-tournament-reset]");
          if (reset) { reset.hidden = unavailable; }
        }
      }
      var allEmpty = root.querySelector("[data-tournament-all-empty]");
      if (allEmpty) { allEmpty.hidden = !all || total > 0; }
      if (write) {
        var url = new URL(window.location.href);
        function setParam(key, value) {
          if (value) { url.searchParams.set(key, value); } else { url.searchParams.delete(key); }
        }
        if (category) { setParam("kategorie", selected); }
        setParam("hrac", search && search.value.trim());
        setParam("faze", phase && phase.value);
        setParam("rozsah", all ? "vse" : "");
        // A legacy category fragment must not overrule a new selection on reload.
        if (categoryFromHash() && panel) { url.hash = panel.id; }
        window.history.replaceState(window.history.state, "", url);
      }
    }
    if (controls) { controls.addEventListener("submit", function (event) { event.preventDefault(); }); }
    if (categoryControls) { categoryControls.addEventListener("submit", function (event) { event.preventDefault(); }); }
    if (category) { category.addEventListener("change", function () {
      category.querySelectorAll("[data-tournament-legacy-option]").forEach(function (option) { if (!option.selected) { option.remove(); } });
      update(true);
    }); }
    if (search) { search.addEventListener("input", function () { update(true); }); }
    if (phase) { phase.addEventListener("change", function () { update(true); }); }
    if (scope) { scope.addEventListener("change", function () { update(true); }); }
    if (controls) { controls.addEventListener("reset", function () { window.setTimeout(function () { update(true); }, 0); }); }
    root.addEventListener("tabs:change", function () { update(false); });
    window.addEventListener("hashchange", function () {
      var value = categoryFromHash();
      if (validCategory(value)) { category.value = value; update(true); }
      else { update(false); }
    });
    update(false);
    if (refined) {
      var scrolls = Array.from(root.querySelectorAll(".tournament-table-frame .table-scroll"));
      function updateScrollCues() {
        scrolls.forEach(function (scroll) {
          scroll.parentElement.classList.toggle("tournament-table-frame--more", scroll.scrollWidth > scroll.clientWidth + scroll.scrollLeft + 2);
        });
      }
      scrolls.forEach(function (scroll) { scroll.addEventListener("scroll", updateScrollCues, { passive: true }); });
      if (window.ResizeObserver) {
        var observer = new ResizeObserver(updateScrollCues);
        scrolls.forEach(function (scroll) { observer.observe(scroll); });
      }
      root.addEventListener("tabs:change", updateScrollCues);
      if (category) { category.addEventListener("change", updateScrollCues); }
      if (scope) { scope.addEventListener("change", updateScrollCues); }
      window.addEventListener("resize", updateScrollCues);
      updateScrollCues();
    }
  });

  document.querySelectorAll("[data-roster-list]").forEach(function (list) {
    var control = list.querySelector("[data-roster-control]");
    var select = list.querySelector("[data-roster-select]");
    var panels = Array.from(list.querySelectorAll("[data-roster-panel]"));
    if (!control || !select || !panels.length) { return; }
    function update() {
      panels.forEach(function (panel) { panel.hidden = panel.getAttribute("data-roster-panel") !== select.value; });
    }
    control.hidden = false;
    select.addEventListener("change", update);
    update();
  });

  // Ranking views share the complete canonical HTML table, including rows hidden by pagination.
  function rankingNumber(value) {
    return value === null || value.trim() === "" || !Number.isFinite(Number(value)) ? null : Number(value);
  }

  function rankingMonthTime(month) {
    return Date.UTC(Number(month.slice(0, 4)), Number(month.slice(5, 7)) - 1, 1);
  }

  function rankingMonthKey(time) {
    return new Date(time).toISOString().slice(0, 7);
  }

  function rankingMonths(start, end, byMonth) {
    var months = [];
    var date = new Date(rankingMonthTime(start));
    while (date.getTime() <= rankingMonthTime(end)) {
      var key = rankingMonthKey(date.getTime());
      months.push({ month: key, time: date.getTime(), record: byMonth.get(key) || null });
      date.setUTCMonth(date.getUTCMonth() + 1);
    }
    return months;
  }

  function rankingPeriod(records, value) {
    var latest = records[records.length - 1];
    var start = new Date(rankingMonthTime(latest.month));
    if (value === "all") { return records[0].month; }
    start.setUTCMonth(start.getUTCMonth() - (value === "36" ? 35 : 11));
    return rankingMonthKey(start.getTime());
  }

  var rankingNumbers = new Intl.NumberFormat("cs-CZ");
  var rankingMonthNames = new Intl.DateTimeFormat("cs-CZ", { month: "long", year: "numeric", timeZone: "UTC" });
  var rankingShortMonths = new Intl.DateTimeFormat("cs-CZ", { month: "short", timeZone: "UTC" });

  function rankingMonthLabel(month) {
    var label = rankingMonthNames.format(rankingMonthTime(month));
    return label.charAt(0).toLocaleUpperCase("cs") + label.slice(1);
  }

  function rankingMovement(value) {
    if (value === null) { return "Údaj není k dispozici"; }
    if (value === 0) { return "Beze změny"; }
    var count = Math.abs(value);
    return (value > 0 ? "Zlepšení o " : "Pokles o ") + rankingNumbers.format(count) + (count === 1 ? " místo" : count < 5 ? " místa" : " míst");
  }

  function rankingDetail(detail, record, month) {
    if (!detail) { return; }
    var values = {
      date: rankingMonthLabel(month),
      rank: record && record.rank !== null ? rankingNumbers.format(record.rank) + "." : "—",
      "rank-change": rankingMovement(record ? record.rankChange : null),
      points: record && record.points !== null ? rankingNumbers.format(record.points) : "—",
      "points-change": record && record.pointsChange !== null ? (record.pointsChange > 0 ? "+" : "") + rankingNumbers.format(record.pointsChange) : "Údaj není k dispozici",
      league: record && record.league !== null ? rankingNumbers.format(record.league) : "—",
      tournaments: record && record.tournaments !== null ? rankingNumbers.format(record.tournaments) : "—"
    };
    Object.keys(values).forEach(function (key) {
      var node = detail.querySelector("[data-detail-" + key + "]");
      if (!node) { return; }
      node.textContent = values[key];
      if (key === "rank-change" || key === "points-change") {
        var change = record ? (key === "rank-change" ? record.rankChange : record.pointsChange) : null;
        var direction = change > 0 ? "up" : change < 0 ? "down" : null;
        node.classList.toggle("ranking-change--up", direction === "up");
        node.classList.toggle("ranking-change--down", direction === "down");
        if (direction) {
          var icon = document.createElement("span");
          icon.className = "ui-icon ranking-change__icon ranking-change__icon--" + direction;
          icon.setAttribute("aria-hidden", "true");
          node.appendChild(icon);
        }
      }
    });
  }

  function rankingAnnouncement(record, month) {
    function value(key) { return record && record[key] !== null ? rankingNumbers.format(record[key]) : "není k dispozici"; }
    var pointsChange = record && record.pointsChange !== null ? (record.pointsChange > 0 ? "+" : "") + rankingNumbers.format(record.pointsChange) : "není k dispozici";
    return rankingMonthLabel(month) + ": pořadí " + value("rank") + ", pohyb na žebříčku: " + rankingMovement(record ? record.rankChange : null) + ", body " + value("points") + ", změna bodů " + pointsChange + ".";
  }

  var rankingTooltipIndex = 0;
  var activeRankingTooltip = null;

  // A body portal keeps tooltips outside the history's container and table clipping.
  function rankingTooltip(detail) {
    var trigger = null;
    var leaveTimer = null;
    var anchor = null;
    var id;
    do { id = "ranking-tooltip-" + (++rankingTooltipIndex); } while (document.getElementById(id));
    detail.id = id;
    detail.hidden = true;
    detail.setAttribute("role", "tooltip");
    document.body.appendChild(detail);

    function cancelHide() {
      if (leaveTimer !== null) { window.clearTimeout(leaveTimer); leaveTimer = null; }
    }

    function describe(element, add) {
      if (!element) { return; }
      var ids = (element.getAttribute("aria-describedby") || "").split(/\s+/).filter(function (value) { return value && value !== id; });
      if (add) { ids.push(id); }
      if (ids.length) { element.setAttribute("aria-describedby", ids.join(" ")); }
      else { element.removeAttribute("aria-describedby"); }
    }

    function hide() {
      cancelHide();
      detail.hidden = true;
      describe(trigger, false);
      trigger = null;
      anchor = null;
      if (activeRankingTooltip === controller) { activeRankingTooltip = null; }
    }

    function position() {
      if (detail.hidden || !anchor) { return; }
      var rect = anchor();
      if (!rect || !Number.isFinite(rect.left) || !Number.isFinite(rect.top)) { hide(); return; }
      var width = document.documentElement.clientWidth;
      var height = window.innerHeight;
      var header = document.querySelector(".site-header");
      var headerRect = header && header.getBoundingClientRect();
      var minimumTop = headerRect && headerRect.top <= 0 && headerRect.bottom > 0 ? headerRect.bottom + 8 : 8;
      var box = detail.getBoundingClientRect();
      var left = Math.max(8, Math.min(rect.left + rect.width / 2 - box.width / 2, width - box.width - 8));
      var top = rect.top - box.height - 10;
      if (top < minimumTop) { top = rect.bottom + 10; }
      top = Math.max(minimumTop, Math.min(top, height - box.height - 8));
      detail.style.left = left + "px";
      detail.style.top = top + "px";
    }

    function show(record, month, getAnchor, element) {
      cancelHide();
      if (activeRankingTooltip && activeRankingTooltip !== controller) { activeRankingTooltip.hide(); }
      if (trigger !== element) { describe(trigger, false); }
      trigger = element || null;
      anchor = getAnchor;
      rankingDetail(detail, record, month);
      describe(trigger, true);
      detail.hidden = false;
      activeRankingTooltip = controller;
      position();
    }

    function scheduleHide() {
      cancelHide();
      leaveTimer = window.setTimeout(hide, 120);
    }

    var controller = { show: show, hide: hide, scheduleHide: scheduleHide, cancelHide: cancelHide };
    detail.addEventListener("pointerenter", cancelHide);
    detail.addEventListener("pointerleave", scheduleHide);
    document.addEventListener("keydown", function (event) { if (event.key === "Escape") { hide(); } });
    document.addEventListener("pointerdown", function (event) {
      if (!detail.hidden && !detail.contains(event.target) && (!trigger || !trigger.contains(event.target))) { hide(); }
    });
    document.addEventListener("scroll", function (event) {
      if (!detail.contains(event.target)) { hide(); }
    }, true);
    window.addEventListener("resize", hide);
    return controller;
  }

  function rankingCategory(record) {
    if (!record || record.rank === null) { return "missing"; }
    if (record.rank <= 10) { return "top10"; }
    if (record.rank <= 50) { return "top50"; }
    if (record.rank <= 100) { return "top100"; }
    return "other";
  }

  function initializeRankingHistory(root, records, byMonth) {
    var history = root.querySelector("[data-ranking-history]");
    if (!history) { return; }
    var controls = history.querySelector("[data-history-controls]");
    var year = history.querySelector("[data-history-year]");
    var mobile = history.querySelector("[data-history-mobile]");
    var desktop = history.querySelector("[data-history-desktop]");
    var table = history.querySelector("[data-history-table]");
    var detail = history.querySelector("[data-history-detail]");
    var status = history.querySelector("[data-history-status]");
    if (!controls || !year || !mobile || !detail) { return; }
    var tooltip = rankingTooltip(detail);
    var selectedMonth = records[records.length - 1].month;
    var desktopButtons = desktop ? Array.from(desktop.querySelectorAll("[data-history-month]")) : [];
    var focusedHistoryButton = null;
    year.value = selectedMonth.slice(0, 4);

    function desktopButtonFor(month) {
      return desktopButtons.find(function (button) {
        return button.getAttribute("data-history-month") === month;
      }) || desktopButtons.reduce(function (nearest, button) {
        var distance = Math.abs(rankingMonthTime(button.getAttribute("data-history-month")) - rankingMonthTime(month));
        var previous = nearest ? Math.abs(rankingMonthTime(nearest.getAttribute("data-history-month")) - rankingMonthTime(month)) : Infinity;
        return distance < previous ? button : nearest;
      }, null);
    }

    function setDesktopTabStop(button) {
      desktopButtons.forEach(function (item) { item.tabIndex = item === button ? 0 : -1; });
    }

    function selectMonth(month, announce) {
      selectedMonth = month;
      history.querySelectorAll("[data-history-month]").forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.getAttribute("data-history-month") === month));
      });
      // Hover must not move the keyboard's entry point away from its focused cell.
      var focused = desktopButtons.indexOf(document.activeElement) >= 0 ? document.activeElement : null;
      setDesktopTabStop(focused || desktopButtonFor(month));
      if (announce && status) { status.textContent = rankingAnnouncement(byMonth.get(month), month); }
    }

    function renderYear(announce) {
      tooltip.hide();
      var fragment = document.createDocumentFragment();
      var annualBest = records.filter(function (record) { return record.month.slice(0, 4) === year.value && record.rank !== null; }).sort(function (a, b) { return a.rank - b.rank || (b.points === null ? -1 : b.points) - (a.points === null ? -1 : a.points) || b.month.localeCompare(a.month); })[0];
      for (var month = 1; month <= 12; month += 1) {
        var key = year.value + "-" + String(month).padStart(2, "0");
        var record = byMonth.get(key);
        var button = document.createElement("button");
        button.type = "button";
        button.className = "ranking-cell ranking-cell__button ranking-cell--" + rankingCategory(record);
        button.setAttribute("data-history-month", key);
        button.setAttribute("aria-label", rankingAnnouncement(record, key));
        var name = document.createElement("span");
        name.className = "ranking-cell__month";
        name.textContent = rankingShortMonths.format(rankingMonthTime(key));
        var rank = document.createElement("span");
        rank.className = "ranking-cell__rank tabular-nums";
        rank.textContent = record && record.rank !== null ? rankingNumbers.format(record.rank) + "." : "—";
        if (annualBest && annualBest.month === key) {
          rank.classList.add("ranking-cell__rank--best");
          button.setAttribute("aria-label", button.getAttribute("aria-label") + ", nejlepší pořadí roku");
        }
        button.append(name, rank);
        fragment.appendChild(button);
      }
      mobile.replaceChildren(fragment);
      if (selectedMonth.slice(0, 4) !== year.value) {
        var available = records.filter(function (record) { return record.month.slice(0, 4) === year.value; });
        selectedMonth = available.length ? available[available.length - 1].month : year.value + "-12";
      }
      selectMonth(selectedMonth, announce);
    }

    function historyButton(event) {
      var button = event.target.closest("button[data-history-month]");
      return button && history.contains(button) && !button.disabled ? button : null;
    }

    function showMonth(button, announce) {
      var key = button.getAttribute("data-history-month");
      selectMonth(key, announce);
      tooltip.show(byMonth.get(key), key, function () { return button.getBoundingClientRect(); }, button);
    }

    history.querySelectorAll("[data-history-month]").forEach(function (button) { button.disabled = false; });
    history.addEventListener("click", function (event) {
      var button = historyButton(event);
      if (!button) { return; }
      var key = button.getAttribute("data-history-month");
      if (year.value !== key.slice(0, 4)) {
        year.value = key.slice(0, 4);
        renderYear(false);
      }
      showMonth(button, event.detail === 0);
    });
    history.addEventListener("pointerover", function (event) {
      var button = historyButton(event);
      if (button && !button.contains(event.relatedTarget)) { showMonth(button, false); }
    });
    history.addEventListener("pointerout", function (event) {
      var button = historyButton(event);
      if (button && !button.contains(event.relatedTarget)) { tooltip.scheduleHide(); }
    });
    history.addEventListener("focusin", function (event) {
      var button = historyButton(event);
      focusedHistoryButton = button;
      if (button) { showMonth(button, false); }
    });
    history.addEventListener("focusout", function (event) {
      var button = historyButton(event);
      // Browsers can blur a cell before ResizeObserver runs when its layout is hidden.
      if (button && (event.relatedTarget || button.getClientRects().length)) { focusedHistoryButton = null; }
      if (button && !button.contains(event.relatedTarget)) { tooltip.hide(); }
    });
    history.addEventListener("keydown", function (event) {
      var button = historyButton(event);
      if (!button || !table || !table.contains(button) || event.altKey || event.metaKey) { return; }
      var cell = button.closest("td");
      var row = cell.parentElement;
      var rowButtons = Array.from(row.querySelectorAll("[data-history-month]"));
      var target = null;
      if (event.key === "Home" || event.key === "End") {
        var candidates = event.ctrlKey ? desktopButtons : rowButtons;
        target = candidates[event.key === "Home" ? 0 : candidates.length - 1];
      } else if (!event.ctrlKey && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        var index = rowButtons.indexOf(button) + (event.key === "ArrowLeft" ? -1 : 1);
        target = rowButtons[index];
      } else if (!event.ctrlKey && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
        var rows = Array.from(table.tBodies[0].rows);
        var step = event.key === "ArrowUp" ? -1 : 1;
        for (var next = rows.indexOf(row) + step; next >= 0 && next < rows.length; next += step) {
          target = rows[next].cells[cell.cellIndex].querySelector("[data-history-month]");
          if (target) { break; }
        }
      } else { return; }
      event.preventDefault();
      if (target && target !== button) {
        setDesktopTabStop(target);
        target.focus();
        selectMonth(target.getAttribute("data-history-month"), true);
      }
    });
    year.addEventListener("change", function () { renderYear(true); });
    renderYear(false);
    controls.hidden = false;
    mobile.hidden = false;
    history.setAttribute("data-history-ready", "");
    if (desktop) {
      // The interactive matrix has one entry point; without JS the scroll region keeps its tabindex.
      desktop.tabIndex = -1;
      var desktopVisible = desktop.getClientRects().length > 0;
      function synchronizeHistoryLayout() {
        var visible = desktop.getClientRects().length > 0;
        if (visible === desktopVisible) { return; }
        desktopVisible = visible;
        var active = document.activeElement;
        var previousPanel = visible ? mobile : desktop;
        if (active === document.body && previousPanel.contains(focusedHistoryButton)) { active = focusedHistoryButton; }
        if (!previousPanel.contains(active)) { return; }
        var month = active.getAttribute("data-history-month") || selectedMonth;
        var target;
        if (visible) {
          target = desktopButtonFor(month);
          setDesktopTabStop(target);
        } else {
          year.value = month.slice(0, 4);
          renderYear(false);
          target = Array.from(mobile.querySelectorAll("[data-history-month]")).find(function (button) {
            return button.getAttribute("data-history-month") === month;
          });
        }
        if (target) { target.focus({ preventScroll: true }); }
      }
      window.addEventListener("resize", synchronizeHistoryLayout);
      if (window.ResizeObserver) { new ResizeObserver(synchronizeHistoryLayout).observe(history); }
    }
  }

  function initializeRankingChart(root, records, byMonth) {
    var region = root.querySelector("[data-ranking-chart]");
    if (!region || !window.echarts) { return; }
    var controls = region.querySelector("[data-ranking-controls]");
    var metric = region.querySelector("[data-ranking-metric]");
    var range = region.querySelector("[data-ranking-range]");
    var canvas = region.querySelector("[data-ranking-canvas]");
    var detail = region.querySelector("[data-ranking-detail]");
    var status = region.querySelector("[data-ranking-status]");
    if (!controls || !metric || !range || !canvas || !detail) { return; }
    var tooltip = rankingTooltip(detail);
    var updatingSelection = false;
    var latest = records[records.length - 1];
    var selectedMonth = latest.month;
    var timeline = [];
    var chart = null;
    var resizeFrame = null;
    var failed = false;
    var motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    metric.value = "rank";
    range.value = "12";

    function fail(error) {
      failed = true;
      tooltip.hide();
      controls.hidden = true;
      canvas.hidden = true;
      region.removeAttribute("data-ranking-ready");
      if (chart) { chart.dispose(); chart = null; }
      console.warn("Graf žebříčku není dostupný; úplná data zůstávají v tabulce.", error);
    }

    function selectedPoint() {
      var record = byMonth.get(selectedMonth);
      return record && record[metric.value] !== null ? [{ month: selectedMonth, value: [rankingMonthTime(selectedMonth), record[metric.value]] }] : [];
    }

    function pointRect(key) {
      var record = byMonth.get(key);
      if (!chart || !record || record[metric.value] === null) { return null; }
      var point = chart.convertToPixel({ xAxisIndex: 0, yAxisIndex: 0 }, [rankingMonthTime(key), record[metric.value]]);
      if (!point || !Number.isFinite(point[0]) || !Number.isFinite(point[1])) { return null; }
      var rect = canvas.getBoundingClientRect();
      var canvasStyle = getComputedStyle(canvas);
      var x = rect.left + canvas.clientLeft + parseFloat(canvasStyle.paddingLeft) + point[0];
      var y = rect.top + canvas.clientTop + parseFloat(canvasStyle.paddingTop) + point[1];
      return { left: x, top: y, bottom: y, width: 0 };
    }

    function selectMonth(key, announce, trigger) {
      if (!byMonth.has(key) || updatingSelection) { return; }
      var changed = selectedMonth !== key;
      selectedMonth = key;
      if (chart && changed) {
        updatingSelection = true;
        try { chart.setOption({ series: [{ id: "ranking-selected", data: selectedPoint() }, { id: "ranking-selected-dot", data: selectedPoint() }] }); }
        finally { updatingSelection = false; }
      }
      tooltip.show(byMonth.get(key), key, function () { return pointRect(key); }, trigger || canvas);
      if (announce && status) { status.textContent = rankingAnnouncement(byMonth.get(key), key); }
    }

    function render() {
      tooltip.hide();
      var start = rankingPeriod(records, range.value);
      timeline = rankingMonths(start, latest.month, byMonth);
      var visible = records.filter(function (record) { return record.month >= start && record.month <= latest.month; });
      if (!visible.some(function (record) { return record.month === selectedMonth; })) { selectedMonth = latest.month; }
      if (!chart) { return; }
      var style = getComputedStyle(region);
      function color(token) { return style.getPropertyValue(token).trim(); }
      function space(token) { return parseFloat(style.getPropertyValue(token)); }
      var blue = color("--color-blue-900");
      var ink = color("--color-stone-500");
      var fontSize = 12;
      var values = visible.filter(function (record) { return record[metric.value] !== null; });
      var last = values[values.length - 1];
      var best = metric.value === "rank" ? values.slice().sort(function (a, b) { return a.rank - b.rank || (b.points === null ? -1 : b.points) - (a.points === null ? -1 : a.points) || b.month.localeCompare(a.month); })[0] : null;
      var markers = [];
      [last, best].forEach(function (record, index) {
        if (!record || (index === 1 && record === last)) { return; }
        markers.push({ coord: [rankingMonthTime(record.month), record[metric.value]], value: record[metric.value], symbol: "circle", symbolSize: 12, label: { show: false } });
      });
      if (best) {
        markers.push({ coord: [rankingMonthTime(best.month), best[metric.value]], symbol: "image://" + new URL("../ui/champion-stroke-rounded-16.svg", document.querySelector('script[src*="assets/js/site.js"]').src).href, symbolSize: [16, 16], symbolOffset: [0, -18], label: { show: false } });
      }
      var maximum = Math.max.apply(null, values.map(function (record) { return record[metric.value]; }).concat([metric.value === "rank" ? 5 : 1]));
      var rankMax = Math.max(5, Math.ceil(maximum * 1.12 / 5) * 5);
      var firstTime = timeline[0].time;
      var lastTime = timeline[timeline.length - 1].time;
      chart.setOption({
        animation: !motion.matches,
        animationDuration: 250,
        animationDurationUpdate: 150,
        useUTC: true,
        textStyle: { fontFamily: style.fontFamily, fontSize: fontSize, color: ink },
        aria: { enabled: false },
        grid: { left: 0, right: space("--space-16"), top: space(best ? "--space-32" : "--space-16"), bottom: space("--space-4"), containLabel: true },
        tooltip: { trigger: "axis", showContent: false, axisPointer: { type: "line", snap: true, z: 1, lineStyle: { color: color("--color-stone-500"), type: "dashed" } } },
        xAxis: { type: "time", min: firstTime === lastTime ? firstTime - 86400000 * 15 : firstTime, max: firstTime === lastTime ? lastTime + 86400000 * 15 : lastTime, splitNumber: canvas.clientWidth < 600 ? 4 : 7, axisLine: { lineStyle: { color: color("--color-stone-200") } }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { hideOverlap: true, margin: 12, color: ink, fontSize: fontSize, formatter: function (value) { return new Intl.DateTimeFormat("cs-CZ", { month: "numeric", year: "2-digit", timeZone: "UTC" }).format(value); } } },
        yAxis: { type: "value", inverse: metric.value === "rank", min: metric.value === "rank" ? 1 : 0, max: metric.value === "rank" ? rankMax : null, minInterval: 1, splitNumber: 4, axisLabel: { color: ink, fontSize: fontSize, formatter: function (value) { return rankingNumbers.format(value) + (metric.value === "rank" ? "." : ""); } }, splitLine: { lineStyle: { color: color("--color-stone-200") } } },
        series: [
          { id: "ranking-line", type: "line", data: timeline.map(function (entry) { return { month: entry.month, value: [entry.time, entry.record ? entry.record[metric.value] : null] }; }), smooth: false, connectNulls: false, showSymbol: true, symbol: "circle", symbolSize: 8, lineStyle: { width: 2, color: blue }, itemStyle: { color: blue }, emphasis: { disabled: true }, markPoint: { silent: true, itemStyle: { color: blue }, data: markers } },
          { id: "ranking-selected", type: "scatter", data: selectedPoint(), symbol: "circle", symbolSize: 17, itemStyle: { color: color("--color-white"), borderColor: blue, borderWidth: 2, opacity: 1 }, z: 5, emphasis: { disabled: true }, tooltip: { show: false } },
          { id: "ranking-selected-dot", type: "scatter", data: selectedPoint(), symbol: "circle", symbolSize: 8, itemStyle: { color: blue, opacity: 1 }, z: 6, silent: true, emphasis: { disabled: true }, tooltip: { show: false } }
        ]
      }, { notMerge: true });
      if (firstTime !== lastTime) {
        var plotWidth = chart.convertToPixel({ xAxisIndex: 0 }, lastTime) - chart.convertToPixel({ xAxisIndex: 0 }, firstTime);
        var edgePadding = space("--space-16");
        if (plotWidth > edgePadding * 2) {
          var timePadding = (lastTime - firstTime) * edgePadding / (plotWidth - edgePadding * 2);
          chart.setOption({ xAxis: { min: firstTime - timePadding, max: lastTime + timePadding } });
        }
      }
      canvas.setAttribute("aria-label", (metric.value === "rank" ? "Pořadí ČASQ" : "Body ČASQ") + ", " + rankingMonthLabel(timeline[0].month) + " až " + rankingMonthLabel(latest.month) + ". Jednotlivé měsíce lze vybrat v historii pořadí. Úplná data jsou v tabulce Podrobná data.");
    }

    function resize() {
      if (resizeFrame !== null) { return; }
      resizeFrame = window.requestAnimationFrame(function () {
        resizeFrame = null;
        if (failed || !canvas.clientWidth) { return; }
        try {
          if (!chart) {
            chart = window.echarts.init(canvas, null, { renderer: "svg" });
            chart.on("mouseover", function (event) { if (event.data && event.data.month) { selectMonth(event.data.month, false); } });
            chart.on("click", function (event) { if (event.data && event.data.month) { selectMonth(event.data.month, false); } });
            chart.on("updateAxisPointer", function (event) {
              var axis = event.axesInfo && event.axesInfo[0];
              if (!axis || updatingSelection) { return; }
              var nearest = timeline.reduce(function (candidate, entry) { return !candidate || Math.abs(entry.time - axis.value) < Math.abs(candidate.time - axis.value) ? entry : candidate; }, null);
              if (nearest && nearest.record && nearest.record[metric.value] !== null) { selectMonth(nearest.month, false); }
            });
            chart.on("globalout", tooltip.scheduleHide);
          } else { chart.resize(); }
          render();
          controls.hidden = false;
          region.setAttribute("data-ranking-ready", "");
        } catch (error) { fail(error); }
      });
    }

    metric.addEventListener("change", function () { try { render(); if (status) { status.textContent = (metric.value === "rank" ? "Pořadí ČASQ. " : "Body ČASQ. ") + rankingAnnouncement(byMonth.get(selectedMonth), selectedMonth); } } catch (error) { fail(error); } });
    range.addEventListener("change", function () { try { render(); if (status) { status.textContent = range.options[range.selectedIndex].text + ". " + rankingAnnouncement(byMonth.get(selectedMonth), selectedMonth); } } catch (error) { fail(error); } });
    canvas.addEventListener("pointerleave", tooltip.scheduleHide);
    motion.addEventListener("change", function () { if (chart && !failed) { try { render(); } catch (error) { fail(error); } } });
    canvas.hidden = false;
    render();
    if (window.ResizeObserver) { new ResizeObserver(resize).observe(canvas); }
    window.addEventListener("resize", resize);
    if (document.fonts) { document.fonts.ready.then(resize); }
    resize();
  }

  document.querySelectorAll("[data-player-profile]").forEach(function (root) {
    var records = Array.from(root.querySelectorAll("[data-ranking-source] [data-ranking-record]")).map(function (row) {
      var date = row.getAttribute("data-date") || "";
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date))) { return null; }
      return { date: date, month: date.slice(0, 7), rank: rankingNumber(row.getAttribute("data-rank")), rankChange: rankingNumber(row.getAttribute("data-rank-change")), points: rankingNumber(row.getAttribute("data-points")), pointsChange: rankingNumber(row.getAttribute("data-points-change")), league: rankingNumber(row.getAttribute("data-league")), tournaments: rankingNumber(row.getAttribute("data-tournaments")) };
    }).filter(Boolean).sort(function (a, b) { return a.date.localeCompare(b.date); });
    if (!records.length) { return; }
    var byMonth = new Map();
    records.forEach(function (record) { byMonth.set(record.month, record); });
    initializeRankingHistory(root, records, byMonth);
    try { initializeRankingChart(root, records, byMonth); }
    catch (error) { console.warn("Graf žebříčku se nepodařilo připravit; úplná data zůstávají v tabulce.", error); }
  });

  document.querySelectorAll("[data-player-matches]").forEach(function (root) {
    var form = root.querySelector("[data-match-filters]");
    var search = root.querySelector("[data-match-search]");
    var year = root.querySelector("[data-match-year]");
    var list = root.querySelector("[data-match-events]");
    var count = root.querySelector("[data-match-count]");
    var empty = root.querySelector("[data-match-empty]");
    var pagination = root.querySelector("[data-match-pagination]");
    if (!form || !search || !year || !list || !count || !empty) { return; }
    var events = Array.from(list.querySelectorAll("[data-match-event]"));
    var pageSize = Number(root.getAttribute("data-page-size"));
    if (!Number.isInteger(pageSize) || pageSize < 1) { pageSize = 8; }
    var page = 1;
    var savedOpen = null;
    var taxonomy = form.querySelector(".match-filters__taxonomy");
    var taxonomyFields = ["audience", "grade", "category"].map(function (name) {
      var control = form.querySelector("[data-match-" + name + "]");
      var labels = new Map();
      if (control) { Array.from(control.options).forEach(function (option) { labels.set(option.value, option.textContent); }); }
      return { name: name, control: control, field: control ? control.closest("[data-match-filter-field], .field") : null, labels: labels, values: [] };
    });
    var records = events.map(function (event) {
      var title = event.querySelector(".match-event__title");
      var stats = event.querySelector("[data-event-stats]");
      var rows = Array.from(event.querySelectorAll("[data-match-row]")).map(function (row) {
        var opponent = row.querySelector(".match-row__opponent");
        return { element: row, opponent: opponent ? normalized(opponent.textContent) : "" };
      });
      return {
        element: event,
        title: title ? normalized(title.textContent) : "",
        details: event.querySelector(".match-event__details"),
        stats: stats,
        originalStats: stats ? stats.textContent : "",
        rows: rows,
        participations: Array.from(event.querySelectorAll("[data-match-participation]")).map(function (element) {
          return {
            element: element,
            audience: element.getAttribute("data-audience") || "",
            grade: element.getAttribute("data-grade") || "",
            category: element.getAttribute("data-category") || "",
            summary: element.getAttribute("data-category-summary") || "",
            points: element.getAttribute("data-category-points"),
            pointsPlacement: element.getAttribute("data-category-points-placement"),
            pointsOpponents: element.getAttribute("data-category-points-opponents"),
            placement: element.getAttribute("data-category-placement"),
            rows: rows.filter(function (row) { return element.contains(row.element); })
          };
        })
      };
    });
    var totalMatches = records.reduce(function (total, record) { return total + record.rows.length; }, 0);
    list.setAttribute("tabindex", "-1");

    function syncTaxonomy(kindValue) {
      var candidates = records.filter(function (record) {
        return record.element.getAttribute("data-event-kind") === "turnaj" &&
          (!year.value || record.element.getAttribute("data-event-year") === year.value);
      }).flatMap(function (record) { return record.participations; });
      var active = kindValue === "turnaj" && candidates.length > 0;
      var hasVisibleField = false;
      taxonomyFields.forEach(function (filter) {
        if (!filter.control || !filter.field) { return; }
        var values = Array.from(new Set(candidates.map(function (participation) { return participation[filter.name]; }).filter(Boolean)));
        var audienceOrder = ["adults", "juniors", "masters"];
        values.sort(function (a, b) {
          return filter.name === "audience" ? audienceOrder.indexOf(a) - audienceOrder.indexOf(b) : a.localeCompare(b, "cs", { numeric: true });
        });
        var visible = active && values.length > 1;
        var selected = visible && values.includes(filter.control.value) ? filter.control.value : "";
        if (values.join("\n") !== filter.values.join("\n")) {
          var audienceLabels = { adults: "Dospělí", juniors: "Junioři", masters: "Masters" };
          var options = [""].concat(values).map(function (value) {
            var option = document.createElement("option");
            option.value = value;
            option.textContent = filter.labels.get(value) || (filter.name === "audience" ? audienceLabels[value] : value) || "Vše";
            return option;
          });
          filter.control.replaceChildren.apply(filter.control, options);
          filter.values = values;
        }
        filter.control.value = selected;
        filter.control.disabled = !visible;
        filter.field.hidden = !visible;
        hasVisibleField = hasVisibleField || visible;
        if (selected) { candidates = candidates.filter(function (participation) { return participation[filter.name] === selected; }); }
      });
      if (taxonomy) {
        taxonomy.hidden = !hasVisibleField;
        var resetButton = form.querySelector('button[type="reset"]');
        if (resetButton) {
          if (hasVisibleField && resetButton.parentElement !== taxonomy) { taxonomy.append(resetButton); }
          if (!hasVisibleField && resetButton.parentElement === taxonomy) { form.insertBefore(resetButton, taxonomy); }
        }
      }
    }

    function eligibleParticipation(participation) {
      return taxonomyFields.every(function (filter) {
        return !filter.control || filter.control.disabled || !filter.control.value || participation[filter.name] === filter.control.value;
      });
    }

    function matchCountText(amount) {
      return amount + (amount === 1 ? " evidovaný zápas" : amount > 1 && amount < 5 ? " evidované zápasy" : " evidovaných zápasů");
    }

    // Work on text nodes only: links, source characters and their attributes stay intact.
    function highlight(element, query) {
      element.querySelectorAll("mark[data-match-mark]").forEach(function (mark) { mark.replaceWith(document.createTextNode(mark.textContent)); });
      element.normalize();
      if (!query) { return; }
      var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      var nodes = [];
      while (walker.nextNode()) { nodes.push(walker.currentNode); }
      nodes.forEach(function (node) {
        var text = node.data;
        var folded = "";
        var positions = [];
        var offset = 0;
        Array.from(text).forEach(function (character) {
          var end = offset + character.length;
          var part = character.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("cs");
          if (!part && positions.length) { positions[positions.length - 1].end = end; }
          for (var index = 0; index < part.length; index += 1) { positions.push({ start: offset, end: end }); }
          folded += part;
          offset = end;
        });
        var start = folded.indexOf(query);
        if (start < 0) { return; }
        var fragment = document.createDocumentFragment();
        var cursor = 0;
        while (start >= 0) {
          var from = positions[start].start;
          var to = positions[start + query.length - 1].end;
          fragment.append(document.createTextNode(text.slice(cursor, from)));
          var mark = document.createElement("mark");
          mark.setAttribute("data-match-mark", "");
          mark.textContent = text.slice(from, to);
          fragment.append(mark);
          cursor = to;
          start = folded.indexOf(query, start + query.length);
        }
        fragment.append(document.createTextNode(text.slice(cursor)));
        node.replaceWith(fragment);
      });
    }

    function renderPagination(pages) {
      if (!pagination) { return; }
      pagination.replaceChildren();
      pagination.hidden = pages < 2;
      if (pages < 2) { return; }
      function button(number, label, disabled, direction) {
        var control = document.createElement("button");
        control.type = "button";
        control.className = "button button--secondary";
        control.dataset.matchPage = String(number);
        control.disabled = disabled;
        control.setAttribute("aria-label", direction ? label + " strana" : "Strana " + number);
        if (direction) {
          var arrow = document.createElement("span");
          arrow.setAttribute("aria-hidden", "true");
          arrow.className = "ui-icon ui-icon--arrow-" + (direction === "previous" ? "left" : "right");
          control.append(arrow);
        } else {
          control.textContent = label;
          if (number === page) { control.setAttribute("aria-current", "page"); }
        }
        pagination.append(control);
      }
      function ellipsis() {
        var gap = document.createElement("span");
        gap.className = "pagination__ellipsis";
        gap.setAttribute("aria-hidden", "true");
        gap.textContent = "…";
        pagination.append(gap);
      }
      button(page - 1, "Předchozí", page === 1, "previous");
      if (pages <= 7) {
        for (var number = 1; number <= pages; number += 1) { button(number, String(number), false); }
      } else {
        var first = Math.max(2, Math.min(page - 1, pages - 3));
        var last = Math.min(pages - 1, first + 2);
        button(1, "1", false);
        if (first > 2) { ellipsis(); }
        for (var nearby = first; nearby <= last; nearby += 1) { button(nearby, String(nearby), false); }
        if (last < pages - 1) { ellipsis(); }
        button(pages, String(pages), false);
      }
      var mobileStatus = document.createElement("span");
      mobileStatus.className = "pagination__mobile-status";
      mobileStatus.textContent = page + " / " + pages;
      mobileStatus.setAttribute("aria-label", "Strana " + page + " z " + pages);
      pagination.append(mobileStatus);
      button(page + 1, "Další", page === pages, "next");
    }

    function update(resetPage) {
      if (resetPage !== false) { page = 1; }
      var query = normalized(search.value);
      var kind = form.querySelector("[data-match-kind]:checked");
      var kindValue = kind && kind.value !== "all" ? kind.value : "";
      syncTaxonomy(kindValue);
      var taxonomyFiltered = taxonomyFields.some(function (filter) { return filter.control && !filter.control.disabled && !!filter.control.value; });
      if (query && !savedOpen) {
        savedOpen = new Map();
        records.forEach(function (record) { if (record.details) { savedOpen.set(record.details, record.details.open); } });
      }
      var matching = records.filter(function (record) {
        var eligible = record.participations.filter(eligibleParticipation);
        var eligibleRows = record.participations.length ? eligible.flatMap(function (participation) { return participation.rows; }) : (taxonomyFiltered ? [] : record.rows);
        var eligibleRowSet = new Set(eligibleRows);
        record.matchingRows = eligibleRows.length;
        record.participations.forEach(function (participation) { participation.element.hidden = !eligible.includes(participation); });
        var metricPoints = record.element.querySelector('[data-event-points]');
        if (metricPoints) {
          function metricValues(key) {
            return eligible.map(function (participation) {
              var raw = participation[key];
              var value = raw === null || raw === '' ? '—' : key === 'placement' ? raw + '. místo' : new Intl.NumberFormat('cs-CZ').format(Number(raw));
              return (eligible.length > 1 ? (participation.category || 'Kategorie') + ': ' : '') + value;
            }).join(' · ');
          }
          metricPoints.textContent = metricValues('points');
          record.element.querySelector('[data-event-points-placement]').textContent = metricValues('pointsPlacement');
          record.element.querySelector('[data-event-points-opponents]').textContent = metricValues('pointsOpponents');
          record.element.querySelector('[data-event-matches]').textContent = String(eligibleRows.length);
          record.element.querySelector('[data-event-placement]').textContent = metricValues('placement');
        }
        if (record.stats) {
          record.stats.textContent = eligible.length < record.participations.length ?
            eligible.map(function (participation) { return participation.summary || participation.category; }).filter(Boolean).concat(matchCountText(eligibleRows.length)).join(" · ") : record.originalStats;
        }
        var opponentMatch = false;
        record.rows.forEach(function (row) {
          var matches = eligibleRowSet.has(row) && !!query && row.opponent.includes(query);
          row.element.classList.toggle("is-match", matches);
          opponentMatch = opponentMatch || matches;
        });
        record.element.querySelectorAll("[data-match-highlight]").forEach(function (element) {
          var participation = element.closest("[data-match-participation]");
          highlight(element, participation && participation.hidden ? "" : query);
        });
        if (record.details && savedOpen) { record.details.open = query && opponentMatch ? true : savedOpen.get(record.details); }
        return (!year.value || record.element.getAttribute("data-event-year") === year.value) &&
          (!kindValue || record.element.getAttribute("data-event-kind") === kindValue) &&
          (!taxonomyFiltered || eligible.length > 0) &&
          (!query || record.title.includes(query) || opponentMatch);
      });
      if (!query) { savedOpen = null; }
      var pages = Math.ceil(matching.length / pageSize);
      page = Math.min(page, Math.max(1, pages));
      var start = (page - 1) * pageSize;
      var visible = matching.slice(start, start + pageSize);
      var visibleSet = new Set(visible);
      records.forEach(function (record) { record.element.hidden = !visibleSet.has(record); });
      var matchingMatches = matching.reduce(function (total, record) { return total + record.matchingRows; }, 0);
      var range = matching.length ? (start + 1) + "–" + (start + visible.length) : "0";
      count.textContent = (matching.length ? "Akce " + range + " z " + matching.length : "Žádné odpovídající akce") + " · " +
        (query || year.value || kindValue || taxonomyFiltered ? matchingMatches + " z " : "") + totalMatches + " evidovaných zápasů";
      empty.hidden = matching.length !== 0;
      renderPagination(pages);
    }

    if (pagination) {
      pagination.addEventListener("click", function (event) {
        var control = event.target.closest("button[data-match-page]");
        if (!control || !pagination.contains(control) || control.disabled) { return; }
        var requested = Number(control.dataset.matchPage);
        if (requested === page) { return; }
        page = requested;
        update(false);
        list.focus({ preventScroll: true });
        list.scrollIntoView({ block: "start" });
      });
    }
    form.addEventListener("submit", function (event) { event.preventDefault(); update(); });
    form.addEventListener("input", update);
    form.addEventListener("change", update);
    form.addEventListener("reset", function () { window.setTimeout(update, 0); });
    root.querySelectorAll("[data-match-reset]").forEach(function (button) {
      button.addEventListener("click", function () { form.reset(); search.focus({ preventScroll: true }); });
    });
    form.hidden = false;
    update();
  });

  var hero = document.querySelector("[data-hero]");
  if (!hero) {
    return;
  }

  var slides = Array.from(hero.querySelectorAll("[data-hero-slide]"));
  var contents = Array.from(hero.querySelectorAll("[data-hero-content]"));
  var steps = Array.from(hero.querySelectorAll("[data-hero-step]"));
  var controls = hero.querySelector("[data-hero-controls]");
  var dots = hero.querySelector("[data-hero-dots]");
  var contentPanel = hero.querySelector(".hero__content");
  var mobileQuery = window.matchMedia("(max-width: 767px)");
  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (slides.length !== 3 || contents.length !== slides.length || steps.length !== slides.length || !controls) {
    return;
  }

  var activeIndex = 0;
  var dotsRotation = 0;
  var progressAnimation = null;
  var pointerPaused = false;
  var focusPaused = false;

  function isPaused() {
    return pointerPaused || focusPaused || motionQuery.matches;
  }

  function directionBetween(currentIndex, nextIndex) {
    return nextIndex - currentIndex;
  }

  function syncContentHeight() {
    if (!contentPanel || !mobileQuery.matches) {
      if (contentPanel) {
        contentPanel.style.removeProperty("--hero-content-height");
      }
      return;
    }

    var hiddenStates = contents.map(function (content) {
      return content.hidden;
    });
    contents.forEach(function (content) {
      content.hidden = false;
    });
    var maxHeight = Math.max.apply(null, contents.map(function (content) {
      return content.getBoundingClientRect().height;
    }));

    contents.forEach(function (content, index) {
      content.hidden = hiddenStates[index];
    });
    contentPanel.style.setProperty("--hero-content-height", Math.ceil(maxHeight) + "px");
  }

  function startProgress() {
    if (progressAnimation) {
      progressAnimation.cancel();
    }

    progressAnimation = null;

    if (motionQuery.matches) {
      return;
    }

    var fill = steps[activeIndex].querySelector(".hero__progress-fill");
    progressAnimation = fill.animate(
      [
        { transform: "scaleX(0)" },
        { transform: "scaleX(1)" }
      ],
      {
        duration: 5000,
        easing: "linear",
        fill: "forwards"
      }
    );

    progressAnimation.onfinish = function () {
      if (!isPaused()) {
        setActive((activeIndex + 1) % slides.length, 1);
      }
    };

    if (isPaused()) {
      progressAnimation.pause();
    }
  }

  function syncProgress() {
    if (motionQuery.matches) {
      if (progressAnimation) {
        progressAnimation.cancel();
        progressAnimation = null;
      }
      return;
    }

    if (!progressAnimation) {
      startProgress();
      return;
    }

    if (isPaused()) {
      progressAnimation.pause();
    } else {
      progressAnimation.play();
    }
  }

  function setActive(nextIndex, direction) {
    var previousIndex = activeIndex;
    activeIndex = nextIndex;
    hero.setAttribute("data-active-index", String(activeIndex));

    contents.forEach(function (content, index) {
      content.hidden = index !== activeIndex;
    });

    slides.forEach(function (slide, index) {
      slide.inert = index !== activeIndex;
      slide.setAttribute("aria-hidden", String(index !== activeIndex));
    });

    steps.forEach(function (step, index) {
      if (index === activeIndex) {
        step.setAttribute("aria-current", "true");
      } else {
        step.removeAttribute("aria-current");
      }
    });

    if (previousIndex !== activeIndex && dots) {
      dotsRotation += 180 * (direction || directionBetween(previousIndex, nextIndex));
      dots.style.setProperty("--dots-rotation", dotsRotation + "deg");
    }

    startProgress();
  }

  controls.hidden = false;

  steps.forEach(function (step) {
    step.addEventListener("click", function () {
      var nextIndex = Number(step.getAttribute("data-slide-index"));
      setActive(nextIndex);
    });
  });

  hero.addEventListener("pointerenter", function () {
    pointerPaused = true;
    syncProgress();
  });

  hero.addEventListener("pointerleave", function () {
    pointerPaused = false;
    syncProgress();
  });

  hero.addEventListener("focusin", function () {
    focusPaused = true;
    syncProgress();
  });

  hero.addEventListener("focusout", function (event) {
    if (!hero.contains(event.relatedTarget)) {
      focusPaused = false;
      syncProgress();
    }
  });

  motionQuery.addEventListener("change", function () {
    syncProgress();
  });

  setActive(0);
  syncContentHeight();
  mobileQuery.addEventListener("change", syncContentHeight);
  window.addEventListener("resize", syncContentHeight);

  if (document.fonts) {
    document.fonts.ready.then(syncContentHeight);
  }

  if (new URLSearchParams(window.location.search).has("selfcheck")) {
    console.assert(slides.length === 3, "Hero musí obsahovat tři stories.");
    console.assert(contents.length === slides.length, "Každá hero story musí mít textový obsah.");
    console.assert(steps.length === slides.length, "Každá hero story musí mít ovladač.");
    console.assert(directionBetween(0, 2) === 2, "Přeskočení dvou stories musí otočit dekoraci dvojnásobně vpřed.");
    console.assert(directionBetween(2, 0) === -2, "Přeskočení dvou stories musí otočit dekoraci dvojnásobně zpět.");
    console.assert(menuToggle && mobileMenu, "Mobilní menu musí mít tlačítko i panel.");
    console.assert(document.querySelectorAll(".events__track .event-card").length > 1, "Přehled akcí musí obsahovat více než jednu kartu.");
  }
})();

// A bracket starts as a complete static list and is enhanced only when visible.
(function () {
  var roots = Array.from(document.querySelectorAll("[data-bracket]"));
  if (!roots.length) { return; }
  var library;
  function loadLibrary() {
    if (!library) { library = import("../vendor/bracketry-1.1.3/bracketry.esm.js"); }
    return library;
  }
  function validTree(rounds) {
    if (rounds.length < 2) { return false; }
    return rounds.every(function (round, index) {
      var matches = Array.from(round.querySelectorAll(".bracket__match-item"));
      if (matches.length !== Math.pow(2, rounds.length - index - 1)) { return false; }
      if (!index) { return true; }
      var previous = Array.from(rounds[index - 1].querySelectorAll(".bracket__match-item"));
      return matches.every(function (match, order) {
        var sides = match.querySelectorAll(".bracket-match__side");
        return sides.length === 2 && Array.from(sides).every(function (side, sideIndex) {
          var expected = previous[order * 2 + sideIndex].getAttribute("data-bracket-match-id");
          return expected && side.getAttribute("data-bracket-origin") === expected;
        });
      });
    });
  }
  roots.forEach(function (root) {
    var panels = Array.from(root.querySelectorAll("[data-bracket-panel]"));
    var controls = root.querySelector("[data-tabs-controls]");
    var key = root.getAttribute("data-bracket-key");
    if (controls) {
      panels.forEach(function (panel) {
        var title = panel.querySelector(".bracket__branch-title");
        if (title && root.closest("[data-tournament-refined]")) { title.classList.add("visually-hidden"); }
      });
    }
    root.addEventListener("tabs:change", function () { window.requestAnimationFrame(enhanceVisible); });
    window.requestAnimationFrame(enhanceVisible);
    function enhanceVisible() {
      panels.forEach(function (panel) {
        if (panel.hidden || !panel.getClientRects().length || panel.dataset.bracketReady) { return; }
        var rounds = Array.from(panel.querySelectorAll("[data-bracket-round]"));
        if (!validTree(rounds)) { panel.dataset.bracketReady = "static"; return; }
        panel.dataset.bracketReady = "loading";
        loadLibrary().then(function (module) {
          var visual = panel.querySelector("[data-bracket-visual]");
          var fallback = panel.querySelector("[data-bracket-fallback]");
          var matchNodes = rounds.map(function (round) { return Array.from(round.querySelectorAll(".bracket__match-item .bracket-match")); });
          var data = { rounds: rounds.map(function (round) { return { name: round.querySelector(".bracket__round-title").textContent }; }), matches: [] };
          matchNodes.forEach(function (matches, roundIndex) { matches.forEach(function (_, order) { data.matches.push({ roundIndex: roundIndex, order: order }); }); });
          if (panel.hidden || !panel.getClientRects().length) { delete panel.dataset.bracketReady; return; }
          visual.hidden = false;
          var nav = document.createElement("div");
          nav.className = "bracket__navigation";
          var prev = document.createElement("button");
          var next = document.createElement("button");
          prev.type = next.type = "button";
          prev.textContent = "Předchozí kola";
          next.textContent = "Další kola";
          nav.append(prev, next);
          panel.insertBefore(nav, visual);
          var visible = Math.max(1, Math.min(rounds.length, Math.floor(visual.clientWidth / 250)));
          var instance = module.createBracket(data, visual, {
            height: "100%", visibleRoundsCount: visible, navButtonsPosition: "hidden", verticalScrollMode: "native", showScrollbar: true,
            disableHighlight: true, matchHorMargin: 12, matchMinVerticalGap: 24,
            connectionLinesColor: "#d6d3d1", roundTitleColor: "#1c1917", rootFontFamily: "Vend Sans, sans-serif",
            getMatchElement: function (roundIndex, order) { return matchNodes[roundIndex] && matchNodes[roundIndex][order] ? matchNodes[roundIndex][order].cloneNode(true) : null; }
          });
          if (!instance || !visual.querySelector(".bracket-root")) { nav.remove(); visual.hidden = true; panel.dataset.bracketReady = "static"; return; }
          var roundKey = key + "-" + panel.getAttribute("data-bracket-panel") + "-kolo";
          var savedRound = Number(new URL(window.location.href).searchParams.get(roundKey));
          if (Number.isInteger(savedRound) && savedRound > 0) { instance.setBaseRoundIndex(savedRound); }
          function saveRound() {
            var url = new URL(window.location.href);
            url.searchParams.set(roundKey, String(instance.getNavigationState().baseRoundIndex));
            window.history.replaceState(window.history.state, "", url.href);
          }
          function updateNav() {
            var state = instance.getNavigationState();
            nav.hidden = state.allRoundsAreVisible;
            prev.disabled = state.baseRoundIndex <= 0;
            next.disabled = state.lastRoundIsFullyVisible;
          }
          prev.addEventListener("click", function () { instance.moveToPreviousRound(); updateNav(); saveRound(); });
          next.addEventListener("click", function () { instance.moveToNextRound(); updateNav(); saveRound(); });
          var details = document.createElement("details");
          details.className = "bracket__fallback-details";
          var summary = document.createElement("summary");
          summary.textContent = "Výsledky po kolech";
          fallback.before(details);
          details.append(summary, fallback);
          panel.dataset.bracketReady = "true";
          updateNav();
          if (window.ResizeObserver) {
            var observer = new ResizeObserver(function () {
              if (!visual.clientWidth) { return; }
              var count = Math.max(1, Math.min(rounds.length, Math.floor(visual.clientWidth / 250)));
              if (count !== visible) { visible = count; instance.applyNewOptions({ visibleRoundsCount: count }); updateNav(); }
            });
            observer.observe(visual);
          }
        }).catch(function () {
          var visual = panel.querySelector("[data-bracket-visual]");
          var nav = panel.querySelector(".bracket__navigation");
          var details = panel.querySelector(".bracket__fallback-details");
          if (nav) { nav.remove(); }
          if (details) { details.before(details.querySelector("[data-bracket-fallback]")); details.remove(); }
          if (visual) { visual.hidden = true; visual.replaceChildren(); }
          panel.dataset.bracketReady = "static";
        });
      });
    }
    var visibility = new MutationObserver(function () { window.requestAnimationFrame(enhanceVisible); });
    visibility.observe(document.body, { attributes: true, subtree: true, attributeFilter: ["hidden"] });
  });
})();
