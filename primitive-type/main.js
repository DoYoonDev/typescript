var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// ********************* 1강 문제 **************************
// 1번문제 
var userName; // 예: 이름
var userAge; // 예: 나이
var isAdmin; // 예: 관리자 여부
userName = "Alice";
userAge = 25;
isAdmin = true;
console.log(userName, userAge, isAdmin);
// 2번문제
// 변수 선언과 초기값 지정
var productName = "반팔"; // 상품 이름
var productPrice = 30000; // 상품 가격
var isAvailable = true; // 상품 재고 여부
// 예시 출력
console.log("\uC0C1\uD488\uBA85: ".concat(productName, ", \uAC00\uACA9: ").concat(productPrice, ", \uC7AC\uACE0 \uC5EC\uBD80: ").concat(isAvailable));
// 3번문제
function addNumbers(a, b) {
    return a + b;
}
console.log(addNumbers(5, 3));
// 4번문제
function stringifyValue(value) {
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
function compareValues(a, b) {
    if (a === b) {
        return "엄격한 동등성";
    }
    else if (a == b) {
        return "느슨한 동등성";
    }
    else {
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
function isPrimitive(value) {
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
var user = {
    name: "Alice",
    isAdmin: true,
};
user = {
    name: "Bob",
    age: 40,
    isAdmin: false,
};
// 2번문제
// 숫자만 담을 수 있는 읽기 전용 배열을 작성하세요.
var numbers = [1, 2, 3];
// 아래 코드는 오류가 발생해야 합니다.
// numbers.push(4);
// numbers[0] = 42;
// 3번문제
var products = [
    ["Laptop", 1000, true],
    ["Shoes", 50, false],
    ["Book", 20, true],
];
// 1. 상품 이름과 가격만 반환,리턴타입 정의필요 
function getProductNamesAndPrices(products) {
    // 여기에 구현
    return products.map(function (_a) {
        var name = _a[0], price = _a[1];
        return [name, price];
    });
}
// 2. 재고가 있는 상품만 반환,리턴타입 정의필요 
function getAvailableProducts(products) {
    // 여기에 구현
    return products.filter(function (_a) {
        var name = _a[0], price = _a[1], inStock = _a[2];
        return inStock;
    });
}
// 테스트 코드
console.log(getProductNamesAndPrices(products));
// 기대 출력: [["Laptop", 1000], ["Shoes", 50], ["Book", 20]]
console.log(getAvailableProducts(products));
// 기대 출력: [["Laptop", 1000, true], ["Book", 20, true]]
// 4번문제
//매개변수, 리턴 타입 정의 필요
function updateUser(user) {
    var _a;
    return __assign(__assign({}, user), { age: (_a = user.age) !== null && _a !== void 0 ? _a : 18 });
}
// 테스트 코드
console.log(updateUser({ name: "Charlie" })); // { name: "Charlie", age: 18 }
console.log(updateUser({ name: "Dana", age: 25 })); // { name: "Dana", age: 25 }
// 5번문제
// proudcts 타입정의  필요 
var products1 = [
    { name: "Laptop", price: 1000, category: "Electronics" },
    { name: "Shoes", price: 50, category: "Fashion" },
    { name: "Book", price: 20 },
];
//매개변수, 리턴 타입 정의 필요
function getProductsByCategory(category) {
    // 여기에 구현
    return products1.reduce(function (result, product) {
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
