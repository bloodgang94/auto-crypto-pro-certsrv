import { test as base } from "@playwright/test";
import { CertsrvPage } from "../pageObjects/certsrv";

export const test = base.extend<{ certsrvPage: CertsrvPage }>({
  certsrvPage: async ({ page }, use) => {
    await page.goto("/certsrv/certrqxt.asp");
    const certsrvPage = new CertsrvPage(page);
    await use(certsrvPage);
  },
});
