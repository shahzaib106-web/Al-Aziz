'use client';
import { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  X,
  UploadCloud,
  LogOut,
  Layers,
  Table,
  Check,
} from 'lucide-react';
import {
  googleSignIn,
  googleSignOut,
  initAuth,
  getAccessToken,
  createRestaurantSpreadsheet,
} from '../../lib/googleSheets';

export default function GoogleSheetsSyncModal({ isOpen, onClose }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsLoggingIn(true);
    setErrorMsg(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to sign in with Google');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    await googleSignOut();
    setUser(null);
    setToken(null);
    setExportResult(null);
  };

  const handleTriggerExport = () => {
    setShowConfirm(true);
  };

  const handleConfirmExport = async () => {
    setShowConfirm(false);
    setIsExporting(true);
    setErrorMsg(null);

    try {
      const result = await createRestaurantSpreadsheet('Al Aziz Restaurant - Master Data');
      setExportResult(result);
    } catch (err) {
      setErrorMsg(err.message || 'Error exporting to Google Sheets');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 border border-stone-200 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">Google Sheets Integration</h3>
              <p className="text-xs text-stone-500">Al Aziz Restaurant live sync & cloud export</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Auth State */}
        {!user || !token ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600">
              <FileSpreadsheet className="w-7 h-7 text-emerald-600" />
            </div>
            <div className="max-w-xs mx-auto space-y-1">
              <h4 className="font-bold text-stone-900 text-sm">Connect your Google Account</h4>
              <p className="text-xs text-stone-500">
                Grant permission to create and update Al Aziz Restaurant spreadsheets directly on your Google Drive.
              </p>
            </div>

            {/* Official Sign in with Google Button */}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleSignIn}
                disabled={isLoggingIn}
                className="inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs shadow-xs transition active:scale-95 disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                  <path fill="none" d="M0 0h48v48H0z" />
                </svg>
                <span>{isLoggingIn ? 'Connecting...' : 'Sign in with Google'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Connected User Account Card */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full border border-stone-300" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-bold text-stone-900 leading-tight">{user.displayName || 'Authorized User'}</p>
                  <p className="text-[11px] text-stone-500 font-mono">{user.email}</p>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="text-[11px] text-stone-500 hover:text-red-700 font-semibold flex items-center gap-1 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>
            </div>

            {/* Sync Capabilities Box */}
            <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200/80 text-xs space-y-2">
              <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Synchronized Sheets Included:</span>
              </h4>
              <ul className="text-[11px] text-stone-600 space-y-1 list-disc pl-5">
                <li><strong className="text-stone-800">Live Orders:</strong> All orders with tickets, table numbers, phone, payment, and totals.</li>
                <li><strong className="text-stone-800">Inventory & Stock:</strong> Real-time meat, rice, and spice stock levels with threshold alerts.</li>
                <li><strong className="text-stone-800">Menu & Pricing:</strong> Complete dish catalog with Half and Full portion prices.</li>
              </ul>
            </div>

            {/* Export Success Banner */}
            {exportResult && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2 text-emerald-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Spreadsheet Created Successfully!</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  Spreadsheet &quot;{exportResult.title}&quot; is live on your Google Drive.
                </p>
                <a
                  href={exportResult.spreadsheetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Google Sheets</span>
                </a>
              </div>
            )}

            {/* Export Actions */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-semibold text-xs"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleTriggerExport}
                disabled={isExporting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs transition active:scale-95 disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Syncing with Drive...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>Export to Google Sheets</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Dialog (Mandatory for workspace destructive/create ops) */}
        {showConfirm && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-stone-200 shadow-2xl space-y-3">
              <h4 className="font-bold text-stone-900 text-sm">Confirm Google Sheets Export</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                This will create a new Google Spreadsheet titled{' '}
                <strong className="text-stone-900">&quot;Al Aziz Restaurant - Master Data&quot;</strong> in your
                connected Google Drive account with live orders, inventory items, and menu pricing.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100 text-xs">
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="px-3 py-1.5 rounded-lg text-stone-600 hover:bg-stone-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmExport}
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-xs"
                >
                  Yes, Create Spreadsheet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
