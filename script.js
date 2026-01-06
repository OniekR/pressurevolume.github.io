// Utility function to format numbers
function fmt(n) {
    return Number(n).toLocaleString(undefined, { maximumFractionDigits: 0 });
}

// Main calculation function
function calculate() {
    const volumeInput = document.getElementById('volume');
    const deltaInput = document.getElementById('delta');
    const kInput = document.getElementById('k');
    const output = document.getElementById('output');
    const output2 = document.getElementById('output2');

    const v = parseFloat(volumeInput.value);
    const finalPressure = parseFloat(deltaInput.value);
    const k = parseFloat(kInput.value);

    if (!isFinite(v) || !isFinite(finalPressure) || !isFinite(k)) {
        output.textContent = 'Please enter numeric values for Volume, Final pressure and k.';
        output2.textContent = 'Volume for 0-20 bar: Please enter valid inputs.';
        return;
    }

    if (k === 0) {
        output.textContent = 'Constant k must not be zero.';
        output2.textContent = 'Volume for 0-20 bar: Constant k must not be zero.';
        return;
    }

    const d = finalPressure - 20;
    const L = v * d / k;
    const L2 = v * 20 / k;

    output.innerHTML = '<strong>Required volume:</strong> ' + fmt(L) + ' liters';
    output2.innerHTML = '<strong>Volume for 0-20 bar:</strong> ' + fmt(L2) + ' liters';

    // Save inputs to localStorage
    try {
        localStorage.setItem('volume', volumeInput.value);
        localStorage.setItem('delta', deltaInput.value);
        localStorage.setItem('k', kInput.value);
    } catch (e) {
        console.warn('Failed to save to localStorage:', e);
    }
}

// Event listeners
const calcButton = document.getElementById('calc');
const clearButton = document.getElementById('clear');
const volumeInput = document.getElementById('volume');
const deltaInput = document.getElementById('delta');
const kInput = document.getElementById('k');

calcButton.addEventListener('click', calculate);
clearButton.addEventListener('click', () => {
    volumeInput.value = '';
    deltaInput.value = '';
    kInput.value = '';
    document.getElementById('output').textContent = 'Result will appear here.';
    document.getElementById('output2').textContent = 'Volume for 0-20 bar: Result will appear here.';
});

volumeInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') calculate(); });
deltaInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') calculate(); });
kInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') calculate(); });

// Continuous update on input change
volumeInput.addEventListener('input', calculate);
deltaInput.addEventListener('input', calculate);
kInput.addEventListener('input', calculate);

// Quick select k buttons
document.getElementById('k-wbm').addEventListener('click', () => {
    kInput.value = '21';
    calculate();
});
document.getElementById('k-obm').addEventListener('click', () => {
    kInput.value = '18';
    calculate();
});
document.getElementById('k-baseoil').addEventListener('click', () => {
    kInput.value = '14';
    calculate();
});
document.getElementById('k-kfls').addEventListener('click', () => {
    kInput.value = '35';
    calculate();
});

// Load saved values on page load
window.addEventListener('load', () => {
    try {
        const savedVolume = localStorage.getItem('volume');
        if (savedVolume !== null) volumeInput.value = savedVolume;

        const savedDelta = localStorage.getItem('delta');
        if (savedDelta !== null) deltaInput.value = savedDelta;

        const savedK = localStorage.getItem('k');
        if (savedK !== null) kInput.value = savedK;
    } catch (e) {
        console.warn('Failed to load from localStorage:', e);
    }
});