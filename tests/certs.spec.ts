import { test } from "../fixtures/base";
import * as fs from "fs/promises";
import path from "path";

const ext = ".cer";

test("get certs", async ({ certsrvPage }) => {
  const files = await fs.readdir("./csr", { withFileTypes: true });
  for (const file of files) {
    const pem = (
      await fs.readFile(`${path.join(file.parentPath, file.name)}`, "utf8")
    )
      .replaceAll(/-----.*-----/g, "")
      .trim();

    const download = await certsrvPage.requestCert(pem);
    await download.saveAs(
      `${path.join("result", `${path.parse(file.name).name}` + ext)}`
    );
  }
});
