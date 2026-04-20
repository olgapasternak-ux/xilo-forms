# XILO Forms Dashboard

Pixel-perfect replica of the XILO Forms admin dashboard page built with React + TypeScript + Tailwind CSS.

## Tech Stack

- **Vite** — build tool & dev server
- **React 18** + **TypeScript** — UI framework
- **Tailwind CSS v3** — utility-first styling
- **lucide-react** — icons

## Getting Started

### Prerequisites

Make sure you have **Node.js 18+** installed. You can download it from https://nodejs.org.

### Install & Run

```bash
cd xilo-forms
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx          # Left icon navigation bar
│   │   ├── TopHeader.tsx        # Page title + user info + logout
│   │   └── PageLayout.tsx       # Root layout wrapper
│   ├── forms/
│   │   ├── FormsPage.tsx        # Main page — state & filtering logic
│   │   ├── FormsToolbar.tsx     # Create Group / Share / +New Form buttons
│   │   ├── FormTypeFilters.tsx  # All Forms / Customer Form / Intake Form pills + search
│   │   ├── FormGroupTabs.tsx    # Group tab pills row
│   │   ├── FormsTable.tsx       # Full data table with sticky header
│   │   ├── FormRow.tsx          # Single table row with hover actions
│   │   ├── FormActionsMenu.tsx  # Three-dot context dropdown menu
│   │   ├── FormIcon.tsx         # Form icon resolver
│   │   ├── FormTypeBadge.tsx    # Intake Form / Customer Form badge
│   │   ├── GroupTag.tsx         # Group pill tag
│   │   └── UserBadge.tsx        # Created by badge
│   └── ui/
│       ├── Button.tsx           # primary / outline / ghost variants
│       ├── Checkbox.tsx         # Accessible checkbox
│       ├── SearchInput.tsx      # Debounced search input
│       ├── Pill.tsx             # Generic pill/tab component
│       └── DropdownMenu.tsx     # Dropdown container + items
├── data/
│   └── mockForms.ts             # 10 sample forms + group tab list
├── types/
│   └── index.ts                 # TypeScript interfaces
├── App.tsx
├── main.tsx
└── index.css
```

## Features

- **Type filtering** — All / Customer Form / Intake Form
- **Group tab filtering** — filter by form group with Show More/Less
- **Debounced search** — 200ms debounce on name search
- **Row hover actions** — Open, Copy, three-dot menu appear on hover
- **Context menu** — Edit, Share, Create Link, Duplicate As (with submenu arrow), Delete
- **Bulk selection** — header checkbox selects/deselects all visible rows
- **+New Form dropdown** — choose Intake Form or Customer Form type
- **Horizontal scroll** — table scrolls horizontally on narrow viewports
- **Keyboard accessible** — all interactive elements have focus rings + ARIA attributes
