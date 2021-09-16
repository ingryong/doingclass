<img src="/src/assets/imgs/logo_color.png" width="300">

## 프로젝트 셋업

```
npm install
```

### 프로젝트 클라이언트 실행

```
// 클라이어트 실행
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).


## 프로젝트 설치
- 과거 다른 프레임워크를 사용할 때에는 없었던 문제들이 발생했다.
- vscode를 사용하여 개발을 진행하는데 처음 `vue-cli`를 사용하여 설치를 하면서 설치되는 `eslint`와 `prettier` 등이 vscode에 설치된 익스텐션과 충돌이 났던것 같다.  
코드 상으로는 아무 문제가 없지만 저장을하면 자동으로 익스텐션의 `eslint`와 `prettier`가 작동하면서 코드를 수정하고, `vue-cli`에서 설치했던 `eslint`에서는 수정된 코드를 오류로 보는 등의 문제가 발생하였다. 현재는 vscode의 `eslint`와 `prettier`의 익스텐션을 `사용안함` 설정하고 제작하고 있다.  
`eslint`에서 정한 코드의 규칙에 맞춰 일일히 줄을 맞추거나 공백을 제거하거나하는 등의 수정하는 작업이 있어 조금 번거롭다. 
### vue-cli 설치
- vue-cli를 설치한 후 프로젝트를 생성하였다.
- 오류를 고치고자 여러번의 생성과 제거를 반복하면서 현재 프로젝트의 초기 설정을 어떻게 잡고 프로젝트를 생성했는지 기억이 나지 않는다.
### scss 사용
- css만으로 작성하다 처음으로 scss를 사용하여 scss를 효율적으로 사용하지 못할 수 있다.
- scss를 설치하고 사용할 때 생각보다 많은 고생을 했다. vue-cli 버전에 따라 어떤 로더를 설치하는지 달라졌으며, eslint와 충돌하는 등의 문제를 겪었었다.


## 프로젝트 개발

### index(Home)페이지
- 기존 doingclass의 페이지 성격을 유지

- `vue-owl-carousel`을 사용하여 캐러셀 기능 구현

- `assets/onlineclass.js`에 온라인클래스의 DB에 속하는 데이터 입력 후 받아와 리스트로 보여준다.

- 기존 doingclass사이트에서는 이미지안에 크리에이터 프로필사진/이름이 박혀 있지만 이 사이트에서는 이미지와 프로필내용이 분리되어 있어 프로필이미지와 이름이 변경되면 한번에 바뀌게 된다.
프로필부분의 배경은 `gradient`와 `opacity`를 모두 주어 배경 이미지가 밝더라도 흰 텍스트가 보일 수 있도록 하였다.

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

추 후 `firebase`에서 제공하는 데이터베이스와 스토리지 서비스까지 사용하여 정상적인 웹으로서의 기능을 할 수 있는 사이트를 제작할 예정이다.

#### 목표
- firebase와 연동하여 회원가입/로그인/로그아웃 기능을 추가

#### 설치
- axios
- firebase v9.0 설치

#### 진행사항
- [x] 이메일 주소를 통한 회원가입과 로그인 기능 추가

- [x] 회원가입/로그인 과정에서 일반적인 오류를 한글로 된 알람창으로 나타내주고 해당 input으로 이동

- [x] input에서 엔터 클릭 시 로그인/회원가입 버튼 이벤트 실행

- [ ] 로그인 시 Header의 로그인/회원가입 부분을 로그아웃으로 변경되게

- [ ] 비밀번호 찾기 기능 추가

- [ ] 페이지에서 로그인 후 원래 있던 페이지로 이동하기