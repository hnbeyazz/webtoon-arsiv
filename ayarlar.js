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
    const butonGrubu = document.querySelector('.ust-buton-grubu');
    if (!butonGrubu) return;

    const konteyner = document.createElement('div');
    konteyner.className = 'secici-konteyner';
    konteyner.innerHTML = `
        <div class="hamburger-buton" onclick="var d=document.querySelector('.secici-dropdown'); if(d) d.classList.toggle('acik')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6" stroke-linecap="round"></line>
                <line x1="3" y1="12" x2="21" y2="12" stroke-linecap="round"></line>
                <line x1="3" y1="18" x2="21" y2="18" stroke-linecap="round"></line>
            </svg>
            <div class="secici-dropdown">
                <div class="secici-liste"></div>
            </div>
        </div>
    `;

    butonGrubu.insertBefore(konteyner, butonGrubu.firstChild);

    const liste = konteyner.querySelector('.secici-liste');
    bolumler.slice().reverse().forEach(b => {
        const a = document.createElement('a');
        a.href = b.url;
        a.textContent = "Bölüm " + b.no;
        if (window.location.pathname.includes(b.url)) {
            a.classList.add('aktif');
        }
        liste.appendChild(a);
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.secici-konteyner')) {
            const dropdown = document.querySelector('.secici-dropdown');
            if (dropdown) dropdown.classList.remove('acik');
        }
    });
}

function karBaslat() {
    const canvas = document.getElementById('snowCanvas') || document.getElementById('kar-tuvali');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, stars = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener('resize', resize);
    resize();

    class Star {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speed = Math.random() * 0.8 + 0.2;
            this.alpha = Math.random();
        }
        update() { this.y += this.speed; if (this.y > height) this.y = -10; }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 100; i++) stars.push(new Star());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(s => { s.update(); s.draw(); });
        requestAnimationFrame(animate);
    }

    animate();
}

window.addEventListener('DOMContentLoaded', () => {
    menuyuHazirla();
    karBaslat();
});