import { useState } from 'react';

const BottomSheet = ({ data, handleSaveAndClose }) => {
    const [localData, setLocalData] = useState(data);

    // Универсальная функция для простых полей (isPeriod, ovulation)
    const toggleField = (field) => {
        setLocalData({ ...localData, [field]: !localData[field] });
    };

    // Логика для секса
    const toggleSexFact = () => {
        setLocalData({ 
            ...localData, 
            hadSex: { ...localData.hadSex, fact: !localData.hadSex.fact } 
        });
    };

    const toggleCondoms = () => {
        setLocalData({ 
            ...localData, 
            hadSex: { ...localData.hadSex, condoms: !localData.hadSex.condoms } 
        });
    };

    const closeMenu = () => {
        handleSaveAndClose(localData);
    };

    return (
        <div className="sheet-overlay" onClick={closeMenu}>
            <div className="sheet-content" onClick={(e) => e.stopPropagation()}>
                <div className="sheet-header">
                    <div className="drag-handle"></div>
                    <button className="close-x" onClick={closeMenu}>×</button>
                </div>

                <h3>{new Date(localData.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</h3>

                <div className="sheet-body">
                    {/* МЕСЯЧНЫЕ */}
                    <div className={`option-row ${localData.isPeriod ? 'active' : ''}`} onClick={() => toggleField('isPeriod')}>
                        <span>🍅 Месячные</span>
                        <input type="checkbox" checked={localData.isPeriod} readOnly />
                    </div>

                    {/* ОВУЛЯЦИЯ */}
                    <div className={`option-row ${localData.ovulation ? 'active' : ''}`} onClick={() => toggleField('ovulation')}>
                        <span>🥚 Овуляция</span>
                        <input type="checkbox" checked={localData.ovulation} readOnly />
                    </div>

                    {/* СЕКС (ФАКТ) */}
                    <div className={`option-row ${localData.hadSex.fact ? 'active' : ''}`} onClick={toggleSexFact}>
                        <span>🌶 Секс</span>
                        <input type="checkbox" checked={localData.hadSex.fact} readOnly />
                    </div>

                    {/* ДОПОЛНИТЕЛЬНО: ПРЕЗЕРВАТИВЫ (показываем только если был секс) */}
                    {localData.hadSex.fact && (
                        <div className="option-row nested" onClick={toggleCondoms}>
                            <span style={{ marginLeft: '20px', fontSize: '0.9em' }}>
                                {localData.hadSex.condoms ? '🛡️ С защитой' : '⚠️ Из защиты только молитва'}
                            </span>
                            <div className="toggle-switch">
                                {/* Можно оставить чекбокс или стилизовать под свитч */}
                                <input type="checkbox" checked={!localData.hadSex.condoms} readOnly />
                                <span className="hint">без защиты</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BottomSheet;