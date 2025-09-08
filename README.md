# YouTube Toplu Abonelik İptal Scripti

YouTube'da tüm aboneliklerinizi tek seferde iptal etmenizi sağlayan basit ve güvenli JavaScript scripti.

## 🚀 Özellikler

- ✅ **Güvenli İptal**: Sadece abonelik butonlarını hedefler
- ⏱️ **Kontrollü Hız**: Her işlem arasında 4 saniye bekler
- 🛡️ **Güvenlik Limiti**: Maksimum 30 abonelik iptal eder
- 📊 **Canlı İlerleme**: Üst kısımda ilerleme çubuğu gösterir
- ⏹️ **Durdurma**: İstediğiniz zaman işlemi durdurabilirsiniz
- 🔍 **Detaylı Log**: Her adımı konsolda görüntüler

## 📋 Kullanım

### 1. YouTube Abonelikler Sayfasına Gidin
```
https://www.youtube.com/feed/channels
```

### 2. Browser Konsolunu Açın
- **Chrome/Edge**: `F12` → Console sekmesi
- **Firefox**: `F12` → Console sekmesi
- **Safari**: `Cmd+Option+C`

### 3. Script'i Çalıştırın
```javascript
// Script kodunu kopyala-yapıştır, sonra:
startUnsubscribeProcess()
```

### 4. İşlemi Durdurmak
```javascript
stopUnsubscribeProcess()
```
veya üst kısımdaki **"DURDUR"** butonuna tıklayın.

## ⚙️ Ayarlar

Script içindeki ayarları değiştirebilirsiniz:

```javascript
// Maksimum iptal edilecek abonelik sayısı
if (unsubscribeCount >= 30) {

// İşlemler arası gecikme (milisaniye)
}, 4000);
```

## ⚠️ Önemli Uyarılar

- **Bu işlem geri alınamaz!** Tüm abonelikleriniz iptal edilecek
- Büyük abonelik listelerinde uzun sürebilir
- İşlem sırasında sayfadan çıkmayın
- YouTube'un hız limitine takılmamak için yavaş çalışır

## 🛡️ Güvenlik

- Script sadece YouTube'un resmi DOM elementlerini kullanır
- Hiçbir dış kaynağa veri göndermez
- Tarayıcı konsolunda çalışır, kurulum gerektirmez
- Açık kaynak kodludur, inceleyebilirsiniz

## 🐛 Sorun Giderme

### Script Çalışmıyor
1. YouTube abonelikler sayfasında olduğunuzdan emin olun
2. Sayfayı yenileyin ve tekrar deneyin
3. Başka browser'da test edin

### Buton Bulamıyor
1. Sayfayı biraz aşağı kaydırın
2. Birkaç saniye bekleyin
3. Script'i tekrar çalıştırın

### Onay Butonu Bulamıyor
1. Modal'ın tam açılmasını bekleyin
2. Manual olarak bir abonelikten çıkın ve modal'ın yapısını kontrol edin

## 📱 Desteklenen Tarayıcılar

- ✅ Chrome 80+
- ✅ Firefox 70+
- ✅ Edge 80+
- ✅ Safari 13+

## 🔧 Geliştirme

Script'i geliştirmek için:

1. Repository'yi fork edin
2. Değişikliklerinizi yapın
3. Test edin
4. Pull request gönderin

## 📄 Lisans

MIT License - Özgürce kullanabilir, değiştirebilir ve dağıtabilirsiniz.

## ⭐ Katkıda Bulunun

Bu proje yararlıysa:
- ⭐ Star verin
- 🐛 Bug bildirin
- 💡 Özellik önerin
- 🔄 Pull request gönderin

## 📞 İletişim

Sorularınız için GitHub Issues kullanın.

---

**⚠️ Dikkat**: Bu script eğitim amaçlıdır. Kullanım riski size aittir. YouTube'un hizmet şartlarını ihlal etmediğinden emin olun.
