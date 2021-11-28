# React
## 컴포넌트 정의

### FunctionComponent.tsx

```ts
type Props = {
  ...
}

function FunctionComponent({ ... }: Props) {
  ...
}

export default FunctionComponent
```

위와 같이 CRA 템플릿에 있는 방식으로 컴포넌트를 정의한다.

클래스 컴포넌트의 사용은 지양한다. 클래스 컴포넌트는 함수 컴포넌트에서 지원하지 않는 일부 컴포넌트 생명주기 함수를 사용하기 위해서 사용한다.

React 17에선 번들 사이즈 최적화를 위해 컴포넌트를 정의할 때 `import React from 'react'`문을 넣지 않는 것을 권장한다.

컴포넌트 props의 자료형은 `PropTypes`로 정의하거나 TypeScript로 정의할 수 있다. TypeScript는 자료형을 정적으로 검사하지만, PropTypes는 동적으로 검사한다는 차이가 있다. 근데 TypeScript가 자동으로 `PropTypes` 코드를 생성한다고 하니 TypeScript만 사용해도 문제없다. 그리고 동적 자료형 검사는 실행 시 약간의 오버헤드가 생긴다.

컴포넌트 props의 기본값을 정의할 땐 defaultProps 대신 ES6의 매개변수 기본값을 사용한다. 그리고 defautProps는 나중에 deprecated될 예정이라고 한다.

```ts
type Props = {
  prop1: number | undefined
  prop2?: number
}
```

prop1은 컴포넌트에 명시적으로 전달해야 하지만 number 또는 undefined 일 수 있는 값이고, prop2는 전달하지 않아도 되는 number형 데이터다. 이 props가 컴포넌트 내부에서 매개변수로 활용될 때의 자료형은 둘 다 number | undefined로 동일하다.

## 메모이제이션
컴포넌트 props로 넘겨주는 값은 `useMemo()`를 통해, 함수는 `useCallback()`를 통해 메모이제이션하는 것을 권장한다. 만약 props를 받는 컴포넌트가 `memo()`로 감싸진 컴포넌트(순수 컴포넌트)면 무조건 메모이제이션을 해야 한다.

## 이벤트 핸들러 네이밍
```js
import { MouseEvent as ReactMouseEvent, useCallback, useState } from 'react'

function FunctionComponent() {
  const [searchTerm, setSearchTerm] = useState('')

  // 이벤트 핸들러 함수
  const handleClickSearchButton = useCallback(
    (e: ReactMouseEvent<HTMLElement, MouseEvent>) => {
      ...
    },
    [...]
  })

  const handleChangeSearchTerm = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    },
    [],
  ) 

  // 이벤트 핸들러 prop
  return (
    <>
      <SearchInput searchTerm={searchTerm} onChange={handleChangeSearchTerm} />
      <SearchButton onClick={handleClickSearchButton} />
    </>
  )
}

export default FunctionComponent
```

이벤트 핸들러를 받는 prop 이름은 `on___`으로 짓고, 이벤트 함수 이름은 `handle___`로 짓는다.

## Custom Hook 정의

### use___.ts
```ts
type Options = {
  ...
}

function use___({ ... }: Options) {
  ...
}

export default use___
```
Custom Hook의 이름은 `use___`로 지정한다. Custom Hook 안에선 JSX 사용을 지양하고, 다른 React Hook이나 JavaScript 로직 위주로 작성한다.

(type 이름은 논의 필요)

## 상태 관리
웬만하면 전역 상태 대신 지역 상태로 처리하는 것을 권장한다. 이유는 다른 언어에서 전역 변수 대신 지역 변수 사용을 권장하는 것과 비슷하다. 전역 상태를 사용하려면 React Context API를 사용한다.

한 상태를 여러 컴포넌트가 공유해야 할 땐 상태 관리 로직을 공통된 상위 컴포넌트로 올리는 것을 권장한다.

