document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".project-wrapper");
    let activeProject = null;
    let startX = 0;
    let currentTranslateX = 0; // Храним актуальный сдвиг для каждого элемента
    let animationFrameId = null;

    projects.forEach((project) => {
        project.addEventListener("mousedown", (e) => {
            activeProject = project;
            startX = e.clientX; // Начальная позиция мыши
            // Получаем текущую позицию translateX из стиля элемента
            const transform = window.getComputedStyle(project).transform;
            currentTranslateX = transform !== 'none' ? parseFloat(transform.split(',')[4]) : 0;
            project.style.cursor = "grabbing";
        });

        document.addEventListener("mousemove", (e) => {
            if (!activeProject) return;

            const shiftX = e.clientX - startX; // Сдвиг мыши относительно начальной позиции
            const newTranslateX = currentTranslateX + shiftX; // Новый сдвиг относительно начальной позиции

            // Используем requestAnimationFrame для плавности
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(() => {
                activeProject.style.transform = `translateX(${newTranslateX}px)`;
            });
        });

        document.addEventListener("mouseup", () => {
            if (activeProject) {
                activeProject.style.cursor = "grab";
                activeProject = null;
            }
            cancelAnimationFrame(animationFrameId);
        });
    });
});
