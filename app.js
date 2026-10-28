"use strict";
/* Madinah Market — static ordering site (no backend).
   Orders finish by SMS text or phone call to the restaurant. */

const PHONE_DISPLAY = "720-763-0786";
const PHONE_TEL = "+17207630786";

const ZONES = [
  { zone: 1, min: 15.00, fee: 3.99 },
  { zone: 2, min: 15.00, fee: 4.99 },
  { zone: 3, min: 20.00, fee: 5.99 },
  { zone: 4, min: 20.00, fee: 7.99 },
  { zone: 5, min: 25.00, fee: 7.99 },
  { zone: 6, min: 25.00, fee: 8.99 },
  { zone: 7, min: 25.00, fee: 8.99 },
  { zone: 8, min: 25.00, fee: 9.99 },
  { zone: 9, min: 25.00, fee: 9.99 }
];

const CATEGORIES = [
  { id: "platters",    label: "Platters",                fa: "کباب و شاورما" },
  { id: "sandwiches",  label: "Sandwiches",              fa: "ساندویج" },
  { id: "hotbread",    label: "Hot Bread · Hot Kabob",   fa: "نان داغ کباب داغ" },
  { id: "sides",       label: "Side Orders",             fa: "" },
  { id: "kabobsonly",  label: "Kabobs Only",             fa: "" },
  { id: "drinks",      label: "Drinks",                  fa: "" }
];

