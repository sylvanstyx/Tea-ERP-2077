# AGENTS.md — 04-01 進銷存系統 2077 開發規範與架構基準

## 1. 安全邊界（不可違反）
- **絕對禁止**存取或修改 `07-01 進銷存系統 2021` 原檔或任何非授權資料夾。
- 唯一資料底稿為 Google Drive 資料夾 `04-01 進銷存系統 2077`（`1fIlboRow-kB8wgDiHQgayVfdo_pCVvIT`）內之純數值試算表：
  - **Master DB Spreadsheet ID**: `1hCS3jMWU0sPmXQ-AU-VUJ65syoKr5Q1BXvjZz-1r75g`
  - **設計原則**：11 張工作表皆為**純數值、零公式**，所有計算、成本分攤、庫存扣減與 DAG 局部重算皆由 GAS 後端執行。

## 2. 系統架構（Solution B）
- **前端**：GitHub Pages 靜態網站（`/docs` 目錄，HTTPS），透過 `fetch` 呼叫 GAS Web App。
- **後端**：Google Apps Script（`/gas` 目錄），所有請求使用 `Content-Type: text/plain`（避免 CORS preflight），回傳 JSON。
- **驗證機制**：`API_TOKEN` 存於 GAS `ScriptProperties` 與瀏覽器 `localStorage`，每次 `doPost` / `doGet` 皆須驗證。

## 3. Master DB 11 張工作表結構
1. `Sys_Config`：國別代碼、儲位（`Location_Type`: `Internal` / `Subcontractor` / `Consignment_Out`）、單位。
2. `Suppliers`：供應商主檔（187 筆）。
3. `Customers`：客戶主檔（173 筆，含快取 `Last_Order_Date`、`Avg_Reorder_Days`、`Unpaid_AR`）。
4. `Products_SKU`：三層品項主檔（`Product_ID` -> `SKU_ID`，含 `Inventory_Mode`: `STRICT` / `BACKFLUSH` / `EXPENSE`、`Purchase_Pack_Qty`、`Safety_Stock`、`Retail_Price_2026`、`BOM_Template`）。
5. `Active_Batches`：熱資料快照（主鍵 `Stock_ID = Batch_ID::Location_ID`，含 `Ownership_Type`: `Owned` / `Consignment_In`、`Consignment_Terms`、`Tare_Container`）。
6. `Purchases_Log`：進貨與受託寄賣入庫（`i` / `ci`）。
7. `Production_Log`：1NF 垂直結構（`Job_ID` 搭配 `Row_Type`: `INPUT` / `RETURN` / `OUTPUT_MAIN` / `OUTPUT_BYPRODUCT` / `LOSS` / `QC_SAMPLE`），支援餘料退回與 >100% 產量同步。
8. `Sales_Log`：銷貨與寄賣結算（`o`）。
9. `Inventory_Adjustments`：品管樣品、客樣、秤差、報廢、五模式盤點與歷史清洗紀錄。
10. `All_Batches_Archive`：已結案歸零批次（註：`BACKFLUSH` 負數暫留 `Active_Batches` 待下次進貨或整批核銷）。
11. `System_Audit_Log`：系統稽核日誌。

## 4. 裝置適配階段
- **步驟 4（優先）**：MacBook Pro 桌面版完整功能。
- **步驟 5**：Samsung S24 Ultra（觸控 + 相機條碼掃描）與 Bigme B10 電子紙平板（零動畫、純黑白 `#000`/`#FFF`、`2px` 實線邊框、分頁按鈕、`150ms` 搜尋防抖）。
