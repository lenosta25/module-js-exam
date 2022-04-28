const swiper = new Swiper(".main__swiper", {
  touchRatio: 2,
  grabCursor: true,
  slidesPerView: 1,
  spaceBetween: 30,
  slideToClickedSlide: true,
  keyboard: {
    enabled: true,
  },
});

const navBtn = document.querySelector(".nav-btn");
const mobileNav = document.querySelector(".mobile-nav");
navBtn.addEventListener("click", function () {
  mobileNav.classList.toggle("mobile-nav-active");
  navBtn.classList.toggle("nav-btn-close");
});
const form = document.forms["form"];
const formArr = Array.from(form);
const validFormArr = [];
const button = form.elements["comment-add"];

formArr.forEach((el) => {
  if (el.hasAttribute("data-reg")) {
    el.setAttribute("is-valid", "0");
    validFormArr.push(el);
  }
});

form.addEventListener("input", inputHandler);
button.addEventListener("click", buttonHandler);

function inputHandler({ target }) {
  if (target.hasAttribute("data-reg")) {
    inputCheck(target);
  }
}
function inputCheck(el) {
  const inputValue = el.value;
  const inputReg = el.getAttribute("data-reg");
  const reg = new RegExp(inputReg);
  if (reg.test(inputValue)) {
    el.setAttribute("is-valid", "1");
    el.style.border = "2px solid rgb(0, 196, 0)";
  } else {
    el.setAttribute("is-valid", "0");
    el.style.border = "2px solid var(--color-error)";
  }
}
function buttonHandler(e) {
  const allValid = [];
  validFormArr.forEach((el) => {
    allValid.push(el.getAttribute("is-valid"));
  });
  const isAllValid = allValid.reduce((acc, current) => {
    return acc && current;
  });

  if (!Boolean(Number(isAllValid))) {
    e.preventDefault();
  }
}

let comments = [];
loadComments();
document.getElementById("comment-add").onclick = function () {
  event.preventDefault();
  let formName = document.getElementById("form-name");
  let formWebsite = document.getElementById("form-website");
  let commentBody = document.getElementById("body-comment");
  let comment = {
    name: formName.value,
    website: formWebsite.value,
    body: commentBody.value,
    time: Math.floor(Date.now() / 1000),
  };
  formName.value = "";
  formWebsite.value = "";
  commentBody.value = "";
  comments.push(comment);
  saveComments();
  showComments();
};
function saveComments() {
  localStorage.setItem("comments", JSON.stringify(comments));
}
function loadComments() {
  if (localStorage.getItem("comments"))
    comments = JSON.parse(localStorage.getItem("comments"));
  showComments();
}
function showComments() {
  let commentField = document.getElementById("comment-field");
  let out = "";
  comments.forEach(function (item) {
    out += `<div class = "comment">
      <div class = "comment__card">
        <div class = "comment__card-img"> 
          <img src="/img/boy.png" alt="boy">
        </div>
        <div class = "comment__card-body">
          <div class = "body-title">
            <div class = "body-title__info">
              <p style="font-size:19px; color: var(--primary-text-color)">${
                item.name
              } ${timeConverter(item.time)}</p>
            </div>
            <div class = "body-title__editor">
              <img src="/img/edit.svg" alt="edit">
              <img src="/img/urn.svg" alt="urn">
            </div>
          </div>
          <div class="body-answer">
            <p style="max-height: 94px;  word-break: break-all; line-height: 32px; font-size:16px;">${
              item.body
            }</p>
          </div>
          <div class="body-footer">
            <div class="body-footer__reply"> 
              <img src="/img/arrow.svg" alt="arrow">
              <p class="reply-text">Reply</p>
            </div>
            <div class="body-footer__reaction"> 
              <img src="/img/like.svg" alt="like">
              <img src="/img/dislike.svg" alt="dislike">
            </div>
          </div>
        </div>
        <img  class="comment__card-heart" src="/img/gray_heart.svg" alt="heart">
      </div>
    </div>
    <hr class="comment__horizontal-line first-comments"/>`;
  });
  commentField.innerHTML = out;
}
function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let months = [
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
    "Dec",
  ];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time = date + " " + month + " " + hour + ":" + min;
  return time;
}
