<img src="/src/assets/imgs/logo_color.png" width="300">

## 프로젝트 셋업

```
npm install
```

### Compiles and hot-reloads for development

```
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
- 초기의 오류를 고자 여러번의 생성과 제거를 반복하면서 초기 설정을 어떻게 잡고 프로젝트를 생성했는지 기억이 나지 않는다.
### scss 사용
- css만으로 작성하다 처음으로 scss를 사용하여 scss를 효율적으로 사용하지 못할 수 있다.
- scss를 설치하고 사용할 때 생각보다 많은 고생을 했다. vue-cli 버전에 따라 어떤 로더를 설치하는지 달라졌으며, eslint와 충돌하는 등의 문제를 겪었었다.


## 프로젝트 개발

### index(Home)페이지
- 기존 doingclass의 페이지 성격을 유지

- `assets/onlineclass.js`에 온라인클래스의 DB에 속하는 데이터 입력 후 받아와 리스트로 보여준다.

### detail 페이지
- 리스트에서 타겟을 클릭하면 타겟의 세부 정보를 보여주는 상세페이지이다.

- 리스트를 나열할때와는 다르게 타겟의 id에 해당되는 세부 데이터만을 보여줘야 하므로 `OnlineClass[$route.params.id - 1]`를 매번 붙여주면서 사용을 했으나 추 후 가독성이 좋지 않아보여 `comupted` 에서 `class_detail` 함수를 만들어 사용했다.

- `side-contant`의 일정 높이부터 플로팅되는 아주 단순한 동작을 구현하는데 생각보다 오랜 시간이 걸렸다.  
단순히 현재 스크롤의 높이를 구하고 그 높이가 일정 높이값(Pc기준 690px)부터 `side-contant`의 스타일에 `position: fixed;`가 적용되면 되고 그 이전 값에는 적용되지 않게 하면 되면 되는 것이고 그에 맞춰 제작을 했지만 아무리 해봐도 실행이 되지 않는 것이다.  
javascript와 vue의 라이프사이클에 대한 이해가 부족하여 무작정 `methods`에서만 코드를 작성하면서 실행이 되지 않았던 것이었다.  
계속된 구글링을 통해 `methods`에서 작성한 이벤트를 `mounted`에서 스크롤이 발생할때마다 해당 이벤트를 불러오는 방식을 사용하여 해결할 수 있었다.  
