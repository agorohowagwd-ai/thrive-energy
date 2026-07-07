import { useEffect, useState } from "react";

export function useTelegram() {
  const [telegramUser, setTelegramUser] = useState(null);
  const [isTelegram, setIsTelegram] = useState(false);
  const [initData, setInitData] = useState("");

  useEffect(() => {
    if (!window.Telegram?.WebApp) return;

    const tg = window.Telegram.WebApp;

    tg.ready();
    tg.expand();

    setIsTelegram(true);

    setInitData(tg.initData);

    if (tg.initDataUnsafe?.user) {
      setTelegramUser(tg.initDataUnsafe.user);
    }
  }, []);

  return {
    telegramUser,
    isTelegram,
    initData,
  };
}