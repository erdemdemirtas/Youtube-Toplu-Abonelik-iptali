/**
 * YouTube Toplu Abonelik İptal Scripti
 * 
 * YouTube'da tüm aboneliklerinizi güvenli şekilde iptal eder
 * 
 * Kullanım:
 * 1. https://www.youtube.com/feed/channels sayfasına gidin
 * 2. Browser konsoluna bu scripti yapıştırın
 * 3. startUnsubscribeProcess() komutunu çalıştırın
 * 
 * @author GitHub Kullanıcısı
 * @version 1.0.0
 * @license MIT
 */

(function() {
    'use strict';
    
    // Konfigürasyon
    const CONFIG = {
        maxUnsubscribes: 30,     // Maksimum iptal edilecek abonelik sayısı
        delay: 4000,             // İşlemler arası gecikme (ms)
        scrollDelay: 2000,       // Scroll sonrası bekleme (ms)
        confirmDelay: 1000       // Onay butonu beklem (ms)
    };
    
    // Global değişkenler
    let unsubscribeCount = 0;
    let isRunning = false;
    let progressBar = null;
    
    /**
     * İlerleme çubuğu oluşturur
     */
    function createProgressBar() {
        // Eski progress bar'ı temizle
        if (progressBar) {
            progressBar.remove();
        }
        
        progressBar = document.createElement('div');
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.width = '100%';
        progressBar.style.backgroundColor = '#ff0000';
        progressBar.style.color = 'white';
        progressBar.style.padding = '15px';
        progressBar.style.textAlign = 'center';
        progressBar.style.zIndex = '999999';
        progressBar.style.fontWeight = 'bold';
        progressBar.style.fontSize = '16px';
        progressBar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        
        const text = document.createElement('span');
        text.id = 'progress-text';
        text.textContent = `🔄 İptal edilen: ${unsubscribeCount} abonelik`;
        
        const stopBtn = document.createElement('button');
        stopBtn.textContent = 'DURDUR';
        stopBtn.style.marginLeft = '20px';
        stopBtn.style.padding = '10px 20px';
        stopBtn.style.backgroundColor = 'white';
        stopBtn.style.color = 'red';
        stopBtn.style.border = 'none';
        stopBtn.style.borderRadius = '5px';
        stopBtn.style.cursor = 'pointer';
        stopBtn.style.fontWeight = 'bold';
        
        stopBtn.onclick = () => {
            stopUnsubscribeProcess();
        };
        
        progressBar.appendChild(text);
        progressBar.appendChild(stopBtn);
        document.body.appendChild(progressBar);
        
        console.log('✅ İlerleme çubuğu oluşturuldu');
    }
    
    /**
     * İlerleme çubuğunu günceller
     */
    function updateProgress() {
        const text = document.getElementById('progress-text');
        if (text) {
            text.textContent = `🔄 İptal edilen: ${unsubscribeCount} abonelik (Max: ${CONFIG.maxUnsubscribes})`;
        }
    }
    
    /**
     * Sayfada abonelik iptal butonunu arar
     * @returns {HTMLElement|null} Bulunan buton veya null
     */
    function findSubscribeButton() {
        console.log('🔍 Abone butonları aranıyor...');
        const allButtons = document.querySelectorAll('button');
        
        for (let button of allButtons) {
            const text = button.textContent.trim();
            const ariaLabel = button.getAttribute('aria-label') || '';
            
            // "Abone olundu" metni ve "aboneliğinden çık" aria-label'ı olan butonları bul
            if (text === 'Abone olundu' && ariaLabel.includes('aboneliğinden çık')) {
                // Butonun görünür olduğunu kontrol et
                const rect = button.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0 && rect.top > 0) {
                    console.log(`✅ Buton bulundu: ${ariaLabel}`);
                    return button;
                }
            }
        }
        
        console.log('❌ Abone butonu bulunamadı');
        return null;
    }
    
    /**
     * Onay modal'ındaki "Abonelikten çık" butonuna tıklar
     */
    function clickUnsubscribeConfirm() {
        setTimeout(() => {
            const buttons = document.querySelectorAll('button');
            for (let btn of buttons) {
                if (btn.textContent.trim() === 'Abonelikten çık') {
                    console.log('✅ Onay butonuna tıklandı');
                    btn.click();
                    return;
                }
            }
            console.log('❌ Onay butonu bulunamadı');
        }, CONFIG.confirmDelay);
    }
    
    /**
     * Tek abonelik iptal işlemini gerçekleştirir
     */
    function processOne() {
        if (!isRunning) {
            console.log('⏹️ İşlem durduruldu');
            return;
        }
        
        console.log(`\n=== ${unsubscribeCount + 1}. Abonelik İptali ===`);
        
        const button = findSubscribeButton();
        if (!button) {
            // Buton bulunamadı, scroll yap ve tekrar dene
            console.log('📜 Scroll yapılıyor...');
            window.scrollBy(0, 500);
            
            setTimeout(() => {
                const newButton = findSubscribeButton();
                if (!newButton) {
                    finishProcess('Tüm abonelikler iptal edildi!');
                } else {
                    processOne();
                }
            }, CONFIG.scrollDelay);
            return;
        }
        
        // Kanal adını al
        const channelName = button.getAttribute('aria-label').replace(' aboneliğinden çık.', '');
        console.log(`🖱️ ${channelName} aboneliğinden çıkılıyor...`);
        
        // Abone butonuna tıkla
        button.click();
        
        // Onay modalını bekle ve onayla
        clickUnsubscribeConfirm();
        
        unsubscribeCount++;
        updateProgress();
        
        // Sonraki abonelik için bekle
        setTimeout(() => {
            if (unsubscribeCount >= CONFIG.maxUnsubscribes) {
                finishProcess(`Maksimum limit (${CONFIG.maxUnsubscribes}) aşıldı`);
            } else {
                processOne();
            }
        }, CONFIG.delay);
    }
    
    /**
     * İşlemi bitirir ve sonuçları gösterir
     * @param {string} message Bitiş mesajı
     */
    function finishProcess(message) {
        isRunning = false;
        console.log(`\n✅ ${message}`);
        console.log(`📊 Toplam iptal edilen: ${unsubscribeCount}`);
        
        if (progressBar) {
            progressBar.remove();
            progressBar = null;
        }
        
        // Başarı bildirimi
        alert(`İşlem tamamlandı!\n\n${unsubscribeCount} abonelik başarıyla iptal edildi.\n\n${message}`);
    }
    
    /**
     * Ana işlemi başlatır
     */
    function startUnsubscribeProcess() {
        // Zaten çalışıyor mu kontrol et
        if (isRunning) {
            console.log('❌ Script zaten çalışıyor!');
            alert('Script zaten çalışıyor! Durdurmak için stopUnsubscribeProcess() kullanın.');
            return;
        }
        
        // Doğru sayfada mı kontrol et
        if (!window.location.href.includes('youtube.com/feed/channels')) {
            console.log('❌ Lütfen YouTube abonelikler sayfasına gidin');
            alert('Lütfen önce YouTube abonelikler sayfasına gidin:\nhttps://www.youtube.com/feed/channels');
            return;
        }
        
        // Kullanıcı onayı al
        const confirm = window.confirm(
            'YouTube Abonelik İptal Scripti\n\n' +
            '⚠️ UYARI: Bu işlem geri alınamaz!\n\n' +
            `• Maksimum ${CONFIG.maxUnsubscribes} abonelik iptal edilecek\n` +
            '• İşlem uzun sürebilir\n' +
            '• İstediğiniz zaman durdurebilirsiniz\n\n' +
            'Devam etmek istiyor musunuz?'
        );
        
        if (!confirm) {
            console.log('❌ Kullanıcı işlemi iptal etti');
            return;
        }
        
        // İşlemi başlat
        isRunning = true;
        unsubscribeCount = 0;
        
        console.log('🚀 YouTube abonelik iptal işlemi başlıyor...');
        console.log(`⚙️ Ayarlar: Maksimum ${CONFIG.maxUnsubscribes} abonelik, ${CONFIG.delay}ms gecikme`);
        
        createProgressBar();
        
        // İlk işlemi başlat
        setTimeout(() => {
            processOne();
        }, 1000);
    }
    
    /**
     * İşlemi durdurur
     */
    function stopUnsubscribeProcess() {
        if (!isRunning) {
            console.log('ℹ️ Zaten durmuş durumda');
            return;
        }
        
        isRunning = false;
        
        if (progressBar) {
            progressBar.remove();
            progressBar = null;
        }
        
        console.log('⏹️ İşlem kullanıcı tarafından durduruldu');
        console.log(`📊 İptal edilen abonelik sayısı: ${unsubscribeCount}`);
        
        alert(`İşlem durduruldu!\n\n${unsubscribeCount} abonelik iptal edildi.`);
    }
    
    // Global fonksiyonları tanımla
    window.startUnsubscribeProcess = startUnsubscribeProcess;
    window.stopUnsubscribeProcess = stopUnsubscribeProcess;
    
    // Script yüklendiğinde bilgi ver
    console.log('📱 YouTube Abonelik İptal Scripti yüklendi');
    console.log('📋 Kullanım:');
    console.log('   1. https://www.youtube.com/feed/channels sayfasına gidin');
    console.log('   2. startUnsubscribeProcess() komutunu çalıştırın');
    console.log('   3. İstediğiniz zaman stopUnsubscribeProcess() ile durdurun');
    console.log('');
    console.log('🚀 Başlatmak için: startUnsubscribeProcess()');
    console.log('⏹️ Durdurmak için: stopUnsubscribeProcess()');
    
})();
