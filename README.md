# Product Inventory Dashboard (Split Structure)

A React + TypeScript + Tailwind app with a sane file structure, because future-you deserves mercy.

## Structure
```text
src/
├─ app/
│  └─ App.tsx
├─ components/
│  ├─ cards/ SummaryCard.tsx
│  ├─ feedback/ ErrorBanner.tsx, EmptyState.tsx, SkeletonGrid.tsx
│  ├─ modals/ ModalShell.tsx, ConfirmModal.tsx, LabeledInput.tsx, ProductModal.tsx
│  └─ products/ ProductCard.tsx, ProductTable.tsx, StatusBadge.tsx
├─ lib/
│  ├─ api.ts
│  ├─ format.ts
│  ├─ stock.ts
│  └─ storage.ts
├─ store/
│  ├─ reducer.ts
│  ├─ state.ts
│  └─ types.ts
├─ styles/
│  └─ index.css
├─ main.tsx
```

## Dev
```bash
pnpm i   # or npm i / yarn
pnpm dev
```
