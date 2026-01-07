# Hasif – Project Tasks

> Goal:
> A learning-focused project to deeply practice Accessibility, Testing,
> Clean Code, Animations, and scalable Architecture.

---

## ✅ Today Tasks

> Tasks I plan to work on today (max 3–5)

---

## ♿ Accessibility (A11y)

> Highest priority – foundation for everything else

### Semantics

### Keyboard & Focus

### Screen Readers

---

## 🧪 Testing

> Comes after Accessibility

### Unit & Integration

### Accessibility Tests

### UX / Behavior

- [ ] Test loading states
- [ ] Snapshot test for Word Card

---

## 🎞 Animations

> Only after A11y & Testing foundations

### Core Animations

### Architecture

- [ ] Centralize animation tokens (duration, easing)
- [ ] Separate animation logic from UI logic

### Advanced

- [ ] Shared element transition (list → details)
- [ ] GSAP experiment for word transitions

---

## 🧼 Clean Code

> Continuous improvement tasks

### Code Quality

- [ ] Remove non-null assertions (`!`)
- [ ] Avoid unnecessary `useEffect`
- [ ] Extract repeated logic into hooks

### Naming & Structure

- [ ] Consistent file naming
- [ ] Improve variable and function naming
- [ ] Avoid generic names (`data`, `item`, `handle`)

### Tooling

- [ ] Strict ESLint rules
- [ ] Disable `any`
- [ ] Auto-format imports

---

## 🏗 Architecture & Scalability

> Prepare project to grow safely

### Structure

- [ ] Feature-based folder structure
- [ ] Separate domain logic from UI
- [ ] No direct API calls inside components

### Data Flow

- [ ] Central data-fetching layer
- [ ] Unified loading & error strategy
- [ ] Error boundaries per feature

### Reusability

- [ ] Reusable hooks for domain logic
- [ ] Reusable UI primitives

---

## 🧠 Long-Term Tasks / Ideas

> Write them down before forgetting

- [ ] Implement settings page
- [ ] Adaptive learning based on favorites
- [ ] Shareable word image generation
- [ ] Offline support
- [ ] User accounts
- [ ] Analytics for Word of the Day
- [ ] Progressive Web App (PWA)

---

## 📌 Rules for Adding Tasks

- Tasks must teach a concept OR improve quality
- Avoid feature bloat
- Prefer depth over quantity

## ✅ Completed

### 2026-01-07

- [x] Animate Word of the Day transition
- [x] Random Word button micro-interaction
- [x] Favorite button micro-interaction
- [x] Animate Wrods list and Favorites list

### 2025-12-30

- [x] Test Word Card rendering
- [x] Accessibility test for Home page

### 2025-12-29

- [x] Remove meaningless `div` usage
- [x] Ensure only one `h1` per page
- [x] Escape key closes dialogs
- [x] Focus trap in modal / bottom sheet

### 2025-12-28

- [x] Add search box in Word's page
- [x] Add debounce to search in words list

### 2025-12-27

- [x] Setup React Testing Library
- [x] Setup axe-vitest and axe-core for A11y testing
- [x] Test `useTodayWord` hook

### 2025-12-25

- [x] Write to-do list for the most things in the project
- [x] Accessibility audit for all pages
- [x] Add aria-labels to icon-only buttons
- [x] Fix heading hierarchy
- [x] Add aria-labels to icon-only buttons
- [x] Full keyboard navigation support
