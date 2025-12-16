import { describe, it, expect } from "bun:test";
import { translit, alphabet } from "./preslov";

describe("Preslovljavanje", () => {
  describe("translit", () => {
    it("transliterates Cyrillic to Latin with diacritics", () => {
      const examples: Array<[string, string]> = [
        ["ЊЕГОШ", "NJEGOŠ"],
        ["Latinica", "Latinica"],
        ["Ђурђевак", "Đurđevak"],
        ["Шабан Шаулић", "Šaban Šaulić"],
        ["електродистрибуција", "elektrodistribucija"],
        ["ЂОРЂЕ Ђ. Ђорђевић", "ĐORĐE Đ. Đorđević"],
        ["ĐORĐE Đ. Đorđević", "ĐORĐE Đ. Đorđević"],
        ["ЉИЉА Љ. Љиљановић", "LJILJA Lj. Ljiljanović"],
      ];

      examples.forEach(([input, expected]) => {
        expect(translit(input)).toBe(expected);
      });
    });
  });

  describe("translit with ascii", () => {
    it("transliterates Cyrillic to ASCII Latin", () => {
      const examples: Array<[string, string]> = [
        ["ЊЕГОШ", "NJEGOS"],
        ["Latinica", "Latinica"],
        ["Ђурђевак", "Djurdjevak"],
        ["Шабан Шаулић", "Saban Saulic"],
        ["електродистрибуција", "elektrodistribucija"],
        ["ЂОРЂЕ Ђ. Ђорђевић", "DJORDJE Dj. Djordjevic"],
        ["ĐORĐE Đ. Đorđević", "DJORDJE Dj. Djordjevic"],
        ["ЉИЉА Љ. Љиљановић", "LJILJA Lj. Ljiljanovic"],
      ];

      examples.forEach(([input, expected]) => {
        expect(translit(input, { to: "ascii" })).toBe(expected);
      });
    });
  });

  describe("translit with slug", () => {
    it("creates URL-friendly slugs from Cyrillic text", () => {
      const examples: Array<[string, string]> = [
        ["Карађорђева шницла", "karadjordjeva-snicla"],
        ["Шабан Шаулић", "saban-saulic"],
        ["ЊЕГОШ", "njegos"],
        ["Ђурђевак!", "djurdjevak"],
        ["Љубав је лепа", "ljubav-je-lepa"],
        ["  Вишак   размака  ", "visak-razmaka"],
        ["Чувар---чувареви", "cuvar-cuvarevi"],
      ];

      examples.forEach(([input, expected]) => {
        expect(translit(input, { to: "slug" })).toBe(expected);
      });
    });

    it("handles mixed Cyrillic and Latin text", () => {
      expect(translit("Београд - Belgrade", { to: "slug" })).toBe(
        "beograd-belgrade",
      );
      expect(translit("Café Ђерам", { to: "slug" })).toBe("cafe-djeram");
    });

    it("removes special characters", () => {
      expect(translit("Текст, са! интерпункцијом?", { to: "slug" })).toBe(
        "tekst-sa-interpunkcijom",
      );
    });

    it("handles empty and whitespace strings", () => {
      expect(translit("", { to: "slug" })).toBe("");
      expect(translit("   ", { to: "slug" })).toBe("");
    });
  });

  describe("alphabet", () => {
    it("returns the Serbian alphabet", () => {
      const letters = alphabet();
      expect(letters).toContain("A");
      expect(letters).toContain("Č");
      expect(letters).toContain("Ć");
      expect(letters).toContain("Dž");
      expect(letters).toContain("Đ");
      expect(letters).toContain("Lj");
      expect(letters).toContain("Nj");
      expect(letters).toContain("Š");
      expect(letters).toContain("Ž");
      expect(letters.length).toBe(30);
    });
  });
});
