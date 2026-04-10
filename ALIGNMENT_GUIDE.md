---
version: 1.0
created: 2026-04-10
status: Active
title: Design Alignment Implementation Guide
---

# Design Alignment Guide — Claude Maturity Assessment → Dialpad Brand

This document provides a step-by-step implementation guide for aligning your Contact Center CX Maturity Assessment tool with Dialpad's design guidelines and brand standards.

---

## Quick Summary

**What:** Apply Dialpad's design system (Dialtone DT9) and brand guidelines to the existing assessment tool  
**Why:** Establish brand credibility, improve user trust, ensure consistency with Dialpad identity  
**Effort:** Medium (phased approach recommended)  
**Timeline:** 2-4 weeks depending on scope (recommend Phase 1 for MVP)  

---

## 1. Dialtone DT9 Component Migration

### Current State
- Custom Tailwind colors (brand purple: #a855f7)
- Generic HTML form controls
- Custom button styles
- No design system consistency

### Target State
- DT9 design tokens throughout
- DT9 component library (buttons, cards, form inputs, progress indicators)
- Consistent spacing, typography, shadows
- Professional, on-brand appearance

### Implementation Priority Order

#### **Priority 1: Foundation (Do First)**
1. **Color Palette Migration**
   - Replace custom purple with Dialpad's official brand color from DT9 tokens
   - Use DT9 semantic colors: primary, secondary, success, warning, error
   - Update Tailwind config to reference DT9 tokens
   - **Impact:** Immediate visual alignment, quick wins

2. **Typography**
   - Already using Inter font (✓ correct)
   - Verify font sizes, weights, line heights match DT9 specs
   - Update heading hierarchy to match Dialpad standards
   - **Impact:** Professional appearance, better readability

3. **Buttons & CTAs**
   - Replace all custom Button styles with DT9 Button component variant
   - Button variants: Primary, Secondary, Tertiary, Danger
   - Apply consistent padding, border radius, hover/active states
   - **Impact:** Core interaction pattern; high visibility

#### **Priority 2: Components (Do Next)**
4. **Form Controls**
   - Radio buttons & checkboxes → DT9 form input styles
   - Text inputs → DT9 input component
   - Proper focus states, error states
   - **Impact:** Better accessibility, consistent interactions

5. **Progress Indicators**
   - Current progress bar → DT9 progress component
   - Section indicators → DT9 step component
   - Clear visual feedback of completion status
   - **Impact:** Improves user confidence and engagement

6. **Cards & Containers**
   - Result cards → DT9 Card component
   - Consistent shadows, borders, spacing
   - **Impact:** Content organization clarity

7. **Spacing & Layout**
   - Apply DT9 spacing scale (4px base unit)
   - Consistent padding, margins, gaps
   - Responsive breakpoints matching DT9 specs
   - **Impact:** Visual consistency, professional polish

#### **Priority 3: Enhancement (If Time Allows)**
8. **Data Visualization**
   - If adding charts/gauges → use DT9 chart components or approved third-party
   - Match color scheme to DT9 palette
   - **Impact:** Rich results presentation

9. **Accessibility Enhancements**
   - ARIA labels on all form controls
   - Keyboard navigation: Tab order, Enter/Space for buttons
   - Screen reader testing
   - **Impact:** WCAG 2.1 AA compliance

---

## 2. Brand Voice Alignment

### Review & Update Copy

**Current Issues to Fix:**
- [ ] Generic button labels (if using "Submit") → more action-oriented ("Get Results")
- [ ] Unclear section descriptions → align with Dialpad brand voice (helpful, not condescending)
- [ ] Jargon without explanation → add inline definitions or tooltips
- [ ] Error messages → make helpful and clear, not alarming

**Tasks:**
1. Audit all text strings in the tool:
   - Button labels
   - Section titles and descriptions
   - Question preamble text
   - Error messages
   - Results messaging
   - Help/instructional text

2. Revise against `DP-General-brand-voice.md` checklist:
   - ✓ Helpful, not handholding
   - ✓ Real, not too formal
   - ✓ Welcoming, not overly familiar
   - ✓ Bold, not arrogant

3. Use Dialpad terminology:
   - "Contact center platform" (not "call center platform")
   - "Unified communications" (for UCaaS context)
   - Product terms match dialpad.com

**Example Improvements:**

| Before | After | Reason |
|--------|-------|--------|
| "Submit" | "Get Results" | Action-oriented, clearer intent |
| "Select one" | "Choose the best fit for your organization" | Helpful, respected user intelligence |
| "Error: Invalid input" | "We couldn't process that. Please check and try again." | Clear, helpful, not scary |
| "call center capabilities" | "contact center platform capabilities" | On-brand terminology |

---

## 3. File Structure & Implementation Plan

### Recommended Approach: Incremental Refactoring

```
Current structure (index.html):
└── All code in single HTML file with inline React JSX

Recommended structure (for easier maintenance):
├── public/
│   └── index.html (minimal, just root div)
├── src/
│   ├── components/
│   │   ├── AssessmentForm.jsx
│   │   ├── SectionCard.jsx
│   │   ├── ProgressIndicator.jsx
│   │   └── ResultsReport.jsx
│   ├── styles/
│   │   ├── tokens.css (DT9 tokens)
│   │   └── tailwind.config.js (updated with DT9)
│   ├── data/
│   │   └── sections.js (questions, copy)
│   └── App.jsx
└── package.json
```

**Why?** 
- Easier to apply DT9 components incrementally
- Simpler to test and verify changes
- Better for future maintenance
- Supports adding testing, linting, build tools

---

## 4. Step-by-Step Implementation

### Phase 1: Design System Foundation (Week 1-2)

**Step 1: Set Up DT9 Design Tokens**
- [ ] Document Dialpad's DT9 color palette (request from design team)
- [ ] Create `tokens.css` with CSS custom properties
- [ ] Update `tailwind.config.js` to use DT9 colors
- [ ] Example:
  ```css
  :root {
    --color-primary-600: #2563eb;
    --color-primary-50: #eff6ff;
    --color-success-600: #16a34a;
    --color-error-600: #dc2626;
    /* ... more tokens ... */
  }
  ```

**Step 2: Audit Current Components**
- [ ] List all UI elements in current tool:
  - Buttons (how many types?)
  - Form controls (radio, checkbox, inputs)
  - Cards/containers
  - Progress indicators
  - Alerts/messages
- [ ] Map each to nearest DT9 equivalent
- [ ] Document gaps (elements not in DT9?)

**Step 3: Replace Buttons**
- [ ] Create DT9-aligned Button component
- [ ] Replace all button calls with new component
- [ ] Update button labels to be action-oriented
- [ ] Test hover, active, disabled states

**Step 4: Update Colors & Tokens**
- [ ] Replace inline `bg-purple-600` with CSS variables or DT9 component classes
- [ ] Update form input styling
- [ ] Verify contrast ratios meet WCAG AA
- [ ] Test on light & future dark mode scenario

### Phase 2: Structure & Copy (Week 2)

**Step 5: Refactor Copy**
- [ ] Audit all text in code
- [ ] Revise against brand voice guide
- [ ] Update button labels, section descriptions, error messages
- [ ] Document changes for consistency

**Step 6: Improve Form Controls**
- [ ] Replace default checkbox/radio with DT9 styled inputs
- [ ] Add proper ARIA labels
- [ ] Verify keyboard navigation works
- [ ] Test with screen reader

**Step 7: Enhance Results Presentation**
- [ ] Style result cards with DT9 Card component
- [ ] Apply consistent spacing/padding
- [ ] Add visual hierarchy (headings, emphasis)
- [ ] Consider adding result gauge/progress visualization

### Phase 3: Polish & Accessibility (Week 3)

**Step 8: Accessibility Audit**
- [ ] Test keyboard navigation (Tab, Enter, Space, Arrow keys)
- [ ] ARIA labels on all interactive elements
- [ ] Focus indicators visible and clear
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Color contrast check (aXe, Lighthouse)

**Step 9: Responsive Design Testing**
- [ ] Desktop (1024px+): verify layout, spacing
- [ ] Tablet (768-1023px): test touch targets, flows
- [ ] Mobile (320-767px): ensure readability, zoom at 200%
- [ ] Test form inputs on mobile (zoom, autofill)

**Step 10: Cross-Browser Testing**
- [ ] Chrome, Safari, Firefox, Edge
- [ ] Verify components render correctly
- [ ] Check for layout shifts, missing fonts

---

## 5. DT9 Component Mapping Reference

### Current Component → DT9 Equivalent

| Element | Current | DT9 Component | Notes |
|---------|---------|---------------|-------|
| Section button | Custom style | `DT9.Button` (Primary/Secondary) | Use Primary for main action |
| Progress bar | Custom SVG | `DT9.ProgressBar` or `DT9.StepIndicator` | Consider step indicators for sections |
| Radio group | `<input type="radio">` | `DT9.RadioGroup` | Better styling, accessibility |
| Metric display | Div + color | `DT9.Card` + `DT9.Stat` | Structured metric presentation |
| Status badge | Span + color | `DT9.Badge` | For maturity level indicators |
| Alert message | Div + style | `DT9.Alert` | For errors, warnings, success |

---

## 6. Checklist: Ready for Design Handoff

### Design System Compliance
- [ ] All colors use DT9 palette
- [ ] Typography matches DT9 specs (Inter, sizes, weights)
- [ ] Spacing follows DT9 scale (multiples of 4px)
- [ ] Buttons use DT9 Button component
- [ ] Form controls use DT9 styles
- [ ] Cards/containers use DT9 Card component
- [ ] Icons use DT9 icon set or approved SVG library

### Brand Voice
- [ ] All copy reviewed against brand voice guide
- [ ] Button labels are clear and action-oriented
- [ ] Error messages are helpful, not scary
- [ ] Terminology matches Dialpad standards
- [ ] No jargon without explanation

### Accessibility (WCAG 2.1 AA)
- [ ] All interactive elements keyboard accessible
- [ ] ARIA labels on form controls, buttons, regions
- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Focus indicators visible
- [ ] No reliance on color alone to convey meaning
- [ ] Tested with screen reader

### Responsive Design
- [ ] Desktop layout (1024px+) tested
- [ ] Tablet layout (768-1023px) tested
- [ ] Mobile responsive (320px+) tested
- [ ] Touch targets ≥ 44px
- [ ] Zoom to 200% readable

### Documentation
- [ ] Design Brief completed (DESIGN_BRIEF.md)
- [ ] Component mapping documented
- [ ] Any deviations from DT9 approved by Design Lead
- [ ] Copy revisions tracked
- [ ] Accessibility audit results documented

---

## 7. Resources

### Design Guidelines (Reference from workspace)
- **Brand Voice:** `01_context/company/DP-General-brand-voice.md`
- **Design System:** `01_context/design-system/DP-General-component-library.md`
- **Design Tenets:** `11_design/DP-Design-design-tenets.md`
- **Dialtone Docs:** `11_design/` directory (Figma 101, design tools, etc.)

### External Resources
- **Dialtone Design System:** [Request link from design team]
- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **Tailwind CSS:** https://tailwindcss.com/
- **Web Accessibility Best Practices:** https://www.w3.org/WAI/TIPS/

---

## 8. Common Questions

**Q: Do I need to hire a designer?**  
A: A design review is recommended to validate the component choices and verify brand alignment. The Designer on the brief should conduct the review.

**Q: Can I use custom components if DT9 doesn't have what I need?**  
A: Document the need and get approval from the Design Lead before creating custom components. This prevents design system fragmentation.

**Q: How long will this take?**  
A: Phase 1 (foundation): 1-2 weeks. Phase 2 (all components): 2-4 weeks. Depends on team size and complexity of refactoring.

**Q: Should I refactor to modular components (React components)?**  
A: **Recommended for sustainability.** The current single-file approach is difficult to maintain. A modular structure makes applying DT9 components easier and supports testing.

**Q: What about dark mode?**  
A: Out of scope for v1. Plan DT9 dark mode token support in architecture so future implementation is easier.

---

## 9. Next Steps

1. **Review this guide** with your team
2. **Assign roles:** Who owns design audit? Who does implementation? Who tests?
3. **Request DT9 Access:** Contact design team for Dialtone component specs, color tokens, asset library
4. **Set timeline:** Aim for Phase 1 completion within 2 weeks for MVP
5. **Schedule kickoff:** Design, PM, Engineering alignment on scope and approach
6. **Start with Quick Wins:** Button and color updates first (visible progress, builds momentum)

---

**Document Created:** 2026-04-10  
**Responsibility:** Design & Engineering Team  
**Status:** Ready for Kickoff  
