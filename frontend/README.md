# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Welcome to our project "CRM for TTPR"

First, before you start to code, run 'npm i' first to install all dependencies.
Then, you can run "npm run dev"

### folder structure
- src/public is for static files, if you need some images to store, you can store there
- src/components/ui folder is for installed shadcn components, you should not be creating one there.
- src/components/common is for your created components which are to reuse very often (like navbar, footer)
- src/pages/ is for react pages 
- src/styles/ is for all css related
- src/utils/ is for utility functions and classes (like to fetch data)
- src/hooks/ is for custom react hooks

### the most common folders you gonna need
- src/pages to create your route or page (like /signIn page)
- in src/main.jsx, import your route and add it like how I added App component
- in all jsx files, (whether components or pages) it has to be a javascript function, and it needs to be exported
- for pages (it should be export default, but for components, not necessarily)

### basic template for react components or pages

import React from 'react'
function YourPageName(){
 return (<>
 // here comes all your normal html stuff
</>)
}
export default YourPageName

### used libraries and tools
- shadcn ui (https://ui.shadcn.com/docs/components)
- tailwindcss (https://tailwindcss.com/docs/columns)
- lucide-react for icons (https://lucide.dev/guide/packages/lucide-react)
