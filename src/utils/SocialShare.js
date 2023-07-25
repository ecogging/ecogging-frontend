export function shareTwitter() {
    var sendText = "ecogging"; // 전달할 텍스트
    var sendUrl = "https://www.notion.so/FINAL-de916ba96b8341b2a11e0a20819c704f"; // 전달할 URL
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
  }
  
  export function shareFacebook() {
    var sendUrl = "https://www.notion.so/FINAL-de916ba96b8341b2a11e0a20819c704f"; // 전달할 URL
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
  }
  
  export function shareKakao() {
    // 웹 페이지에서 사용할 카카오 링크 관련 정보
    const title = "ecogging";
    const description = "ecogging 사이트 입니다.";
    const imageUrl = "https://www.notion.so/FINAL-de916ba96b8341b2a11e0a20819c704f";
    const linkUrl = "https://www.notion.so/FINAL-de916ba96b8341b2a11e0a20819c704f"; // 링크로 이동할 URL
  
    // 카카오링크 생성
    if (window.Kakao) {
      window.Kakao.Link.sendDefault({
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
            title: "웹으로 이동", // 버튼에 보여질 텍스트
            link: {
              mobileWebUrl: linkUrl,
              webUrl: linkUrl,
            },
          },
        ],
      });
    }
  }