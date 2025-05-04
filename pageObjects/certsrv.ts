import { Download, Page } from "@playwright/test";

export class CertsrvPage {
  constructor(private readonly page: Page) {}

  async requestCert(base64: string): Promise<Download> {
    await this.page.goto("/certsrv/certrqxt.asp");
    await this.page.getByTestId("locTaRequest").fill(base64);
    await this.page.getByTestId("btnSubmit").click();
    await this.page.getByTestId("locB64Enc0").click();
    const task = this.page.waitForEvent("download");
    await this.page.getByText("Загрузить сертификат").click();
    const download = await task;
    return download;
  }
}
