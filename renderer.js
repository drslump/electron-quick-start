// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { desktopCapturer, ipcRenderer } = require('electron');

const select = document.createElement('SELECT');
select.innerHTML = '<option>-- Choose a reference window (on 5 seconds will moveAbove) --</option>'
select.addEventListener('change', function () {
    if (!this.value) return;
    select.disabled = true;
    setTimeout(() => {
        console.log('moveAbove', this.value);
        select.disabled = false;
        ipcRenderer.send('moveAbove', this.value);
    }, 5000);
});
document.body.appendChild(select);

desktopCapturer.getSources({types:['window']})
.then(sources => {
    sources.forEach(source => {
        const opt = document.createElement('OPTION');
        opt.value = source.id;
        opt.appendChild(document.createTextNode(source.name));
        select.appendChild(opt);
    })
});
