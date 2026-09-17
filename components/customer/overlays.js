'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { LogoMark, Icon } from '../icons';
import { useLang } from '../store';

/* ---------- Splash ---------- */
export function Splash({ settings }) {
  const { isUr, t } = useLang();
  return (
    <div className="fixed inset-0 z-[90] pattern-maroon flex flex-col items-center justify-center text-white">
      <LogoMark className="w-16 h-16 mb-2 animate-pulse" />
      <div className={`${isUr ? 'urdu' : ''} text-3xl font-bold text-center leading-relaxed`}>
        {t(settings?.nameUr || 'العزيز ریسٹورنٹ', settings?.nameEn || 'Al Aziz Restaurant')}
      </div>
      <div className={`${isUr ? 'urdu' : 'text-sm tracking-wide'} text-white/80 mt-1`}>
        {t(settings?.tagline || 'اصلی ذائقہ، ہماری پہچان', 'Authentic taste, our identity')}
      </div>
    </div>
  );
}

/* ---------- Onboarding ---------- */
export function Onboarding({ onDone }) {
  const { isUr, t } = useLang();
  const [slide, setSlide] = useState(0);
  const slides = [
    { img: '/img/spread.jpg', u: 'خوش آمدید!', e: 'Welcome!', us: 'اصلی دیسی کھانے، اب آپ کے موبائل پر', es: 'Authentic desi food, now on your mobile' },
    { img: '/img/biryani.jpg', u: 'مشہور بریانی', e: 'Famous Biryani', us: 'ہماری خصوصی بریانی، اصلی مصالحوں کے ساتھ', es: 'Our special biryani with authentic spices' },
    { img: '/img/kebab.jpg', u: 'تیز ترسیل', e: 'Fast Delivery', us: 'گرم کھانا، آپ کی دہلیز تک 35 منٹ میں', es: 'Hot food at your doorstep in 35 minutes' },
  ];
  const last = slide === slides.length - 1;
  return (
    <div className="fixed inset-0 z-[80] bg-cream flex flex-col">
      <div className="flex-1 max-w-md mx-auto w-full flex flex-col items-center justify-center px-8 text-center">
        <img src={slides[slide].img} alt="" className="w-64 h-64 object-cover rounded-2xl shadow-lg border-4 border-white" />
        <h2 className={`${isUr ? 'urdu' : ''} text-2xl font-bold mt-8 text-maroon`}>{t(slides[slide].u, slides[slide].e)}</h2>
        <p className={`${isUr ? 'urdu' : ''} text-sm text-muted mt-2`}>{t(slides[slide].us, slides[slide].es)}</p>
        <div className="flex gap-2 mt-8">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className={`h-2 rounded-full transition-all ${i === slide ? 'w-6 bg-maroon' : 'w-2 bg-[#D8CCB4]'}`} />
          ))}
        </div>
      </div>
      <div className="max-w-md mx-auto w-full px-8 pb-10">
        <button onClick={() => (last ? onDone() : setSlide(slide + 1))} className={`btn-maroon w-full py-3 text-sm ${isUr ? 'urdu' : 'tracking-wide font-semibold'}`}>
          {last ? t('شروع کریں', "Let's Start") : t('آگے بڑھیں', 'Next')}
        </button>
        <button onClick={onDone} className="w-full text-center text-xs tracking-widest text-muted mt-4 py-1">SKIP</button>
      </div>
    </div>
  );
}

/* ---------- PWA install prompt ---------- */
export function InstallPrompt() {
  const pathname = usePathname();
  const { isUr, t } = useLang();
  const [deferred, setDeferred] = useState(null);
  const [visible, setVisible] = useState(false);
  const [iosHelp, setIosHelp] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (standalone || localStorage.getItem('agh_install_dismissed')) return;
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);
    const bip = (e) => {
      e.preventDefault();
      setDeferred(e);
      setVisible(true);
    };
    const installed = () => setVisible(false);
    window.addEventListener('beforeinstallprompt', bip);
    window.addEventListener('appinstalled', installed);
    const timer = setTimeout(() => setVisible((v) => v || ios), 2500);
    return () => {
      window.removeEventListener('beforeinstallprompt', bip);
      window.removeEventListener('appinstalled', installed);
      clearTimeout(timer);
    };
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  const dismiss = () => {
    localStorage.setItem('agh_install_dismissed', '1');
    setVisible(false);
  };

  const install = async () => {
    if (deferred) {
      deferred.prompt();
      await deferred.userChoice.catch(() => {});
      setVisible(false);
    } else if (isIOS) {
      setIosHelp(true);
    }
  };

  return (
    <>
      {visible && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-[70]">
          <div className="bg-[#24090B] text-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 border border-white/10">
            <LogoMark className="w-10 h-10 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold">{t('ایپ انسٹال کریں', 'Install the app')}</div>
              <div className="text-[11px] text-white/70">{t('فل اسکرین، تیز رفتار، ہوم اسکرین پر', 'Full-screen & fast, right on your home screen')}</div>
            </div>
            <button onClick={install} className="bg-gold text-[#24090B] text-[12px] font-extrabold rounded-lg px-3.5 py-2 shrink-0 hover:brightness-110">
              {t('انسٹال', 'Install')}
            </button>
            <button onClick={dismiss} className="p-1 text-white/50 hover:text-white shrink-0" aria-label="dismiss">
              <Icon name="x" className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {iosHelp && (
        <div className="fixed inset-0 z-[95] bg-black/60 flex items-center justify-center p-6" onClick={() => setIosHelp(false)}>
          <div className="bg-cream-card rounded-2xl p-6 max-w-xs w-full text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <LogoMark className="w-12 h-12 mx-auto" />
            <h3 className="text-sm font-extrabold mt-3">Install on iPhone</h3>
            <ol className="text-[12px] text-muted text-left space-y-2 mt-4 list-decimal list-inside">
              <li>Tap the <b>Share</b> button in Safari</li>
              <li>Scroll and tap <b>“Add to Home Screen”</b></li>
              <li>Tap <b>Add</b> — done! The app icon appears on your home screen.</li>
            </ol>
            <button onClick={() => setIosHelp(false)} className="btn-maroon w-full py-2.5 text-xs mt-5 tracking-wide">GOT IT</button>
          </div>
        </div>
      )}
    </>
  );
}
