document.addEventListener("DOMContentLoaded", function () {
    let draggedElement = null;  // Перетаскиваемый элемент

    // Все элементы с классом project-wrapper
    let projectWrappers = document.querySelectorAll('.project-wrapper');

    // Слушаем событие начала перетаскивания
    projectWrappers.forEach(wrapper => {
        wrapper.addEventListener('dragstart', function (e) {
            draggedElement = wrapper;  // Запоминаем элемент, который перетаскиваем
            wrapper.classList.add('dragging');  // Добавляем класс для отслеживания
            setTimeout(function () {
                wrapper.style.opacity = '0.5'; // Мутим элемент при перетаскивании
            }, 0);
        });

        // Слушаем событие окончания перетаскивания
        wrapper.addEventListener('dragend', function (e) {
            setTimeout(function () {
                wrapper.style.opacity = '1'; // Восстанавливаем прозрачность
                wrapper.classList.remove('dragging'); // Убираем класс отслеживания
                draggedElement = null;
            }, 0);
        });

        // Добавляем возможность перетаскивания для проекта
        wrapper.setAttribute('draggable', 'true');
    });

    // Контейнер для всех элементов
    const projectsContainer = document.querySelector('.projects-container');

    // Разрешаем перетаскивание в контейнере
    projectsContainer.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    // Обработчик события 'drop'
    projectsContainer.addEventListener('drop', function (e) {
        e.preventDefault();
        if (draggedElement) {
            const dropTarget = e.target.closest('.project-wrapper');
            if (dropTarget && dropTarget !== draggedElement) {
                // Найдем текущие индексы draggedElement и dropTarget в контейнере
                const draggedIndex = Array.from(projectWrappers).indexOf(draggedElement);
                const dropIndex = Array.from(projectWrappers).indexOf(dropTarget);

                // Сравниваем индексы и вставляем элемент в нужное место
                if (draggedIndex < dropIndex) {
                    projectsContainer.insertBefore(draggedElement, dropTarget.nextSibling);
                } else {
                    projectsContainer.insertBefore(draggedElement, dropTarget);
                }

                // Обновляем фоны и порядок элементов
                updateProjectWrappers();
            }
        }
    });

    // Функция для пересчета порядка элементов в контейнере
    function updateProjectWrappers() {
        // После перетаскивания обновляем коллекцию projectWrappers
        projectWrappers = document.querySelectorAll('.project-wrapper');
        
        // Обновляем фоновые изображения
        projectWrappers.forEach((wrapper, index) => {
            const project = wrapper.querySelector('.project');
            const backgroundImage = wrapper.getAttribute('data-bg');
            if (backgroundImage) {
                project.style.backgroundImage = `url(${backgroundImage})`;
            }
        });
    }

    // Изначальная установка фонов для всех проектов
    updateProjectWrappers();
});
