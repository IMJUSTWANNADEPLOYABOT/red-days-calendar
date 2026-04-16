// 1. Узнаем, сколько дней в месяце (28-31)
export const daysInMonth = (year, month) => {
    // Хитрый способ: 0-й день следующего месяца — это последний день текущего.
    return new Date(year, month + 1, 0).getDate(); //здесь мы узнали количество дней потому что получаем последний день месяца
};

// 2. Узнаем, с какого дня недели начинается 1-е число
export const firstDayOfMonth = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    // JS: 0=Вс, 1=Пн... Нам надо: 0=Пн, 6=Вс.
    return day === 0 ? 6 : day - 1;
};

// 3. Собираем финальный массив из 42 ячеек
export const generateMonthArray = (year, month) => {
    const totalDays = daysInMonth(year, month); //получили общее количество дней благодаря нашей функции которая просто возвращает количество дней в месяце 
    const startDay = firstDayOfMonth(year, month); // Например, 2 (Среда) . здесь мы понимаем отрисовывать следует со среды, потому что первые дня заняты
    const days = [];

    // Хвост прошлого месяца (чтобы не было пустых дырок)
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
        days.push({
            day: prevMonthLastDay - i,
            isCurrentMonth: false,
            monthOffset: -1 
        });
    }

    // Текущий месяц
    for (let i = 1; i <= totalDays; i++) {
        days.push({
            day: i,
            isCurrentMonth: true,
            monthOffset: 0
        });
    }

    // Хвост следующего месяца (добиваем до 42)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
        days.push({
            day: i,
            isCurrentMonth: false,
            monthOffset: 1
        });
    }

    return days;
};