"use strict";
const tabButtons = document.querySelectorAll(".tab-btn");
const tabItemsContainer = document.querySelector(".tab_content");
const tabRefresh = document.querySelector(".tab_refresh");

const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal_img");
const modalTitle = document.querySelector(".modal_title");
const modalDescr = document.querySelector(".modal_descr");
const modalClose = document.querySelector(".modal_close");
const body = document.querySelector("body");
let basePrice = 0;
let addCost = 0;
let sizeCost = 0;

let currentIndex = 0;
let currentItems = [];

async function loadMenuData(category) {
  const response = await fetch(`./js/${category}.json`);
  const data = await response.json();
  currentItems = data;
  currentIndex = 0;
  displayItems();
}

function displayItems() {
  tabItemsContainer.innerHTML = "";
  const itemsToShow = currentItems.slice(currentIndex, currentIndex + 4);
  itemsToShow.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("tab_card", "menu-card");
    card.innerHTML = `
      <div class="menu-card_img"><img src="${item.img}" alt="${item.title}"></div>
      <div class="menu-card_text">
        <div class="menu-card_title">${item.title}</div>
        <div class="menu-card_descr">${item.description}</div>
      </div>
    `;
    tabItemsContainer.appendChild(card);
  });
  if (currentItems.length > 4) {
    tabRefresh.style.display = "flex";
  } else {
    tabRefresh.style.display = "none";
  }
}

function handleRefresh() {
  currentIndex += 4;
  if (currentIndex >= currentItems.length) {
    currentIndex = 0;
  }
  displayItems();
  const section = document.getElementById("header");
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function handleTab(event) {
  tabButtons.forEach((button) => button.classList.remove("active"));
  event.currentTarget.classList.add("active");

  const category = event.currentTarget.dataset.category;
  loadMenuData(category);
}

tabButtons.forEach((button) => {
  button.addEventListener("click", handleTab);
});

tabRefresh.addEventListener("click", handleRefresh);

window.onload = () => {
  loadMenuData("balustrady");
};

//modal

function openModal(item) {
  document
    .querySelectorAll(".modal_size-btn.active")
    .forEach((elem) => elem.classList.remove("active"));
  document
    .querySelectorAll(".modal_add-btn.active")
    .forEach((elem) => elem.classList.remove("active"));
  modalImg.src = item.img;
  modalImg.alt = item.title;
  modalTitle.textContent = item.title;
  modalDescr.textContent = item.description;
  modal.classList.remove("modal-closed");
  body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("modal-closed");
  body.style.overflow = "";
}

tabItemsContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".menu-card");
  if (card) {
    const item = {
      img: card.querySelector("img").src,
      title: card.querySelector(".menu-card_title").textContent,
      description: card.querySelector(".menu-card_descr").textContent,
      //price: card.querySelector('.menu-card_price').textContent,
    };
    openModal(item);
  }
});

modalClose.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modalImg || e.target === modal) {
    closeModal();
  }
});
