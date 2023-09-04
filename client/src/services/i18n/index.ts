import { initReactI18next } from "react-i18next";
import langEn from "@app/assets/locales/en-US";
import langRu from "@app/assets/locales/ru-RU";
import { Languages } from "@app/types/enums";
import i18next from "i18next";

i18next.use(initReactI18next).init({
  resources: {
    [Languages.EN]: langEn,
    [Languages.RU]: langRu,
  },
  lng: Languages.EN,
  ns: ["common"],
});

export default i18next;
