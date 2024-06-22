/*  글 작성  */
let textTitle = document.querySelector(".titleContent"); // 제목
let textContet = document.querySelector("#textContent"); // 내용
let submit = document.querySelector(".submit-btn"); // 버튼

// -----------------------------------------------------------------------------------
//  문제점 : 리로드 되면 id 값이 0으로 초기화가 된다.
// 1번 대안: html에 id값 추가 하고, 마지막 post id값을 가져와서 +1를한다.
// => 페이지가 달라서 힘듬? (다른 방안 찾아야함)
/*------------------------------------------------------------------------------------ */
// 2번 대안: 로컬스토리지에서 최근에 들어간 키 값의 id를 가져와 +1를한다.
/* 로컬스토리지에 저장을하면 맨앞에 저장이 된다 *** */
// ==> 로컬스토리지 이상하게? 순서가 섞여서 맨앞에 저장되어도 나중에는 최근 id 값을 불러오지 못함

//  3번 대안 : id값 최대값(최신값)을 가져와 +1를 해준다

// 3대안********************************************************************************

submit.addEventListener("click", function (event) {
  event.preventDefault(); // 폼 제출시 새로고침 방지

  let localStorageItem = Object.keys(localStorage); // 로컬스토리지에 있는 키 값을 가져온다
  let Key = localStorageItem; // 최근 요소 키를 가져온다
  let maxId = 0; // 가장 큰 id(최근 id)값을 넣을 변수

  Key.map((e) => {
    let value = JSON.parse(localStorage.getItem(e)); // 키의 값을 가져온다
    maxId = Math.max(value.id, maxId); // 최근에 들어간 id 값을 찾는다 (id 최대값) {비교}
  });

  localStorage.setItem(
    `post${maxId + 1}`,
    JSON.stringify({
      id: maxId + 1,
      title: textTitle.value,
      content: textContet.value,
    })
  );

  window.location.href = "../index.html";
});

/* 
      개선


      
      내용 자세히 보기 (클릭시 내용 보기(긴글만)) (완)
      내용 글자수 간략화 (완)
      삭제버튼 기능 (완)
      N개 게시물 나오게 하기  (완)
      로컬 스토리지 저장 (완)
      게시물 삭제 버튼 (완)
      게시물 submit 누른 날짜로 표시(완)

  */
