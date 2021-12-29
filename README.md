<img src="/src/assets/imgs/logo_color.png" width="300">
last update : 2021.12.23

# 1. 프로젝트 소개

주식회사 심플라이에서 진행했던 마지막 프로젝트였던 'doingclass' 서비스와 비슷하게 제작한 웹 포트폴리오 입니다.

class101과 같은 성인을 대상으로 한 취미/직무 온라인 교육 플랫폼입니다.

크리에이터 페이지에서 직접 자신의 강의를 게시할 수 있습니다.

vue.js와 firebase를 사용하여 웹 서비스를 운영하고 있습니다.

현재 웹 상에서 창 크기에 맞추어 반응은 할 수 있으나 모바일 기준에 맞춘 반응형으로 제작되어있지 않습니다.

## 1-1. 일반 페이지

- 크리에이터센터를 통해 제작된 클래스들을 볼 수 있으며 강의를 구매하고 학습할 수 있는 페이지로 연결할 수 있도록 한다.
- 클래스 리스트에서 크리에이터 이미지와 이름은 크리에이터가 변경하면 즉시 바뀔 수 있도록 되어있다.

  <img src="/src/assets/imgs/readme/1-1.png" width="600">
  <img src="/src/assets/imgs/readme/1-1-2.png" width="600">

## 1-2. 학습 페이지

- 학습할 클래스를 구매한 뒤 학습을 진행할 수 있는 페이지이다.
- 로그인 후 이용 가능한 서비스이다.
- 마지막으로 들었던 학습페이지의 위치를 자동으로 저장하며 다시 '학습하기'로 이동했을 때 마지막으로 들렀던 페이지로 이동된다.

  <img src="/src/assets/imgs/readme/1-2-2.png" width="600">
  <img src="/src/assets/imgs/readme/1-2.png" width="600">

## 1-3. 크리에이터 센터 페이지

- 계정을 생성한 모든 사용자는 크리에이터센터에서 자신만의 클래스를 오픈할 수 있다.
- 처음 생성시에는 '클래스 기본정보' 부분만 작성하고 저정하며, 이 후 생성된 클래스의 '클래스 관리'에서 세부 정보를 입력할 수 있다.
- '클래스 관리' 안의 '커리큘럼'란에서 커리큘럼을 생성하고 학습 내용을 작성할 수 있다.
- 동영상은 링크를 통한 게시만 할 수 있으며, 'youtube'와 'vimeo'의 링크로만 업로드가 가능하다.
- 동영상링크를 업로드 할 때, 일반 url을 복사할 때와 '공유하기'를 통해 복사된 주소는 링크주소가 다르다. 때문에 주소를 입력하면 주소를 양식에 맞게 변환시켜주는 작업을 자동으로 진행시켜준 뒤 영상을 업로드하게 된다.
- 추가 설정 관리 페이지에서 클래스의 오픈/오프 여부를 정할 수 있으며 기본값으로는 'off'이다.

  <img src="/src/assets/imgs/readme/1-3-1.png" width="600">
  <img src="/src/assets/imgs/readme/1-3-2.png" width="600">

# 2. 작업할 것(2021.12.23 기준 수정할 사항)

## 2-1. header

- 기본상태에서 보이는 헤더 / 학습페이지의 헤더 / 크리에이터 센터의 기본 헤더까지 총 3개의 헤더 종류가 있다.

### default-header

- [ ] doingclass 로고 교체하기
- [ ] 우측 상단의 프로필이미지/이름 눌렀을 때 바로 아래에 플로팅 메뉴가 나타나 '정보수정'과 '로그아웃'이 나타날 수 있게 개선하기

### learningClass-header

- [ ] 우측 상단의 텍스트를 다른 헤더와 동일하게 수정하기
- [x] 좌측 doingclass로고를 누르면 홈 화면으로 돌아갈 수 있도록 수정하기
- [ ] 우측 로고 옆에 바로 이전 페이지로 이동할 수 있는 버튼 생성하기

### creatorCenter-header

- [ ] 좌측의 로고 클릭 시 'creators/myclass'로 돌아갈 수 있도록 수정하기

## 2-1. 메인(index) 페이지

- [ ] NEW & BEST 부분은 AD로 사용되어 사용자가 게시하는것이 아닌, 어드민에서 홍보용으로 올릴 용도로 수정하기

## 2-2. 결제 페이지

- [ ] 결제수단 부분을 클릭했을 때 체크가 되도록하며, 체크된 상태에서 다른 버튼을 누르게되면 기존 체크된 것을 해제할 수 있게 개선하기

## 2-3. 학습 페이지

- [ ] 학습페이지 메인에서 좋아요(하트) 부분을 클릭하면 반응하여 색상과 숫자가 바뀌게 수정하기
- [ ] 현재 결제를 하지 않아도 정확한 주소값을 알 수 있으면 누구나 접속이 가능한 상태이므로 상품을 결제한 사용자만 볼 수 있도록 권한 설정하기

# 프로젝트 설치 / 개발중 발생한 문제점들 (2021.08~2021.11)

- 과거 다른 프레임워크를 사용할 때에는 없었던 문제들이 발생했다.
- vscode를 사용하여 개발을 진행하는데 처음 `vue-cli`를 사용하여 설치를 하면서 설치되는 `eslint`와 `prettier` 등이 vscode에 설치된 익스텐션과 충돌이 났던것 같다.  
  코드 상으로는 아무 문제가 없지만 저장을하면 자동으로 익스텐션의 `eslint`와 `prettier`가 작동하면서 코드를 수정하고, `vue-cli`에서 설치했던 `eslint`에서는 수정된 코드를 오류로 보는 등의 문제가 발생하였다. 현재는 vscode의 `eslint`와 `prettier`의 익스텐션을 `사용안함` 설정하고 제작하고 있다.  
  `eslint`에서 정한 코드의 규칙에 맞춰 일일히 줄을 맞추거나 공백을 제거하거나하는 등의 수정하는 작업이 있어 조금 번거롭다.

