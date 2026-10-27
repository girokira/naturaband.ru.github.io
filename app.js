// =========================================================
// 1. ОЗВУЧКА УЧАСТНИКОВ ГРУППЫ ПРИ НАВЕДЕНИИ И КЛИКЕ
// =========================================================

function stopAllAudio() {
    document.querySelectorAll('audio').forEach(audio => {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    document.querySelectorAll('.member').forEach(card => {
        card.classList.remove('is-playing');
        const stateText = card.querySelector('.sound-state');
        if (stateText) stateText.textContent = 'Слушать партию';
    });
}

function playMemberSound(memberElement, audioId) {
    stopAllAudio();

    const audio = document.getElementById(audioId);
    if (audio) {
        memberElement.classList.add('is-playing');
        const stateText = memberElement.querySelector('.sound-state');
        if (stateText) stateText.textContent = 'Звучит партия...';

        audio.play().catch(error => {
            console.warn("Автовоспроизведение заблокировано браузером до первого клика:", error);
        });

        audio.onended = () => {
            memberElement.classList.remove('is-playing');
            if (stateText) stateText.textContent = 'Слушать партию';
        };
    }
}

// =========================================================
// 2. БАЗА РЕПЕРТУАРА ГРУППЫ «НАТУРА»
// =========================================================

const repertoireData = [
    {
        artist: "Земфира",
        category: "rock",
        songs: ["Ромашки", "Искала", "Ариведерчи", "Мачо", "Знак бесконечность", "Хочешь"]
    },
    {
        artist: "Кино",
        category: "rock",
        songs: [
            "Группа крови", "Видели ночь", "Кукушка", "Апрель", "Нам с тобой",
            "Перемен", "Печаль", "Мама, мы все тяжело больны", "Алюминиевые огурцы",
            "Песня без слов", "Война", "Проснись", "Уходи", "Дальше действовать будем мы"
        ]
    },
    {
        artist: "Би-2",
        category: "rock",
        songs: ["Лайки", "Компромисс", "Варвара", "Серебро", "И корабль плывет", "Виски"]
    },
    {
        artist: "Ленинград",
        category: "pop",
        songs: ["В Питере — пить", "Экспонат", "Менеджер", "Кабриолет", "Мне бы в небо"]
    },
    {
        artist: "Звери",
        category: "pop",
        songs: ["До скорой встречи", "Районы-кварталы", "Для тебя"]
    },
    {
        artist: "Мумий Тролль",
        category: "rock",
        songs: ["Утекай", "Медведица", "Невеста", "Владивосток 2000"]
    },
    {
        artist: "Маша и Медведи",
        category: "rock",
        songs: ["Любочка", "Без тебя", "Земля", "Рейкьявик"]
    },
    {
        artist: "IOWA",
        category: "pop",
        songs: ["Улыбайся", "Песня простая", "Мои стихи, твоя гитара"]
    },
    {
        artist: "Nautilus Pompilius",
        category: "rock",
        songs: ["Дыхание", "Крылья", "Я хочу быть с тобой", "Скованные одной цепью"]
    },
    {
        artist: "Король и Шут",
        category: "rock",
        songs: ["Прыгну со скалы", "Кукла колдуна", "Проклятый старый дом"]
    },
    {
        artist: "Дарья Виардо",
        category: "rock",
        songs: ["Бог в меня верит", "Аллилуйя", "Будь счастлив", "И кем бы ты ни был"]
    },
    {
        artist: "Мальбэк & Сюзанна",
        category: "pop",
        songs: ["Равнодушие", "Гипнозы"]
    },
    {
        artist: "Смысловые Галлюцинации",
        category: "rock",
        songs: ["Все в порядке", "Зачем топтать мою любовь"]
    },
    {
        artist: "Ляпис Трубецкой",
        category: "rock",
        songs: ["Евпатория", "Воины света"]
    },
    {
        artist: "Чайф",
        category: "rock",
        songs: ["Аргентина-Ямайка 5:0", "17 лет"]
    },
    {
        artist: "Танцы Минус",
        category: "rock",
        songs: ["Цветы", "Половинка"]
    },
    {
        artist: "Сплин",
        category: "rock",
        songs: ["Мое сердце", "Романс"]
    },
    {
        artist: "Поп и танцы (Разное)",
        category: "pop",
        songs: [
            "Время и Стекло — Имя 505",
            "Макс Корж — Жить в кайф",
            "Мираж — Музыка нас связала",
            "Тату — Нас не догонят",
            "Меладзе — Вера",
            "Гречка — Люби меня, люби",
            "XOLIDAYBOY — Пожары",
            "Те100стерон — Это не женщина, это беда",
            "Игорь Скляр — Комарово",
            "Потап и Настя — Чумачечая весна",
            "Лолита — На Титанике",
            "Елена Ваенга — Курю",
            "Жанна Агузарова — Чёрный кот"
        ]
    },
    {
        artist: "Инди, рок и душевные хиты",
        category: "misc",
        songs: [
            "Бонд с кнопкой — Кухни",
            "Бонд с кнопкой — Мало было",
            "Перемотка — Бесконечное лето",
            "Баста — Сансара",
            "Жуки — Батарейка",
            "Бумбокс — Вахтерам",
            "Чиж & Co — О любви",
            "Нэнси — Дым сигарет с ментолом",
            "Земляне — Трава у дома",
            "Кипелов — Я свободен",
            "Крематорий — Клубника со льдом",
            "АнимациЯ — Родина",
            "Сектор Газа — Дурак",
            "Слот — Круги на воде",
            "Порнофильмы — Я так соскучился",
            "Лерочка — Каждый, кто делал тебе больно — покойник",
            "Николай Носков — Это здорово",
            "Любэ — Выйду ночью в поле с конём",
            "Веселые ребята — В последний раз",
            "Бременские музыканты — Весь мир у нас в руках",
            "Матушка-земля",
            "Ой, да не вечер",
            "Гадалка (Ну что сказать)",
            "Прекрасное далеко",
            "Жили у бабуси два веселых гуся"
        ]
    },
    {
        artist: "Зарубежные хиты (English)",
        category: "eng",
        songs: [
            "Chris Isaak — Wicked Game",
            "The Cranberries — Zombie"
        ]
    }
];

// =========================================================
// 3. РЕНДЕР РЕПЕРТУАРА И ПОИСК
// =========================================================

function renderRepertoire(filterCategory = 'all', searchQuery = '') {
    const grid = document.getElementById('repertoire-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const query = searchQuery.trim().toLowerCase();

    repertoireData.forEach(group => {
        const matchesCategory = filterCategory === 'all' || group.category === filterCategory;
        if (!matchesCategory) return;

        const filteredSongs = group.songs.filter(song =>
            song.toLowerCase().includes(query) || group.artist.toLowerCase().includes(query)
        );

        if (filteredSongs.length === 0) return;

        const card = document.createElement('div');
        card.className = 'artist-card';

        const songsHtml = filteredSongs.map(song => `<li>${song}</li>`).join('');

        card.innerHTML = `
            <h3 class="artist-name">${group.artist}</h3>
            <ul class="song-list">${songsHtml}</ul>
        `;

        grid.appendChild(card);
    });
}

// =========================================================
// 4. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    const members = document.querySelectorAll('.member');
    members.forEach((member, index) => {
        const audioId = `audio-member-${index + 1}`;

        member.addEventListener('mouseenter', () => {
            playMemberSound(member, audioId);
        });

        member.addEventListener('mouseleave', () => {
            stopAllAudio();
        });

        member.addEventListener('click', () => {
            const isAlreadyPlaying = member.classList.contains('is-playing');
            if (isAlreadyPlaying) {
                stopAllAudio();
            } else {
                playMemberSound(member, audioId);
            }
        });
    });

    renderRepertoire();

    const tabButtons = document.querySelectorAll('.tab-btn');
    const searchInput = document.getElementById('song-search');
    let currentCategory = 'all';

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-filter');
            renderRepertoire(currentCategory, searchInput ? searchInput.value : '');
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderRepertoire(currentCategory, e.target.value);
        });
    }
});
