import os
import webbrowser
import time
import re

def dogal_sirala(liste):
    convert = lambda text: int(text) if text.isdigit() else text.lower()
    alphanum_key = lambda key: [convert(c) for c in re.split('([0-9]+)', key)]
    return sorted(liste, key=alphanum_key)

# --- KLASÖRÜ OTOMATİK BUL ---
# Scriptin çalıştığı klasörü ana dizin olarak kabul et
ana_dizin = os.path.dirname(os.path.realpath(__file__))

# Sadece klasör olanları al (kendi .py dosyanı veya html'leri dahil etme)
bolumler = dogal_sirala([
    d for d in os.listdir(ana_dizin) 
    if os.path.isdir(os.path.join(ana_dizin, d)) and not d.startswith('.')
])

def sayfa_olustur():
    if not bolumler:
        print("Hata: Scriptin yanında hiç bölüm klasörü bulunamadı!")
        print(f"Şu anki konum: {ana_dizin}")
        time.sleep(5)
        return

    olusturulan_dosyalar = []
    
    for i, bolum_adi in enumerate(bolumler):
        bolum_yolu = os.path.join(ana_dizin, bolum_adi)
        resimler = dogal_sirala([
            f for f in os.listdir(bolum_yolu)
            if f.lower().endswith((".png", ".jpg", ".jpeg"))
        ])
        
        benzersiz_id = int(time.time())
        dosya_adi = f"izle_bolum_{i+1}.html"
        tam_cikti_yolu = os.path.join(ana_dizin, dosya_adi)
        olusturulan_dosyalar.append(tam_cikti_yolu)
        
        sonraki_link = f"izle_bolum_{i+2}.html" if i + 1 < len(bolumler) else None
        onceki_link = f"izle_bolum_{i}.html" if i > 0 else None
        
        html_icerik = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>{bolum_adi}</title>
            <style>
                body {{ margin: 0; background: #050505; display: flex; flex-direction: column; align-items: center; font-family: 'Segoe UI', sans-serif; color: white; }}
                .container {{ width: 100%; max-width: 1000px; line-height: 0; }}
                img {{ width: 100%; height: auto; display: block; border: none; }}
                .nav-section {{ padding: 60px 20px; line-height: normal; text-align: center; background: #0a0a0a; width: 100%; }}
                .btn-group {{ display: flex; justify-content: center; gap: 20px; margin-top: 20px; }}
                .btn {{ 
                    padding: 15px 40px; text-decoration: none; font-weight: bold; 
                    border-radius: 8px; font-size: 18px; transition: 0.2s; min-width: 150px;
                }}
                .next-btn {{ background: #27ae60; color: white; border: 2px solid #27ae60; }}
                .next-btn:hover {{ background: #2ecc71; transform: translateY(-3px); }}
                .prev-btn {{ background: transparent; color: #aaa; border: 2px solid #444; }}
                .prev-btn:hover {{ color: white; border-color: #888; }}
                .info {{ color: #555; font-size: 14px; margin-bottom: 10px; }}
            </style>
        </head>
        <body>
            <div class="container">
        """

        for resim in resimler:
            # Local file path formatı
            resim_yolu = os.path.join(bolum_yolu, resim).replace("\\", "/")
            html_icerik += f'                <img src="file:///{resim_yolu}?v={benzersiz_id}">\n'

        html_icerik += f"""
                <div class="nav-section">
                    <p class="info">{bolum_adi} Tamamlandı</p>
                    <div class="btn-group">
                        {f'<a href="{onceki_link}" class="btn prev-btn">← Önceki</a>' if onceki_link else ''}
                        {f'<a href="{sonraki_link}" class="btn next-btn">Sonraki Bölüm →</a>' if sonraki_link else '<span class="btn" style="background:#222; color:#555;">Son Bölüm</span>'}
                    </div>
                </div>
            </div>
        </body>
        </html>
        """

        with open(tam_cikti_yolu, "w", encoding="utf-8") as f:
            f.write(html_icerik)

    # En güncel dosyayı aç
    webbrowser.open(f"file:///{olusturulan_dosyalar[0]}")

if __name__ == "__main__":
    sayfa_olustur()