const MENU = [
  /* Platters */
  { id: "combo-platter", cat: "platters", name: "#5 Combo Platter (Chicken & Gyro over Rice)", price: 11.75, img: "images/combo-platter.jpg", desc: "Long grain basmati rice with sliced lamb gyro and chicken shawarma, white sauce, lettuce, tomato, onion and french fries." },
  { id: "chicken-shawarma-over-rice", cat: "platters", name: "#6 Chicken Shawarma Over Rice", price: 11.75, img: "images/chicken-shawarma-over-rice.jpg", desc: "Tender marinated chicken fillet with creamy white sauce, lettuce, tomato, onion and cucumber." },
  { id: "lamb-gyro-over-rice", cat: "platters", name: "#7 Lamb Gyro Over Rice", price: 11.75, img: "images/lamb-gyro-over-rice.jpg", desc: "Long grain basmati rice with sliced lamb gyro, white sauce, lettuce, tomato, onion and french fries." },
  { id: "chicken-biryani", cat: "platters", name: "#8 Chicken Biryani", price: 11.75, img: "images/chicken-biryani.jpg", desc: "One of Southeast Asia's most popular dishes — marinated spicy chicken with fragrant spices." },
  { id: "kobideh-kabob", cat: "platters", name: "#9 Kobideh Kabob", price: 11.75, img: "images/kobideh-kabob.jpg", desc: "2 skewers of kabob kobideh (lamb and beef mix) with rice, salad and french fries." },
  { id: "chicken-nuggets", cat: "platters", name: "#10 7 pcs Chicken Nuggets with French Fries", price: 8.99, img: "images/chicken-nuggets.jpg", desc: "" },
  { id: "chicken-tikka-kabob", cat: "platters", name: "#11 Chicken Tikka Kabob", price: 11.75, img: "images/chicken-tikka-kabob.jpg", desc: "2 skewers of chicken kabob served with rice, salad and fries." },
  { id: "lamb-shank", cat: "platters", name: "#12 Lamb Shank Over Rice", price: 13.75, img: "images/lamb-shank.jpg", desc: "Tender and juicy lamb shank served with rice, salad and fries." },
  { id: "sultani-kabob", cat: "platters", name: "#13 Sultani Kabob", price: 13.75, img: "images/sultani-kabob.jpg", desc: "2 beef kabobs and 1 chicken kabob, served with rice, salad and fries." },
  { id: "falafel-platter", cat: "platters", name: "#14 Falafel Platter", price: 11.75, img: "images/falafel-platter.jpg", desc: "Falafel over basmati rice, served with salad and french fries." },
  { id: "fish-over-rice", cat: "platters", name: "#15 Fried Fish Over Rice", price: 11.75, img: "images/fish-over-rice.jpg", desc: "2 large pieces of fried fish served with salad and french fries." },
  { id: "chicken-wings", cat: "platters", name: "#16 Chicken Wings with Fries", price: 8.99, img: "images/chicken-wings.jpg", desc: "4 pcs wings with fries." },
  /* Sandwiches */
  { id: "gyro-sandwich", cat: "sandwiches", name: "#1 Gyro Sandwich", price: 8.99, img: "images/gyro-sandwich.jpg", desc: "Sliced gyro on bread with white sauce, chopped onion, tomatoes, cucumber and lettuce." },
  { id: "chicken-shawarma-sandwich", cat: "sandwiches", name: "#2 Chicken Shawarma Sandwich", price: 8.99, img: "images/chicken-shawarma-sandwich.jpg", desc: "Tender marinated chicken fillet with creamy white sauce, lettuce, tomato, onion and cucumber." },
  { id: "falafel-sandwich", cat: "sandwiches", name: "#3 Falafel Sandwich", price: 8.99, img: "images/falafel-sandwich.jpg", desc: "Fresh vegetarian patties of crushed chickpea with onion, garlic, cilantro and Mediterranean spices, with lettuce, tomato, onion and cucumber." },
  { id: "burger-fries", cat: "sandwiches", name: "#4 Beef Burger & Fries", price: 8.99, img: "images/burger-fries.jpg", desc: "Beef burger and fries." },
  { id: "kobideh-sandwich", cat: "sandwiches", name: "Kobideh Kabob Sandwich", price: 9.99, img: "images/kobideh-sandwich.jpg", desc: "2 skewers of kabob kobideh." },
  { id: "chicken-kabob-sandwich", cat: "sandwiches", name: "Chicken Kabob Sandwich", price: 9.99, img: "images/chicken-kabob-sandwich.jpg", desc: "2 skewers of chicken kabob." },
  /* Hot bread hot kabob */
  { id: "hot-bread-kobideh", cat: "hotbread", name: "Hot Bread Hot Kabob (Kobideh Kabob)", price: 11.99, img: "images/hot-bread-kobideh.jpg", desc: "2 skewers of kobideh kabob with bread, fries and salad." },
  { id: "hot-bread-chicken", cat: "hotbread", name: "Hot Bread Hot Kabob (Chicken Kabob)", price: 11.99, img: "images/hot-bread-chicken.jpg", desc: "2 skewers of chicken kabob with bread, fries and salad." },
  /* Sides */
  { id: "french-fries", cat: "sides", name: "French Fries", price: 2.49, img: "images/french-fries.jpg", desc: "" },
  { id: "falafel-4pcs", cat: "sides", name: "4 pcs Falafel", price: 3.29, img: "images/falafel-4pcs.jpg", desc: "" },
  { id: "pita-bread", cat: "sides", name: "Pita Bread", price: 1.25, img: "images/pita-bread.jpg", desc: "" },
  { id: "plain-rice", cat: "sides", name: "Plain Rice Plate", price: 4.99, img: "images/plain-rice.jpg", desc: "" },
  { id: "samosa-3pcs", cat: "sides", name: "3 pcs Veggie Samosa", price: 4.99, img: "images/samosa-3pcs.jpg", desc: "" },
  { id: "samosa-10pcs", cat: "sides", name: "10 pcs Veggie Samosa", price: 14.99, img: "images/samosa-10pcs.jpg", desc: "" },
  /* Kabobs only */
  { id: "kobideh-only", cat: "kabobsonly", name: "Kobideh Kabob Only (per skewer)", price: 2.99, img: "images/kobideh-only.jpg", desc: "Lamb and beef mixed." },
  { id: "chicken-kabob-only", cat: "kabobsonly", name: "Chicken Kabob Only (per skewer)", price: 2.99, img: "images/chicken-kabob-only.jpg", desc: "" },
  { id: "grilled-tomatoes", cat: "kabobsonly", name: "Grilled Tomatoes (2 tomatoes)", price: 2.49, img: "images/grilled-tomatoes.jpg", desc: "" },
  /* Drinks */
  { id: "yogurt-drink", cat: "drinks", name: "Yogurt Drink (Ayran / Dough)", price: 2.59, img: "images/yogurt-drink.jpg", desc: "" },
  { id: "water-bottle", cat: "drinks", name: "Bottle of Water", price: 0.79, img: "images/water-bottle.jpg", desc: "" },
  { id: "can-soda", cat: "drinks", name: "Can Soda", price: 1.59, img: "images/can-soda.jpg", desc: "" },
  { id: "bottle-soda", cat: "drinks", name: "Bottle of Soda", price: 2.49, img: "images/bottle-soda.jpg", desc: "Coke, Pepsi." },
  { id: "ginseng-drink", cat: "drinks", name: "Ginseng Energy Drink", price: 1.99, img: "images/ginseng-drink.jpg", desc: "" },
  { id: "redbull", cat: "drinks", name: "Red Bull 8oz", price: 2.99, img: "images/redbull.jpg", desc: "" },
  { id: "monster-drink", cat: "drinks", name: "Monster Drink", price: 2.99, img: "images/monster-drink.jpg", desc: "" }
];

