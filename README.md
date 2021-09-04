# doing

## Project setup

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


### 프로젝트 설치

## vue-cli 설치

## scss 사용


### 프로젝트 개발

## index(Home)페이지
- 기존 doingclass의 페이지 성격을 유지
- assets/onlineclass.js에 온라인클래스의 DB에 속하는 데이터 입력 후 받아와 리스트로 보여줌

## detail 페이지
- 리스트에서 타겟을 클릭하면 타겟의 세부 정보를 보여주는 상세페이지이다.

- 리스트를 나열할때와는 다르게 타겟의 id에 해당되는 세부 데이터만을 보여줘야 하므로 `OnlineClass[$route.params.id - 1]`를 매번 붙여주면서 사용을 했다.
추 후 가독성이 좋지 않아보여 `comupted` 에서 `class_detail` 함수를 만들어 사용했다.

- `side-container`의 일정 높이부터 플로팅되는 컨텐츠를 구현하는데 생각보다 오랜 시간이 걸렸다.
javascript와 vue의 라이프사이클에 대한 이해가 부족하여 무작정 `methods`에서만 코드를 작성하면서 실행이 되지 않아 애를 많이 먹었다.
계속된 구글링을 통해 `methods`에서 작성한 이벤트를 `mounted`에서 스크롤이 발생할때마다 해당 이벤트를 불러오는 방식을 사용하여 해결할 수 있었다.
