import { useEffect, useState } from "react";

export function useTelegram() {
  const [telegramUser, setTelegramUser] = useState(null);
  const [isTelegram, setIsTelegram] = useState(false);
  const [initData, setInitData] = useState("");

  useEffect(() => {
    let tries = 0;

    const timer = setInterval(() => {
      const tg = window.Telegram?.WebApp;

      if (!tg) {
        tries++;

        if (tries > 20) {
          clearInterval(timer);
        }

        return;
      }

      clearInterval(timer);

      tg.ready();
      tg.expand();

      // Telegram chrome in the app's monochrome palette:
      // black header blends into the iridescent hero,
      // white bottom bar matches the page canvas.
      try {
        tg.setHeaderColor?.("#000000");
        tg.setBackgroundColor?.("#000000");
        tg.setBottomBarColor?.("#ffffff");
      } catch (e) {
        console.warn("Telegram theming not supported", e);
      }

      console.log("Telegram WebApp detected");
      console.log(tg);

      setIsTelegram(true);

      setInitData(tg.initData || "");

      if (tg.initDataUnsafe?.user) {
        setTelegramUser(tg.initDataUnsafe.user);
      }
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return {
    telegramUser,
    isTelegram,
    initData,
  };
}