window.onload = () => {
  // 헤더 연결 (각페이지에 연결할수 있게)
  let header = document.querySelector(".header");

  fetch("../common/header.html", { mode: "cors" })
    .then((res) => res.text())
    .then((data) => {
      header.innerHTML = data;
    })
    .catch((error) => console.error("Error", error)); // 에러시
};
