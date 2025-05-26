// ********************* 1강 문제 **************************
// 1번문제 
let userName:string; // 예: 이름
let userAge:number; // 예: 나이
let isAdmin:boolean; // 예: 관리자 여부

userName = "Alice";
userAge = 25;
isAdmin = true;

console.log(userName, userAge, isAdmin);

// 2번문제
// 변수 선언과 초기값 지정
let productName:string = "반팔"; // 상품 이름
let productPrice:number = 30000; // 상품 가격
let isAvailable:boolean = true; // 상품 재고 여부

// 예시 출력
console.log(`상품명: ${productName}, 가격: ${productPrice}, 재고 여부: ${isAvailable}`);

// 3번문제
function addNumbers(a:number, b:number):number {
    return a + b;
}

console.log(addNumbers(5, 3)); 


// 4번문제
function stringifyValue(value:string|null|undefined) {
    // 여기에 구현
    if (value === null || value === undefined) {
        return "값이 없습니다";
    }
    return value;
}

// 함수 호출
console.log(stringifyValue("Hello")); // "Hello"
console.log(stringifyValue(null)); // "값이 없습니다"
console.log(stringifyValue(undefined)); // "값이 없습니다"

// 5번문제
function compareValues(a: unknown, b: unknown): string {
  if (a === b) {
    return "엄격한 동등성";
  } else if (a == b) {
    return "느슨한 동등성";
  } else {
    return "동등하지 않음";
  }
}

// 함수 호출 예시
console.log(compareValues(5, "5")); // 느슨한 동등성
console.log(compareValues(null, undefined)); // 느슨한 동등성
console.log(compareValues(false, 0)); // 느슨한 동등성
console.log(compareValues(NaN, NaN)); // 동등하지 않음
console.log(compareValues(42, 42)); // 엄격한 동등성

// 6번문제
function isPrimitive(value: unknown): boolean {
    // 여기에 구현
    return value === null || (value !== Object(value));
}

// 함수 호출 예시
console.log(isPrimitive("Hello")); // true
console.log(isPrimitive(42)); // true
console.log(isPrimitive(false)); // true
console.log(isPrimitive(null)); // true
console.log(isPrimitive(undefined)); // true
console.log(isPrimitive({})); // false
console.log(isPrimitive([])); // false


// ********************* 2강 문제 **************************
// 1번문제
let user: { name: string; age?: number; isAdmin: boolean } = {
  name: "Alice",
  isAdmin: true,
};

user={
  name: "Bob",
  age:40,
  isAdmin: false,
}

// 2번문제
// 숫자만 담을 수 있는 읽기 전용 배열을 작성하세요.
const numbers: readonly number[] = [1, 2, 3];

// 아래 코드는 오류가 발생해야 합니다.
// numbers.push(4);
// numbers[0] = 42;

// 3번문제
const products: [string, number, boolean][] = [
  ["Laptop", 1000, true],
  ["Shoes", 50, false],
  ["Book", 20, true],
];

// 1. 상품 이름과 가격만 반환,리턴타입 정의필요 
function getProductNamesAndPrices(
    products: [string, number, boolean][]
) {
    // 여기에 구현
    return products.map(([name, price]) => [name, price]);
}

// 2. 재고가 있는 상품만 반환,리턴타입 정의필요 
function getAvailableProducts(
    products: [string, number, boolean][]
) {
    // 여기에 구현
    return products.filter(([name, price, inStock]) => inStock);
}


// 테스트 코드
console.log(getProductNamesAndPrices(products));
// 기대 출력: [["Laptop", 1000], ["Shoes", 50], ["Book", 20]]

console.log(getAvailableProducts(products));
// 기대 출력: [["Laptop", 1000, true], ["Book", 20, true]]


// 4번문제
//매개변수, 리턴 타입 정의 필요
function updateUser(user: { name: string; age?: number }): {
  name: string;
  age: number;
} {
  return { ...user, age: user.age ?? 18 };
}

// 테스트 코드
console.log(updateUser({ name: "Charlie" })); // { name: "Charlie", age: 18 }
console.log(updateUser({ name: "Dana", age: 25 })); // { name: "Dana", age: 25 }

// 5번문제
// proudcts 타입정의  필요 
const products1 = [
  { name: "Laptop", price: 1000, category: "Electronics" },
  { name: "Shoes", price: 50, category: "Fashion" },
  { name: "Book", price: 20 },
];

//매개변수, 리턴 타입 정의 필요
function getProductsByCategory(category:string):string[] {
  // 여기에 구현
  return products1.reduce((result: string[], product) => {
    if (product.category === category) {
      result.push(product.name);
    }
    return result;
  }, []);
}

// 테스트 코드
console.log(getProductsByCategory("Electronics")); // ["Laptop"]
console.log(getProductsByCategory("Fashion")); // ["Shoes"]
console.log(getProductsByCategory("Books")); // []