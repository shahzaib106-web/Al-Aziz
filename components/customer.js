/* Customer UI facade — implementation lives in ./customer/* modules.
   Pages import from here so public API stays stable. */
export { LangToggle, HomeHeader, TopNav, PageHeader, BottomNav } from './customer/shell';
export { Splash, Onboarding, InstallPrompt } from './customer/overlays';
export { Qty, MenuItemTile, ProductModal } from './customer/product';
