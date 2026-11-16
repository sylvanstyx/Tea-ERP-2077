# 香契 進銷存系統 2077

五階茶葉溯源與微小型 ERP 系統（GitHub Pages + Google Apps Script + 純數值 Google Sheets Master DB）。

## 目錄結構
- `AGENTS.md`：系統規格與 AI 協作規範基準
- `gas/`：Google Apps Script 後端 API
- `docs/`：GitHub Pages 前端介面
- `.github/workflows/deploy-gas.yml`：推送 `main` 時自動以 `clasp` 部署至 GAS

## 一次性設定清單（約 3 分鐘）
1. **GitHub**：建立私有或公開 Repository（建議 Private，或若用免費版 GitHub Pages 可用 Public，前端不含任何敏感資料，所有帳務資料皆由 `API_TOKEN` 保護），將本機專案推送至 `main`，並於 GitHub **Settings -> Pages** 將來源設為 `main` 分支的 `/docs` 資料夾。
2. **Google Apps Script**：在 Google Drive `04-01 進銷存系統 2077` 資料夾內新增一個 Apps Script 專案，於「專案設定 -> 指令碼屬性」新增 `API_TOKEN`（自訂一組高強度密碼），並取得「指令碼 ID（Script ID）」。
3. **選擇部署方式（二選一）**：
   - **最佳化免裝本機環境（推薦）**：在 GitHub Repo 的 **Settings -> Secrets and variables -> Actions** 填入 `GAS_SCRIPT_ID` 與 `CLASPRC_JSON`，之後每次 `git push` 即自動雲端部署 `clasp push`。
   - **本機終端機部署**：若希望從 Mac 直接執行 `clasp push`，於本機安裝 Node.js 與 `@google/clasp`（`brew install node && npm i -g @google/clasp && clasp login`）。
