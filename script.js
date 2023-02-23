(function () {
  ("use strict");

  // Тут починаємо писати код

  // Функция для отримання елементів
  var el = function (element) {
    if (element.charAt(0) === "#") {
      // Перевіряємо селектор на присутність символа "#", що значить треба відібрати атрибут id=""
      return document.querySelector(element); // ... повертаємо один елемент
    }
    return document.querySelectorAll(element); // В іншому випадку повертаємо масив елементів
  };

  // Змінні з якими буде працювати калькулятор
  var viewer = el("#viewer"), // Екран калькулятора, де відображається результат
    equals = el("#equals"), // Кнопка рівності
    nums = el(".num"), // Список номерів
    ops = el(".ops"), // Список операторів
    theNum = "", // Поточний номер
    oldNum = "", // Перший номер
    resultNum, // Результат
    operator; // Оператор ( + - * /)

  // Функція, яка відбере цифру коли клікаємо по номеру
  var setNum = function () {
    if (resultNum) {
      // Якщо відображався результат, скидуємо номер
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else {
      // В іншому випадку додайте цифру до попереднього числа (це рядок!)
      theNum += this.getAttribute("data-num");
    }

    viewer.innerHTML = theNum; // Відображення поточнї цифри. innerHTML властивість повністю заміняє вміст html елемента
  };

  // Функція, яка відбере стару цифру і збереже оператор

  var moveNum = function () {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", ""); // Reset result in attr
  };

  // При кліку на дорівнює обрахувати результат
  var displayNum = function () {
    // Перетворити текст у числа
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    // Вибір операції
    switch (operator) {
      case "plus":
        resultNum = oldNum + theNum;
        break;

      case "minus":
        resultNum = oldNum - theNum;
        break;

      case "times":
        resultNum = oldNum * theNum;
        break;

      case "divided by":
        resultNum = oldNum / theNum;
        break;
        // Якщо натиснуто дорівнює без оператора, збереже номер і продовжить

        deafult: resultNum = theNum;
    }

    // Перевірка на повернення NaN або Infinity

    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) {
        // Якщо результат не є числом; Наприклад, подвійним клацанням операторів
        resultNum = "You broke it!";
      } else {
        // Якщо результат нескінченний, йдемо шляхом ділення на нуль
        resultNum = "Look, what you've done!";
        el("#calculator").classList.add("broken"); // Зупинити калькулятор
        el("#reset").classList.add("show"); // І показати кнопку скидання
      }
    }
    // Відображати результат
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    // Тепер скиньте oldNum і збережіть результат
    oldNum = 0;
    theNum = resultNum;
  };

  // Функція, яка очистити все
  var clearAll = function () {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };

  // Слідкуємо за подією кліка мишкою на цифру
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum; // При кліку будемо запускати функцію setNum
  }

  // Слідкуємо за подією натискання кліка на оператор
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  // Додаємо подію кліку до знака дорівнює
  equals.onclick = displayNum;

  // Подія кліку до кнопки скидання
  el("#reset").onclick = function () {
    window.location = window.location;
  };

  // Подія кліку до кнопки очищення
  el("#clear").onclick = clearAll;
})();
