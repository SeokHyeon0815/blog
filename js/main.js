// 로컬 스토리지에 저장된 데이터 가져와서 출력

let post_warp = document.querySelector(".post-wrap"); // post 영역

/* 한국 시간으로 날짜 정하기 ************************************************ */
let toDate = new Date(); // 날짜
// 한국 표준시로 변환하기위해 utc시간을 오프셋을 적용
let koreaOffset = 9 * 60; // 한국 표준시는 utc+9시간이므로 분다위로 변환 한다
let localOffset = toDate.getTimezoneOffset(); // 로컬시간과 utc시간의 차이를 분단위로 반환
let offsetDiff = koreaOffset - localOffset; // 한국시간과 로컬시간 간의 차이를 구함

let koreaTime = new Date(toDate.getTime() + offsetDiff * 60 * 1000);
// getTime을 이용해 utc 기준의 밀리초 단위 타임스탬프 반환
// offsetDiff * 60 * 1000 를 밀리초 단위로 변환 후 더한다.
/* ************************************************************************ */

let letter = []; // 제목, 내용 담을 배열

let localStorageItem = Object.keys(localStorage); // 로컬스토리지에 있는 키 값을 가져온다
localStorageItem.sort(); // 순서대로 정렬
localStorageItem.reverse(); // 최신순이 위로 오게 정렬

// 키와 값 모두 letter 배열에 담는다
localStorageItem.map((e) => {
  let getPost = localStorage.getItem(e);
  letter.push(JSON.parse(getPost));
  /*JSON.parse => JSON문자열을 js 객체로 변환하는 메소드 */
}); //localStorageItem.map --- End

// 배열값 모두 넣어 출력
/* DOMContentLoaded =>  html문서가 완전히 로드되면 이벤트 발생 */
// map 메서드는 보통 배열의 각 요소를 변환하여 새로운 배열을 생성하는데 사용됩니다
document.addEventListener("DOMContentLoaded", function () {
  letter.map((e) => {
    // 길이가 긴 내용은 짤라서 표시
    let content =
      e.content.length >= 30 ? e.content.substring(0, 30) + "..." : e.content;
    //  post 영역에 삽입  (제목, 날짜, 내용)
    post_warp.innerHTML += `<div class="post ${e.id}">
      <h3 class="post-title">${e.title}</h3>
      <p class="post-date">${koreaTime.getFullYear()}년 ${
      koreaTime.getMonth() + 1
    }월 ${koreaTime.getDate()}일</p>
      <p class="post-text">
        ${content}
      </p>
      <button class="delete_btn" data_id = ${e.id}>삭제하기</button>
    </div>`;
  }); // letter.map --- End

  // 삭제 버튼 기능 구현-------------------------------------------
  // 동적으로 html를 생성했기에 DOMContentLoaded 안에 넣어서 실행한다
  /* 1. 로컬스토리지에 있는 아이템 삭제
     2. letter 배열에서 삭제
  */
  // forEach는 배열의 각 요소에 대해 한 번씩 주어진 함수를 실행하는 메서드

  letter.forEach((e) => {
    //  각 포스터를 뽑는다
    let post = document.getElementsByClassName(`post ${e.id}`);
    // 각 삭제버튼을 가져온다
    let deleteBtn = post[0].querySelectorAll(".delete_btn");

    // 삭제 버튼 클릭시 해당 포스트 삭제
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        let check = confirm("삭제 하시겟습니까?");
        if (check) {
          // 1. 로컬스토리지 아이템 삭제
          localStorage.removeItem(`post${e.id}`);

          // 2. 배열삭제
          // 해당 삭제버튼 id를 가져온다.
          /* 클릭한 해당 id와 일치 않은 값만 남겨두고 배열을 다시 반환한다
           ex) 3번째 클릭시 => 3번째 빼고 나머지 배열에 넣어서 다시 반환*/
          let dataId = btn.getAttribute("data_id");
          letter = letter.filter((e) => e.id !== parseInt(dataId));

          // 3. 해당 포스터를 뽑아서 화면에서 바로 삭제
          // 임시방면으로 새로고침하여 화면에서 포스트 제거
          // location.reload(true);
          //HTMLCollection 이라서 첫번째 요소 가져와야함.
          post[0].remove();
        } // if --- End
      }); // btn.click --- End
    }); //deleteBtn ---

    /* 내용 보기 ---------------------------------------------------------- */
    let postCheckFlag = false;
    post[0].addEventListener("click", function () {
      if (!postCheckFlag) {
        post[0].classList.toggle("postClick");
        postCheckFlag = true;
      } else {
        post[0].classList.remove("postClick");
        postCheckFlag = false;
      }
      // 클릭한지 확인
      let includePostClick = post[0].classList.contains("postClick");
      // post 내용 불러오기
      let postContent = post[0].querySelector(".post-text");

      // 클릭한지 확인한 후  => 클릭이 되었을시 => content 다보여주기
      if (includePostClick) {
        postContent.innerHTML = e.content;
      } else {
        postContent.innerHTML = e.content.substring(0, 30) + "...";
      }
    }); // postClick.addEventListener ---End
  }); // letter.forEach --- End
}); // addEnvetListener DOM--- End