/* ---------- Hours (America/Denver) ---------- */
/* day: 0=Sun..6=Sat -> [open, close] in minutes from midnight */
const HOURS = { 0: [600, 1140], 1: [600, 1190], 2: [600, 1190], 3: [600, 1190], 4: [600, 1190], 5: [600, 1200], 6: [600, 1200] };
const HOURS_LABEL = { 0: "Sunday 10:00 AM – 7:00 PM", 1: "Monday 10:00 AM – 7:50 PM", 2: "Tuesday 10:00 AM – 7:50 PM", 3: "Wednesday 10:00 AM – 7:50 PM", 4: "Thursday 10:00 AM – 7:50 PM", 5: "Friday 10:00 AM – 8:00 PM", 6: "Saturday 10:00 AM – 8:00 PM" };

function denverNow() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "America/Denver" }));
}
function isOpen(now) {
  const n = now || denverNow();
  const range = HOURS[n.getDay()];
  const mins = n.getHours() * 60 + n.getMinutes();
  return mins >= range[0] && mins < range[1];
}
function fmtTime(mins) {
  let h = Math.floor(mins / 60), m = mins % 60;
  const ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12;
  return h + ":" + String(m).padStart(2, "0") + " " + ap;
}
function renderStatus() {
  const n = denverNow();
  const el = document.getElementById("open-status");
  const range = HOURS[n.getDay()];
  if (isOpen(n)) {
    el.textContent = "🟢 Open now · " + HOURS_LABEL[n.getDay()] + " (closes " + fmtTime(range[1]) + ")";
    el.classList.add("open"); el.classList.remove("closed");
  } else {
    el.textContent = "🔴 Closed · " + HOURS_LABEL[n.getDay()] + " — call " + PHONE_DISPLAY + " for info";
    el.classList.add("closed"); el.classList.remove("open");
  }
  const btn = document.getElementById("place-order");
  if (btn) {
    btn.disabled = !isOpen(n);
    btn.textContent = isOpen(n) ? "Place Order" : "Closed — ordering opens at " + fmtTime(range[0]);
  }
}

/* ---------- Menu rendering ---------- */
const money = (v) => "$" + v.toFixed(2);
const cart = new Map(); // id -> qty

function buildNav() {
  const nav = document.getElementById("cat-nav");
  nav.innerHTML = CATEGORIES.map(c =>
    '<a href="#cat-' + c.id + '">' + c.label + (c.fa ? ' · <span class="fa">' + c.fa + "</span>" : "") + "</a>"
  ).join("");
}

function buildMenu() {
  const wrap = document.getElementById("menu-container");
  wrap.innerHTML = CATEGORIES.map(cat => {
    const items = MENU.filter(i => i.cat === cat.id);
    if (!items.length) return "";
    return '<section class="cat-block" id="cat-' + cat.id + '">' +
      "<h3>" + cat.label + (cat.fa ? ' <span class="fa">' + cat.fa + "</span>" : "") + "</h3>" +
      '<div class="grid">' + items.map(cardHtml).join("") + "</div></section>";
  }).join("");
}

