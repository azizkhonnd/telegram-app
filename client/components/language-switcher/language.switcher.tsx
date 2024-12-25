'use client';

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Flag from "react-world-flags";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="w-full">
      <Select value={i18n.language || "en"} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-full border-none mt-2 bg-secondary px-2 h-[50px]">
          <SelectValue>
            <div className="flex items-center gap-2">
              <span>
                {t("Language")}
              </span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <Flag code="GB" className="w-6 h-6" />
              <span>{t("English")}</span>
            </div>
          </SelectItem>
          <SelectItem value="ru" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <Flag code="RU" className="w-6 h-6" />
              <span>{t("Russian")}</span>
            </div>
          </SelectItem>
          <SelectItem value="uz" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <Flag code="UZ" className="w-6 h-6" />
              <span>{t("Uzbek")}</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
