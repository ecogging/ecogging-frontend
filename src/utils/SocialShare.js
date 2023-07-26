export function shareTwitter() {
    var sendText = "ecogging"; // 전달할 텍스트
    var sendUrl = window.location.href; // 전달할 URL
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
  }
  
  export function shareFacebook() {
    var sendUrl = window.location.href; // 전달할 URL
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
  }

  export function shareKakao() {
    // 웹 페이지에서 사용할 카카오 링크 관련 정보
    const title = "ecogging";
    const description = "ecogging 사이트 입니다.";
    const imageUrl = "";
    const linkUrl = window.location.href; // 링크로 이동할 URL
  
    // 카카오링크 생성
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
      kakao.init("3c8f2a4dd2f2e190929b9732208cb4af"); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
    }
      kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: title,
          description: description,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: linkUrl,
            webUrl: linkUrl,
          },
        },
        buttons: [
          {
            title: "에코깅 웹으로 이동", // 버튼에 보여질 텍스트
            link: {
              mobileWebUrl: linkUrl,
              webUrl: linkUrl,
            },
          },
        ],
      });
    }
  }