function cardHtml(item) {
  return '<article class="card" data-id="' + item.id + '" data-name="' + item.name.toLowerCase().replace(/"/g, "") + '">' +
    '<img src="' + item.img + '" alt="' + item.name + '" loading="lazy">' +
    '<div class="card-body"><h4>' + item.name + "</h4>" +
    (item.desc ? '<p class="desc">' + item.desc + "</p>" : "") +
    '<div class="card-foot"><span class="price">' + money(item.price) + "</span>" +
    '<span class="stepper" data-stepper="' + item.id + '"></span></div></div></article>';
}

function stepperHtml(id) {
  const q = cart.get(id) || 0;
  if (q === 0) return '<button class="add-btn" data-add="' + id + '">Add +</button>';
  return '<button class="step-btn" data-dec="' + id + '" aria-label="Remove one">−</button>' +
    '<span class="qty">' + q + "</span>" +
    '<button class="step-btn" data-inc="' + id + '" aria-label="Add one">+</button>';
}

function refreshSteppers() {
  document.querySelectorAll("[data-stepper]").forEach(el => {
    el.innerHTML = stepperHtml(el.getAttribute("data-stepper"));
  });
}

/* ---------- Cart ---------- */
function cartEntries() {
  return [...cart.entries()].map(([id, qty]) => ({ item: MENU.find(m => m.id === id), qty })).filter(e => e.item && e.qty > 0);
}
function subtotal() {
  return cartEntries().reduce((s, e) => s + e.item.price * e.qty, 0);
}
function cartCount() {
  return cartEntries().reduce((s, e) => s + e.qty, 0);
}

function setQty(id, qty) {
  if (qty <= 0) cart.delete(id); else cart.set(id, qty);
  refreshSteppers(); renderCart();
}

function renderCart() {
  document.getElementById("cart-count").textContent = cartCount();
  document.getElementById("cart-total").textContent = money(subtotal());
  document.getElementById("drawer-subtotal").textContent = money(subtotal());
  const box = document.getElementById("cart-items");
  const entries = cartEntries();
  if (!entries.length) {
    box.innerHTML = '<p class="empty">Your cart is empty. Add something tasty from the menu!</p>';
  } else {
    box.innerHTML = entries.map(e =>
      '<div class="cart-row"><div class="cart-row-info"><strong>' + e.item.name + "</strong><br><span>" +
      money(e.item.price) + " × " + e.qty + " = " + money(e.item.price * e.qty) + "</span></div>" +
      '<span class="stepper">' + stepperHtml(e.item.id) + "</span></div>"
    ).join("");
  }
  document.getElementById("checkout-open").disabled = !entries.length || !isOpen();
  updateSummary();
}

/* ---------- Search ---------- */
function applySearch(q) {
  q = (q || "").trim().toLowerCase();
  let any = false;
  document.querySelectorAll(".card").forEach(card => {
    const hit = !q || card.getAttribute("data-name").includes(q);
    card.style.display = hit ? "" : "none";
    if (hit) any = true;
  });
  document.querySelectorAll(".cat-block").forEach(block => {
    const visible = [...block.querySelectorAll(".card")].some(c => c.style.display !== "none");
    block.style.display = visible ? "" : "none";
  });
  document.getElementById("no-results").hidden = any;
}

/* ---------- Checkout ---------- */
let orderType = "takeout";

function buildZones() {
  document.getElementById("zones-body").innerHTML = ZONES.map(z =>
    "<tr><td>Zone " + z.zone + "</td><td>" + money(z.min) + "</td><td>" + money(z.fee) + "</td></tr>"
  ).join("");
  const sel = document.getElementById("co-zone");
  sel.innerHTML = '<option value="">— Choose your zone —</option>' + ZONES.map(z =>
    '<option value="' + z.zone + '">Zone ' + z.zone + " — min " + money(z.min) + ", fee " + money(z.fee) + "</option>"
  ).join("");
}

function selectedZone() {
  const v = document.getElementById("co-zone").value;
  return ZONES.find(z => z.zone === Number(v)) || null;
}

function updateSummary() {
  const st = subtotal();
  const zone = orderType === "delivery" ? selectedZone() : null;
  const fee = zone ? zone.fee : 0;
  document.getElementById("sum-subtotal").textContent = money(st);
  document.getElementById("sum-fee-row").hidden = orderType !== "delivery";
  document.getElementById("sum-fee").textContent = money(fee);
  document.getElementById("sum-total").textContent = money(st + fee);
}

function setType(t) {
  orderType = t;
  document.getElementById("type-takeout").classList.toggle("active", t === "takeout");
  document.getElementById("type-delivery").classList.toggle("active", t === "delivery");
  document.getElementById("delivery-fields").hidden = t !== "delivery";
  updateSummary();
}

function showError(msg) {
  const e = document.getElementById("checkout-error");
  e.textContent = msg; e.hidden = !msg;
}

function submitOrder(ev) {
  ev.preventDefault();
  showError("");
  if (!isOpen()) { showError("We are closed right now. Ordering is available during opening hours."); return; }
  const entries = cartEntries();
  if (!entries.length) { showError("Your cart is empty."); return; }
  const name = document.getElementById("co-name").value.trim();
  const phone = document.getElementById("co-phone").value.trim();
  if (!name) { showError("Please enter your name."); return; }
  if (!phone) { showError("Please enter your phone number."); return; }

  let fee = 0, zone = null, address = "";
  if (orderType === "delivery") {
    address = document.getElementById("co-address").value.trim();
    if (!address) { showError("Please enter your delivery address."); return; }
    zone = selectedZone();
    if (!zone) { showError("Please choose your delivery zone."); return; }
    if (subtotal() < zone.min) {
      showError("Delivery for Zone " + zone.zone + " needs a minimum order of " + money(zone.min) +
        ". Your subtotal is " + money(subtotal()) + " — please add " + money(zone.min - subtotal()) + " more.");
      return;
    }
    fee = zone.fee;
  }

  const notes = document.getElementById("co-notes").value.trim();
  const lines = ["NEW ORDER — Madinah Market website", ""];
  entries.forEach(e => lines.push(e.qty + " × " + e.item.name + " — " + money(e.item.price * e.qty)));
  lines.push("", "Subtotal: " + money(subtotal()));
  if (orderType === "delivery") {
    lines.push("Delivery fee (Zone " + zone.zone + "): " + money(fee));
  }
  lines.push("TOTAL: " + money(subtotal() + fee) + " (pay at restaurant)");
  lines.push("", "Type: " + (orderType === "delivery" ? "DELIVERY" : "TAKEOUT"));
  lines.push("Name: " + name);
  lines.push("Phone: " + phone);
  if (orderType === "delivery") lines.push("Address: " + address);
  if (notes) lines.push("Notes: " + notes);

  const text = lines.join("\n");
  document.getElementById("order-text").textContent = text;
  document.getElementById("sms-link").href = "sms:" + PHONE_TEL + "?&body=" + encodeURIComponent(text);
  document.getElementById("checkout-form").hidden = true;
  document.getElementById("order-done").hidden = false;
}

/* ---------- Drawer / modal ---------- */
function openDrawer() {
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-drawer").setAttribute("aria-hidden", "false");
  document.getElementById("scrim").hidden = false;
}
function closeDrawer() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-drawer").setAttribute("aria-hidden", "true");
  document.getElementById("scrim").hidden = true;
}
function openCheckout() {
  closeDrawer();
  document.getElementById("checkout-form").hidden = false;
  document.getElementById("order-done").hidden = true;
  showError("");
  renderStatus(); updateSummary();
  document.getElementById("checkout-modal").hidden = false;
}
function closeCheckout() {
  document.getElementById("checkout-modal").hidden = true;
}

