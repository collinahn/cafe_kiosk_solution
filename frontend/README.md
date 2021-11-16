# 코딩 컨벤션

## 공통

쓰나 안 쓰나 결과에 영향을 미치지 않는 코드는 최대한 제거한다. 작성된 코드엔 항상 작성된 이유가 있는 것이 좋다.

## JavaScript

### 주석

짧은 1줄 주석(`// ...`)은 가능하면 변수, 함수 등의 이름에 반영하는 것을 권장한다.
다른 사람의 이해를 돕기 위해 주석을 다는 것을 권장한다.
주석엔 복잡한 로직에 대한 설명 등을 담을 수 있다.

### 네이밍

* `PascalCase`: type, interface, React component(function, class)
* `camelCase`: variable(const, let), JavaScript function, custom hook, props
* `UPPER_SNAKE_CASE`: tuple(`as const` 등)
* 어떤 값으로부터 다른 값을 계산하는 함수: `get___From(...)
  * ex. `getTodayFrom(date, index)`

### 중괄호

```js
if ( ) {
  ...
} else if ( ) {
  ...
} else {
  ...
}

function functionName() {
  ...
}
```

원활한 수정을 위해 `for, if, function` 등에서 중괄호는 생략하지 않는다.

### import
`import ... from ...` 문의 순서는 신경쓰지 않는다. (vscode '빠른 수정' 기본값은 패키지 이름 기준 ABC순)

