const outputEl = document.querySelector('#output');

export function render(view, data) {
    outputEl.innerHTML = view(data);
}
