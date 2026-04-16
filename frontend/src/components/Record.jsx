import { useState, useEffect } from 'react'
import { generateMonthArray } from '../utils/calendar';
import recordService from '../services/records'
import BottomSheet from './BottomSheet';

const Record = ({ setUser, user }) => {
    const [viewDate, setViewDate] = useState(new Date());
    const [records, setRecords] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null)
    const [showSheet, setShowSheet] = useState(false)
    const [editingData, setEditingData] = useState({})

    useEffect(() => {
        recordService.getAll().then(initialRecords => {
            setRecords(initialRecords)
            console.log('Записи загружены:', initialRecords);
        }).catch(err => {
            if (err.response && err.response.status === 401) {
                console.log('Token expired');
                handleLogout()
            } else {
                console.log('Error:', err);
            }
        })
    }, [])

    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const days = generateMonthArray(year, month);

    const handleSaveAndClose = async (updatedData) => {
        try {
            const saved = await recordService.create(updatedData);
            setRecords(prev => {
                const exists = prev.find(r => r.date === saved.date);
                if (exists) return prev.map(r => r.date === saved.date ? saved : r);
                return [...prev, saved];
            });
        } catch (err) {
            console.error("Не удалось сохранить:", err);
        } finally {
            setShowSheet(false);
        }
    };

    const handleDayClick = (item) => {
        const clickedDate = `${year}-${month + 1 + item.monthOffset}-${item.day}`

        if (clickedDate === "2027-3-27") {
            alert("🌴 СКАЗОЧНОЕБАЛИ 🌴");
            return;
        }

        const existing = records.find(r => r.date === clickedDate)
        setSelectedDate(clickedDate)
        setEditingData(existing || {
            date: clickedDate,
            isPeriod: false,
            hadSex: { fact: false, condoms: true },
            ovulation: false
        })
        setShowSheet(true)
    }

    const now = new Date();
    const isThisMonth = now.getFullYear() === year && now.getMonth() === month;

    const changeMonth = (offset) => {
        const newDate = new Date(year, month + offset, 1);
        setViewDate(newDate);
    };

    const handleLogout = () => {
        window.localStorage.removeItem('LoggedRedDaysUser')
        setUser(null)
    }

    return (
        <div className="main-wrapper">
            <div className="calendar-page">
                <p>Приветик, {user.username}</p>

                <div className="calendar-header">
                    <button className="nav-btn" onClick={() => changeMonth(-1)}>&lt;</button>
                    <h2>{viewDate.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}</h2>
                    <button className="nav-btn" onClick={() => changeMonth(1)}>&gt;</button>
                </div>

                <div className="calendar-grid">
                    {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(d => (
                        <div key={d} className="weekday">{d}</div>
                    ))}

                    {days.map((item, index) => {
                        const cellDate = `${year}-${month + 1 + item.monthOffset}-${item.day}`;
                        const record = records.find(r => r.date === cellDate);
                        const isToday = isThisMonth && item.day === now.getDate() && item.monthOffset === 0;
                        const isBaliDay = cellDate === "2027-3-27";

                        const cellClass = [
                            'day-cell',
                            !item.isCurrentMonth ? 'fade' : '',
                            isToday ? 'today' : '',
                            record?.isPeriod ? 'period-bg' : '',
                            isBaliDay ? 'bali-egg' : ''
                        ].join(' ');

                        return (
                            <div
                                key={index}
                                className={cellClass}
                                onClick={() => handleDayClick(item)}
                            >
                                <span className="day-number">{item.day}</span>

                                <div className="cell-icons">
                                    {record?.ovulation && <span className="icon-ovulation">🥚</span>}
                                    {record?.hadSex?.fact && (
                                        <span className="icon-sex">
                                            {!record.hadSex.condoms && <span className="warning-mark">!</span>}
                                            🌶
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button className="toggle-btn" onClick={handleLogout} type='button'>Выйти</button>
            </div>

            {showSheet && (
                <BottomSheet
                    data={editingData}
                    handleSaveAndClose={handleSaveAndClose}
                />
            )}
        </div>
    )
}

export default Record