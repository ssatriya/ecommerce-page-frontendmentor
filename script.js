"use strict";
const productQuantityParent = document.querySelector(".product__quantity");
const cartBtn = document.querySelector(".cart__icon");
const cartParent = document.querySelector(".cart");
const addToCardBtn = document.querySelector(".add__to__cart");

const states = {
  quantity: 0,
  order: {},
};

const markup1 = function (qt) {
  return /* HTML */ `
    <button class="quantity__icon" data-qt="${states.quantity - 1}">
      <img src="./images/icon-minus.svg" alt="Minus icon" />
    </button>
    <div class="quantity"><div class="qnumber">${states.quantity}</div></div>
    <button class="quantity__icon" data-qt="${states.quantity + 1}">
      <img src="./images/icon-plus.svg" alt="Plus icon" />
    </button>
  `;
};

window.addEventListener("load", function () {
  productQuantityParent.innerHTML = "";
  const markup = markup1();
  productQuantityParent.insertAdjacentHTML("afterbegin", markup);
});

productQuantityParent.addEventListener("click", function (e) {
  const btn = e.target.closest(".quantity__icon");
  if (!btn) return;

  const qt = +btn.dataset.qt;
  //   console.log(qt);
  states.quantity = qt;

  if (qt < 0) return;
  const markup = markup1(states.qt);
  productQuantityParent.innerHTML = "";
  productQuantityParent.insertAdjacentHTML("afterbegin", markup);
});

const markupCart = function (data) {
  return /* HTML */ `
    <div class="cart__title">Cart</div>
    <div class="cart__line"></div>
    <div class="cart__main">
      <div class="cart__content">
        <img
          src="./images/image-product-1-thumbnail.jpg"
          alt="Thumbnail 1"
          class="cart__img"
        />
        <div class="cart__info">
          <div class="cart__product__title">${data.product}</div>
          <div class="cart__product__price">
            $${data.price}.00 x ${data.quantity}
            <span class="price__bold">$${data.totalPrice}.00</span>
          </div>
        </div>
      </div>
      <div class="cart__delete">
        <img src="./images/icon-delete.svg" alt="Cart delete" />
      </div>
    </div>
    <button class="checkout">Checkout</button>
  `;
};

cartBtn.addEventListener("click", function (e) {
  const cartContainer = document.querySelector(".cart");
  cartContainer.classList.toggle("hidden");
  const markup = markupCart(states.order);
  cartParent.innerHTML = "";
  cartParent.insertAdjacentHTML("beforeend", markup);
});

const orderQt = document.querySelector(".order__qt");
const numberOrder = document.querySelector(".qt__number");

addToCardBtn.addEventListener("click", function () {
  if (!states.quantity) return;

  const price = 125.0;
  const order = {
    product: "Fall Limited Edition Sneakers",
    price: price,
    quantity: states.quantity,
    totalPrice: +states.quantity * price,
  };
  states.order = order;

  orderQt.classList.remove("hidden");
  numberOrder.innerHTML = "";
  numberOrder.innerHTML = states.order.quantity;
});

// ==============================================================================

const photoParent = document.querySelector(".product__photos");
const mainPhoto = document.querySelector(".photo__big");
const mainThumbOverlay = document.querySelectorAll(".thumb__overlay");

let curImg = 1;
let maxImg = 4;

// Change the main image with thumbnail click
photoParent.addEventListener("click", function (e) {
  const thumbnail = e.target.closest(".photo__small");
  if (!thumbnail) return;

  const dataThumb = +thumbnail.dataset.thumb;

  curImg = dataThumb;
  mainPhoto.src = `./images/image-product-${dataThumb}.jpg`;

  mainThumbOverlay.forEach((ps) => ps.classList.remove("active"));
  document
    .querySelector(`.thumb-${curImg}`)
    .querySelector(".thumb__overlay")
    .classList.add("active");
});

const overlay = document.querySelector(".overlay");
const mainImgLightbox = document.querySelector(".main__lightbox");
const lightboxOverlay = document.querySelectorAll(".light__overlay");

// Click main photo an open a lightbox
mainPhoto.addEventListener("click", function (e) {
  const curMainImg = e.target.src;
  if (!curMainImg) return;
  mainImgLightbox.src = curMainImg;

  console.log(curImg);

  lightboxOverlay.forEach((lo) => lo.classList.remove("active"));
  document
    .querySelector(`.light-${curImg}`)
    .querySelector(".light__overlay")
    .classList.add("active");
  overlay.classList.toggle("hidden");
});

overlay.addEventListener("click", function (e) {
  if (!e.target.classList.contains("overlay")) return;
  overlay.classList.toggle("hidden");
});

// Lightbox

const lightboxParent = document.querySelector(".lightbox");

lightboxParent.addEventListener("click", function (e) {
  const currThumbLightbox = e.target.closest(".thumb__lightbox");
  if (!currThumbLightbox) return;

  const dataThumb = +currThumbLightbox.dataset.thumb;

  curImg = dataThumb;

  mainImgLightbox.src = `./images/image-product-${dataThumb}.jpg`;

  lightboxOverlay.forEach((lo) => lo.classList.remove("active"));
  document
    .querySelector(`.light-${dataThumb}`)
    .querySelector(".light__overlay")
    .classList.add("active");
});

// Lightbox button
const lightboxMain = document.querySelector(".lightbox__main");

lightboxMain.addEventListener("click", function (e) {
  const btn = e.target.closest(".lightbox__btn");
  if (!btn) return;

  if (btn.classList.contains("btn-next") && curImg < 4) {
    ++curImg;
    mainImgLightbox.src = `./images/image-product-${curImg}.jpg`;

    lightboxOverlay.forEach((lo) => lo.classList.remove("active"));

    document
      .querySelector(`.light-${curImg}`)
      .querySelector(".light__overlay")
      .classList.add("active");
  }

  if (btn.classList.contains("btn-prev") && curImg > 1) {
    --curImg;
    mainImgLightbox.src = `./images/image-product-${curImg}.jpg`;

    lightboxOverlay.forEach((lo) => lo.classList.remove("active"));

    document
      .querySelector(`.light-${curImg}`)
      .querySelector(".light__overlay")
      .classList.add("active");
  }
});