### vue-cli 설치

- vue-cli를 설치한 후 프로젝트를 생성하였다.
- 오류를 고치고자 여러번의 생성과 제거를 반복하면서 현재의 프로젝트를 시작했다.

### scss 사용

- css만으로 작성하다 처음으로 scss를 사용하여 scss를 효율적으로 사용하지 못할 수 있다.
- scss를 설치하고 사용할 때 생각보다 고생을 했다. vue-cli 버전에 따라 어떤 로더를 설치해야 하는지 달랐으며, eslint와 충돌하는 등의 문제를 겪었었다.

## 프로젝트 개발

### index(Home)페이지

- 기존 doingclass의 페이지 성격을 유지

- 기존 doingclass사이트에서는 이미지안에 크리에이터 프로필사진/이름이 박혀 있지만 이 사이트에서는 이미지와 프로필내용이 분리되어 있어 프로필이미지와 이름이 변경되면 한번에 바뀌게 된다.
  프로필부분의 배경은 `gradient`와 `opacity`를 모두 주어 배경 이미지가 밝더라도 흰 텍스트가 보일 수 있도록 하였다.

#### 진행사항

- [x] `vue-owl-carousel`을 사용하여 캐러셀 기능 구현
- [x] 메뉴 좌측의 햄버거 아이콘을 통한 `drawer bar` 추가

### detail 페이지

- 리스트에서 타겟을 클릭하면 타겟의 세부 정보를 보여주는 상세페이지이다.

- 상단의 4개의 배너 이미지는 `grid`를 사용하여 제작했다.
  `grid-template-areas`를 사용하여 직관적으로 그리드의 형태를 확인할 수 있도록 하였다.

```
display: grid;
grid-template-columns: 50% 25% 25%;
grid-template-rows: 350px 350px;
grid-template-areas:
    "left right right"
    "left right1 right2";
```

- 리스트를 나열할때와는 다르게 타겟의 id에 해당되는 세부 데이터만을 보여줘야 하므로 `OnlineClass[$route.params.id - 1]`를 매번 붙여주면서 사용을 했으나 추 후 가독성이 좋지 않아보여 `comupted` 에서 `class_detail` 함수를 만들어 사용했다.

- `side-contant`의 일정 높이부터 플로팅되는 아주 단순한 동작을 구현하는데 생각보다 오랜 시간이 걸렸다.  
  단순히 현재 스크롤의 높이를 구하고 그 높이가 일정 높이값(Pc기준 690px)부터 `side-contant`의 스타일에 `position: fixed;`가 적용되면 되고 그 이전 값에는 적용되지 않게 하면 되면 되는 것이고 그에 맞춰 제작을 했지만 아무리 해봐도 실행이 되지 않는 것이다.  
  javascript와 vue의 라이프사이클에 대한 이해가 부족하여 무작정 `methods`에서만 코드를 작성하면서 실행이 되지 않았던 것이었다.  
  계속된 구글링을 통해 `methods`에서 작성한 이벤트를 `mounted`에서 스크롤이 발생할때마다 해당 이벤트를 불러오는 방식을 사용하여 해결할 수 있었다.

### 로그인 / 로그아웃 기능

처음 로그인/로그아웃 기능을 추가하려할 때 `json-server` 를 사용하여 로그인/로그아웃을 구현하여 시도했지만, 생각보다 프론트엔드단에서 해당 기능을 원하는 정도로 구현이 어려우며 `express`와 같은 백엔드에서의 처리가 없으면 세션 체크, 리프레쉬 등의 작업을 하기가 어려워 아예 백엔드 부분의 처리를 대신 해줄 수 있는 `firebase`를 사용하게 되었다.

추 후 `firebase`에서 제공하는 데이터베이스와 스토리지 서비스까지 사용하여 정상적인 웹으로서의 기능을 할 수 있는 사이트를 제작하였다.

#### 목표

- firebase와 연동하여 회원가입/로그인/로그아웃 기능을 추가

#### 설치

- axios
- firebase v9.0 설치 -> firebase v8 로 다운그레이드

#### 2021.09.23 firebase 호스팅 시작

- `npm install -g firebase-tools`로 파이어베이스 툴 전역 다운
- 파이어베이스 로그인과 `firebase init`으로 앱 루트 디렉토리 설정

#### 진행사항

- [x] 이메일 주소를 통한 회원가입과 로그인 기능 추가

- [x] 회원가입/로그인 과정에서 일반적인 오류를 한글로 된 알람창으로 나타내주고 해당 input으로 이동

- [x] input에서 엔터 클릭 시 로그인/회원가입 버튼 이벤트 실행

- [x] 로그인 시 Header의 로그인/회원가입 부분을 로그아웃으로 변경되게

- [x] header의 로그인 / 회원정보 부분이 페이지가 이동하면 firebase에 불러오는 시간때문에 잠시 로그인 / 회원가입 창이 보이는 현상 수정

- [ ] 비밀번호 찾기 기능 추가

- [x] 페이지에서 로그인 후 홈 화면으로 이동하기

# 프로젝트 명령

## 프로젝트 셋업

```
npm install
```

### 프로젝트 클라이언트 실행

```
// 클라이어트 실행
npm run serve
```

### 웹 호스팅 전 빌드

```
npm run build
```

### 파이어베이스 웹 게시

```
firebase deploy
```
