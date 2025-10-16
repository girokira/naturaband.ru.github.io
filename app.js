// 1. Функция для остановки всех аудиоэлементов на странице
function stopAllAudio() {
    document.querySelectorAll('audio').forEach(audio => {
        // Проверяем, играет ли аудио, и ставим его на паузу
        if (!audio.paused) {
            audio.pause();
            // Сбрасываем позицию проигрывания на начало
            audio.currentTime = 0; 
        }
    });
}

// 2. Функция, которая запускает конкретное аудио
function playMemberSound(memberId) {
    // 1. Сначала останавливаем ВСЕ звуки
    stopAllAudio();
    
    // 2. Находим нужный аудио-элемент и запускаем его
    const audio = document.getElementById(memberId);
    if (audio) {
        audio.play().catch(error => {
            console.error("Не удалось воспроизвести аудио:", error);
            // Браузеры могут блокировать play() без первого клика пользователя.
        });
    }
}

// 3. Добавляем обработчики событий к каждому участнику
document.addEventListener('DOMContentLoaded', () => {
    // Получаем все контейнеры участников
    const members = document.querySelectorAll('.member');
    
    members.forEach((member, index) => {
        const audioId = `audio-member-${index + 1}`;
        
        // Событие: НАВЕДЕНИЕ МЫШИ (MouseEnter)
        member.addEventListener('mouseenter', () => {
            playMemberSound(audioId);
        });

        // Событие: УБРАТЬ МЫШЬ (MouseLeave)
        member.addEventListener('mouseleave', () => {
            // Опционально: можно останавливать звук, когда мышь убрана
            // Если вы хотите, чтобы звук играл до конца, удалите эту строку:
            stopAllAudio(); 
        });
    });
});