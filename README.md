# Vue 3 + Cypress + vitest

## 專案架構

```
├── cypress // cypress 資料夾
│   ├── downloads
│   ├── e2e // e2e 入口
│   ├── fixtures // 放假資料
│   ├── support // 放邏輯
│   └── tsconfig.json // cypress 設定 ts 檔
├── cypress.config.ts // cypress 設定檔
├── cypress.d.ts // cypress 型別定義檔
├── components.d.ts // components 型別定義檔
├── index.html // 頁面入口
├── src
│   ├── components
│   │   └── __test__ // components 測試檔
│   ├── store
│   │   └── __test__ // pinia 測試檔
│   ├── utils
│   │   └── __test__ // utils 測試檔
├── tsconfig.json // ts 設定檔
└── vite.config.ts // vite 設定檔

```

## 專案安裝與執行

```bash
# Setup 安裝
pnpm install

## Cypress 執行（開兩個終端機分別執行以下）
pnpm dev
pnpm test:cy-com

## Vitest 執行
pnpm test:unit
pnpm test:watch
pnpm test:ui
## - 更新快照
pnpm test:update

# Development 執行
pnpm dev

# Production 生產
pnpm build
pnpm preview
```
