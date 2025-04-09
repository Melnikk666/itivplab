document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-left form");
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const phoneInput = form.querySelector('input[type="tel"]');
    const messageInput = document.querySelector(".contact-right textarea");

    // Ограничение символов при вводе
    nameInput.addEventListener("input", function () {
        if (this.value.length > 30) {
            this.value = this.value.slice(0, 30);
        }
    });

    phoneInput.addEventListener("input", function () {
        // Удаляем все символы, кроме цифр и "+"
        this.value = this.value.replace(/[^0-9+]/g, "");

        // Ограничиваем длину номера до 13 символов
        if (this.value.length > 13) {
            this.value = this.value.slice(0, 13);
        }

        // Проверяем, начинается ли номер с +375
        if (!this.value.startsWith("+375")) {
            this.value = "+375";
        }
    });

    messageInput.addEventListener("input", function () {
        if (this.value.length > 150) {
            this.value = this.value.slice(0, 150);
        }
    });

    emailInput.addEventListener("input", function () {
        // Запрещаем ввод русских букв в email
        this.value = this.value.replace(/[а-яёА-ЯЁ]/g, "");
    });

    form.addEventListener("submit", function (event) {
        let isValid = true;

        // Проверка ФИО (не пустое и не более 40 символов)
        if (nameInput.value.trim() === "" || nameInput.value.length > 40) {
            isValid = false;
            showError(nameInput, "ФИО не должно быть пустым.");
        } else {
            hideError(nameInput);
        }

        // Проверка email (запрещены русские буквы)
        if (!isValidEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, "Введите корректный e-mail.");
        } else {
            hideError(emailInput);
        }

        // Проверка номера телефона (+375XXXXXXXXX)
        if (!/^\+375\d{9}$/.test(phoneInput.value.trim())) {
            isValid = false;
            showError(phoneInput, "Введите номер в формате: +375XXXXXXXXX");
        } else {
            hideError(phoneInput);
        }

        // Проверка описания проекта (не пустое и максимум 150 символов)
        if (messageInput.value.trim() === "" || messageInput.value.length > 150) {
            isValid = false;
            showError(messageInput, "Описание проекта обязательно и не должно превышать 150 символов.");
        } else {
            hideError(messageInput);
        }

        // Если есть ошибки, отменяем отправку формы
        if (!isValid) {
            event.preventDefault();
        }
    });

    // Функция для проверки email (запрещаем русские буквы)
    function isValidEmail(email) {
        return /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email);
    }
    
    

    // Функция для отображения ошибки
    function showError(input, message) {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains("error-message")) {
            error = document.createElement("div");
            error.classList.add("error-message");
            input.parentNode.insertBefore(error, input.nextSibling);
        }
        error.textContent = message;
        input.style.borderBottom = "2px solid red";
    }

    // Функция для скрытия ошибки
    function hideError(input) {
        let error = input.nextElementSibling;
        if (error && error.classList.contains("error-message")) {
            error.remove();
        }
        input.style.borderBottom = "0.084rem solid white";
    }
});
