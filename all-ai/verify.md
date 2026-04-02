# Verification Checklist

## UI/UX Quality
- [ ] **Aesthetics**: Does the site feel premium and match Futurepedia's quality?
- [ ] **Typography**: Are Outfit (headings) and Inter (body) fonts correctly applied?
- [ ] **Glassmorphism**: Do the header and cards have the intended blur effects?
- [ ] **Responsive**: Is the site usable and attractive on mobile devices (Hamburger menu works)?

## Functionality
- [ ] **Category Filtering**: Does clicking a category filter the tools on Home/AIAgent?
- [ ] **Bookmarking**: 
    - [ ] Icon changes state on click.
    - [ ] State persists after page refresh (Local Storage).
    - [ ] Alert modal appears when unsaving.
- [ ] **Navigation**: 
    - [ ] Header links lead to correct pages.
    - [ ] "Explore All" links work as expected.
- [ ] **Header Scroll**: Performance and visual snap of the header shrinking/coloring on scroll.
- [ ] **Video Modals**: YouTube videos open correctly in the modal window.

## Code Quality
- [ ] No significant lint errors in console.
- [ ] Standard properties used (e.g. `line-clamp` next to `-webkit-line-clamp`).
- [ ] No dead code/placeholder images in finalized sections.
