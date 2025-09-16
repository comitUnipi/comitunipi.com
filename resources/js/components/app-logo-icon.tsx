export default function AppLogoIcon() {
  return (
    <>
      <img
        className="block dark:hidden"
        src="/images/logo/logo_black.png"
        alt="logo"
      />
      <img
        className="hidden dark:block"
        src="/images/logo/logo_white.png"
        alt="logo"
      />
    </>
  );
}
