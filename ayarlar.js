const bolumler = [
    { no: 1, url: "izle_bolum_1.html" },
    { no: 2, url: "izle_bolum_2.html" },
    { no: 3, url: "izle_bolum_3.html" }, 
    { no: 4, url: "izle_bolum_4.html" },
    { no: 5, url: "izle_bolum_5.html" },
    { no: 6, url: "izle_bolum_6.html" },
    { no: 7, url: "izle_bolum_7.html" },
    { no: 8, url: "izle_bolum_8.html" },
    { no: 9, url: "izle_bolum_9.html" },
    { no: 10, url: "izle_bolum_10.html" },
    { no: 11, url: "izle_bolum_11.html" },
    { no: 12, url: "izle_bolum_12.html" }
];
function menuyuHazirla() {
    const select = document.querySelector('.secici-buton');
    if(!select) return;
    
    bolumler.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b.url;
        opt.text = "Bölüm " + b.no;
        if(window.location.pathname.includes(b.url)) opt.selected = true;
        select.appendChild(opt);
    });
}
function karBaslat() {
    const canvas = document.getElementById('snowCanvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w; canvas.height = h;
    let flakes = [];
    for(let i=0; i<100; i++) flakes.push({x: Math.random()*w, y: Math.random()*h, r: Math.random()*3+1, d: Math.random()*1});
    function draw() {
        ctx.clearRect(0,0,w,h); ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.beginPath();
        for(let f of flakes) { ctx.moveTo(f.x, f.y); ctx.arc(f.x, f.y, f.r, 0, Math.PI*2); }
        ctx.fill();
        for(let f of flakes) { f.y += f.d**2 + 1; if(f.y > h) { f.y = -10; f.x = Math.random()*w; } }
    }
    setInterval(draw, 30);
}

// SAYFA AÇILDIĞINDA ÇALIŞTIR
window.addEventListener('DOMContentLoaded', () => {
    menuyuHazirla();
    karBaslat();
});
