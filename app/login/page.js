'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setUser, toast, useLang } from '../../components/store';
import { LangToggle } from '../../components/customer';
import { Icon, LogoMark } from '../../components/icons';

export default function Login() {
  const router = useRouter();
  const { isUr, t } = useLang();
  const [tab, setTab] = useState('login');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');

  const submit = () => {
    if (!phone.trim() || !pass.trim() || (tab === 'signup' && !name.trim())) return toast(t('براہ کرم تمام خانے پُر کریں', 'Please fill in all fields'));
    setUser(tab === 'signup' ? { name, phone } : { name: name || 'Ali Raza', phone });
    toast(t('خوش آمدید!', 'Welcome!'));
    router.push('/profile');
  };

  const u = (cls) => `${isUr ? 'urdu' : ''} ${cls}`;

  return (
    <div dir="ltr" className="mx-auto max-w-md min-h-screen bg-cream shadow-xl flex flex-col">
      <div className="flex justify-end p-3">
        <LangToggle />
      </div>
      <div className="text-center pt-4 pb-6">
        <LogoMark className="w-12 h-12 mx-auto" />
        <h1 className={`${isUr ? 'urdu text-2xl' : 'text-xl font-extrabold tracking-wide'} text-maroon mt-2`}>
          {t('العزيز ریسٹورنٹ', 'Al Aziz Restaurant')}
        </h1>
      </div>

      <div className="px-6">
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setTab('login')} className={`${u('text-sm py-2.5 rounded-lg font-semibold border')} ${tab === 'login' ? 'bg-maroon text-white border-maroon' : 'bg-white text-ink border-[#E0D4BC]'}`}>
            {t('لاگ ان کریں', 'Login')}
          </button>
          <button onClick={() => setTab('signup')} className={`${u('text-sm py-2.5 rounded-lg font-semibold border')} ${tab === 'signup' ? 'bg-maroon text-white border-maroon' : 'bg-white text-ink border-[#E0D4BC]'}`}>
            {t('نیا اکاؤنٹ بنائیں', 'Create Account')}
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {tab === 'signup' && (
            <input className={`field text-sm ${u('')}`} placeholder={t('نام درج کریں', 'Enter your name')} value={name} onChange={(e) => setName(e.target.value)} />
          )}
          <div className="relative">
            <input className={`field text-sm pl-10 ${u('')}`} placeholder={t('موبائل نمبر درج کریں', 'Enter mobile number')} value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Icon name="phone" className="w-4 h-4 text-muted absolute left-3 top-3.5" />
          </div>
          <div className="relative">
            <input type="password" className={`field text-sm pl-10 ${u('')}`} placeholder={t('پاس ورڈ درج کریں', 'Enter password')} value={pass} onChange={(e) => setPass(e.target.value)} />
            <Icon name="eye" className="w-4 h-4 text-muted absolute left-3 top-3.5" />
          </div>
          <button className={`${u('text-[11px] text-muted hover:text-ink')}`} onClick={() => toast(t('پاس ورڈ ری سیٹ لنک بھیج دیا گیا', 'Password reset link sent'))}>
            {t('پاس ورڈ بھول گئے؟', 'Forgot password?')}
          </button>

          <button onClick={submit} className={`btn-maroon w-full py-3 text-sm ${u('')}`}>
            {tab === 'login' ? t('لاگ ان کریں', 'Login') : t('نیا اکاؤنٹ بنائیں', 'Create Account')}
          </button>

          <div className="flex items-center gap-3 text-[11px] text-muted py-1">
            <span className="flex-1 h-px bg-[#E0D4BC]" /> {t('یا', 'or')} <span className="flex-1 h-px bg-[#E0D4BC]" />
          </div>

          <button onClick={() => toast(t('ڈیمو موڈ — دستی لاگ ان استعمال کریں', 'Demo mode — use manual login'))} className="w-full bg-white border border-[#E0D4BC] rounded-lg py-2.5 flex items-center justify-center gap-2 text-xs font-semibold">
            <svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.6z"/><path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A11.5 11.5 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.6 14.7a7 7 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4l3.8-3z"/><path fill="#EA4335" d="M12 4.6c1.7 0 3.2.6 4.4 1.7L19.7 3A11.5 11.5 0 0 0 1.8 7.3l3.8 3c.9-2.7 3.4-4.7 6.4-4.7z"/></svg>
            {t('Google کے ساتھ جاری رکھیں', 'Continue with Google')}
          </button>
          <button onClick={() => toast(t('ڈیمو موڈ — دستی لاگ ان استعمال کریں', 'Demo mode — use manual login'))} className="w-full bg-white border border-[#E0D4BC] rounded-lg py-2.5 flex items-center justify-center gap-2 text-xs font-semibold">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#1877F2"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"/></svg>
            {t('Facebook کے ساتھ جاری رکھیں', 'Continue with Facebook')}
          </button>

          <p className={`${u('text-center text-[11px] text-muted pt-2')}`}>
            {t('اکاؤنٹ نہیں ہے؟', "Don't have an account?")}{' '}
            <button onClick={() => setTab('signup')} className="text-maroon font-bold">{t('نیا اکاؤنٹ بنائیں', 'Create Account')}</button>
          </p>
        </div>
      </div>
    </div>
  );
}