/* ---------- Events ---------- */
document.addEventListener("click", (ev) => {
  const add = ev.target.closest("[data-add]");
  const inc = ev.target.closest("[data-inc]");
  const dec = ev.target.closest("[data-dec]");
  if (add) setQty(add.getAttribute("data-add"), 1);
  if (inc) { const id = inc.getAttribute("data-inc"); setQty(id, (cart.get(id) || 0) + 1); }
  if (dec) { const id = dec.getAttribute("data-dec"); setQty(id, (cart.get(id) || 0) - 1); }
});

document.getElementById("search").addEventListener("input", (e) => applySearch(e.target.value));
document.getElementById("cart-button").addEventListener("click", openDrawer);
document.getElementById("drawer-close").addEventListener("click", closeDrawer);
document.getElementById("scrim").addEventListener("click", closeDrawer);
document.getElementById("checkout-open").addEventListener("click", openCheckout);
document.getElementById("checkout-close").addEventListener("click", closeCheckout);
document.getElementById("done-close").addEventListener("click", closeCheckout);
document.getElementById("type-takeout").addEventListener("click", () => setType("takeout"));
document.getElementById("type-delivery").addEventListener("click", () => setType("delivery"));
document.getElementById("co-zone").addEventListener("change", updateSummary);
document.getElementById("checkout-form").addEventListener("submit", submitOrder);

/* ---------- Init ---------- */
buildNav();
buildMenu();
buildZones();
refreshSteppers();
renderCart();
renderStatus();
setInterval(renderStatus, 60000);
