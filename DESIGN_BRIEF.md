---
version: 1.0
created: 2026-04-10
change_summary: "Initial design brief for alignment with Dialpad design guidelines"
status: Active
---

# Design Brief — Contact Center CX Maturity Assessment Tool

> **Overview:** This design brief outlines the alignment of the Contact Center CX Maturity Assessment tool with Dialpad's design guidelines, brand voice, and component library. The goal is to ensure the tool reflects Dialpad's identity while providing an intuitive assessment experience.

---

## Header

| Field | Value |
|---|---|
| Feature Name | Contact Center CX Maturity Assessment Tool |
| Core Area | Ecosystem / SharedServices |
| PM | TBD |
| Designer | TBD |
| JIRA Epic | Not yet created |
| Design Start Date | TBD |
| Target Gate 1 | TBD |

---

## 1. Problem Statement *(required)*

Contact center leaders lack a structured way to evaluate their current technology maturity and identify gaps against industry best practices. The existing assessment tool uses generic styling that doesn't reflect Dialpad's brand identity and may confuse users about whether this is an official Dialpad offering. By redesigning the tool to align with Dialpad's design system (Dialtone), we establish trust, consistency, and professional credibility while improving the assessment experience.

---

## 2. Jobs to Be Done *(required)*

| # | JTBD Statement |
|---|---|
| 1 | When evaluating my contact center technology stack, I want to understand our maturity level objectively so I can identify investment priorities. |
| 2 | When completing the assessment, I want clear visual feedback on my progress so I can maintain engagement through all sections. |
| 3 | When viewing results, I want detailed insights on my gaps so I can plan my next steps toward modernization. |

---

## 3. Target Personas *(required)*

| Persona | Primary / Secondary | Key need in this context |
|---|---|---|
| Contact Center Manager | Primary | Needs objective assessment without jargon; wants actionable insights on technology readiness |
| IT Director | Primary | Needs technical depth on infrastructure and integration capabilities; values precision in evaluations |
| VP of Operations | Secondary | Needs business context and ROI implications; wants to understand competitive positioning |

---

## 4. Scope *(required)*

**What Design must cover:**
- Surface(s): 
  - [x] Web app (primary — desktop and tablet responsive)
  - [ ] Mobile (optimize for tablet, mobile-responsive design required)
  - [ ] Admin portal
  - [x] Results/report section (interactive and downloadable)

- States:
  - [x] Empty (initial state / new assessment start)
  - [x] In-progress (active section, saved progress)
  - [x] Loading (data processing for results calculation)
  - [x] Results/completion (final report view)
  - [x] Error (validation errors, network issues)
  - [x] Partial data (incomplete responses, section skipped)

- Edge cases to design for:
  - Users with accessibility needs (WCAG 2.1 AA minimum)
  - Long assessment sessions with navigation back/forward through sections
  - Print and PDF export of results
  - Users clicking results before completing all sections
  - Different screen sizes (desktop, tablet) with maintained UX quality

**What is explicitly NOT in scope for this design:**
- Backend infrastructure or API modifications
- Third-party integrations (Salesforce, HubSpot, etc.)
- Multi-language localization (English only for v1)
- Mobile-first design (tablet and desktop priority; mobile responsive but not optimized)
- Advanced data analytics or admin dashboard
- Email notifications or integrations

---

## 5. Business Context *(required)*

**Business driver:**

This assessment tool serves as a lead-generation and qualification mechanism for Dialpad's contact center platform. By providing structural, objective evaluation, we position Dialpad as a trusted partner in digital transformation. Aligning the tool with Dialpad's design system reinforces brand credibility and supports the Rebrand 2025 initiative (Dialtone DT9).

**Success metrics Design should optimize for:**

| Metric | Current | Target |
|---|---|---|
| Assessment completion rate | To be measured | 75%+ (reduce drop-off, improve UX clarity) |
| Time to complete assessment | ~8-12 minutes | Maintain or reduce to 7-10 min (streamlined flow) |
| User confidence in results (satisfaction) | To be measured | 4.0+/5.0 (clear guidance, professional presentation) |
| Brand alignment perception | Off-brand (current) | On-brand (Dialtone DT9, consistent with Dialpad.com) |

---

## 6. Constraints & Requirements *(required)*

| Type | Requirement |
|---|---|
| Dialtone | MUST use DT9 Component Library + DT9 Design Tokens (Rebrand 2025). See: `01_context/design-system/DP-General-component-library.md` |
| Accessibility | WCAG 2.1 AA minimum. All form controls, progress indicators, and results must be keyboard navigable and screen-reader compatible. |
| Responsive | [x] Desktop (1024px+) [x] Tablet (768-1023px) [x] Mobile responsive (320px+) but Tablet/Desktop optimized |
| Dark mode | [ ] Not required for v1 (may be future phase) |
| Localization | [x] English only for v1. Future phases may include multi-language support. |
| Brand voice | Align with `DP-General-brand-voice.md` — helpful (not handholding), real (business-casual), welcoming, bold. Button labels, error messages, and guidance text must follow Dialpad's brand voice. |
| Engineering constraint | Must work with existing React codebase; no major architecture refactoring required. Tailwind CSS allowed but should integrate with DT9 tokens. |

---

## 7. Research & Insights *(if available)*

| Signal type | Key finding | Source |
|---|---|---|
| User feedback | Assessment drop-off occurs at infrastructure section due to jargon | To be gathered from analytics if available |
| Design consistency | Current tool uses generic purple (#a855f7) rather than official Dialpad brand colors | Visual audit completed |
| Competitive reference | Competitors' tools (e.g., Twilio, AWS assessments) use clear progress indicators and results visualization | Competitive analysis to confirm |
| Brand alignment | Tool does not feel like official Dialpad offering due to generic styling | Brand perception interviews recommended |

---

## 8. Competitive Reference *(if applicable)*

| Competitor | Their approach | Notes |
|---|---|---|
| Twilio Assessment | Clear step-by-step flow, visual progress bars, results presented as maturity levels with recommended paths | Learn: clear navigation, progressive disclosure |
| AWS Well-Architected Review | Detailed results with actionable recommendations grouped by pillar | Learn: actionable insights, structured results |
| Gartner Assessments | Executive summary + detailed reports, professional branding throughout | Learn: polish, credibility, report quality |

---

## 9. Prior Art & Related Work *(if applicable)*

- **Dialtone Design System:** Reference DT9 components for buttons, cards, progress indicators, form controls
  - Component specs: `01_context/design-system/DP-General-component-library.md`
  - Design tokens: Dialpad's approved color palette, typography, spacing, shadows
- **Related Dialpad UX patterns:**
  - Multi-step form flows (similar to onboarding)
  - Results/report presentation (similar to analytics dashboards in Dialpad platform)
  - Assessment-style patterns in Support onboarding
- **Design Studio references:** TBD (if existing maturity assessment designs exist)

---

## 10. Timeline & Milestones

| Milestone | Target Date |
|---|---|
| Design exploration complete (wireframes, component mapping) | TBD |
| Design review with Design Lead | TBD |
| Dialtone component integration plan finalized | TBD |
| High-fidelity mockups ready for review | TBD |
| Gate 1 deck ready | TBD |
| Gate 1 with EPD Staff | TBD |
| Design handoff to Engineering | TBD |

---

## 11. Open Questions for Design

| # | Question | Who answers |
|---|---|---|
| D-1 | Should we redesign all sections with Dialtone components, or phase the redesign (high-impact sections first)? | Design + Engineering |
| D-2 | What is the priority order of components to migrate (buttons, cards, progress, form inputs, etc.)? | Design + PM |
| D-3 | Should the results page include data visualization (charts/graphs)? If yes, what Dialtone charting components are available? | Design |
| D-4 | Is dark mode a future phase? If so, should component migration plan account for dark mode support? | PM + Design |
| P-1 | What is the primary call-to-action after assessment completion? (CTA: demo request, download report, contact sales?) | PM |
| P-2 | Should users be able to save and resume assessments mid-way, or is single-session completion expected? | PM |
| P-3 | Are there analytics requirements to track user progress, section drop-off, or result distributions? | PM |
| D-4 | What is the preferred layout for presenting results — single-page report, tabbed sections, or expandable cards? | Design + PM |

---

## 12. Design Principles for This Project

**Align with Dialpad's Design Philosophy:**

1. **Clarity:** Use clear language (per brand voice), avoid jargon when possible, explain assessment criteria upfront
2. **Confidence:** Visual progress, clear feedback, results that feel authoritative (professional design)
3. **Consistency:** Every interaction uses Dialtone components; spacing, colors, typography match Dialpad.com
4. **Accessibility:** Keyboard navigation, screen reader support, high contrast (WCAG AA+)
5. **Efficiency:** Streamlined flow, progress visibility, quick results (respect user time)

---

## 13. Implementation Roadmap

### Phase 1: Foundation (Recommended for v1)
- [ ] Audit current design against Dialtone DT9
- [ ] Map existing components to nearest DT9 equivalents
- [ ] Replace custom colors with DT9 design tokens
- [ ] Update typography to match Dialpad brand (Inter font, DT9 sizes)
- [ ] Redesign buttons, form controls, cards using Dialtone components

### Phase 2: Enhancement (Optional for v1 or v2)
- [ ] Implement data visualization for results (charts, gauge progress)
- [ ] Add PDF export functionality with branded report layout
- [ ] Enhance results presentation with personalized recommendations
- [ ] Implement account linking / result history tracking

### Phase 3: Future (v2+)
- [ ] Dark mode support
- [ ] Multi-language localization
- [ ] Mobile-first optimization
- [ ] Advanced analytics dashboard

---

## 14. Brand Voice Checklist

Before finalizing design, ensure all copy and microcopy follows `DP-General-brand-voice.md`:

- [ ] Button labels are action-oriented ("Get Results" vs "Submit")
- [ ] Error messages are clear and helpful, not scary
- [ ] Instructional copy is plain-spoken, not formal
- [ ] Support/help text is brief, not over-explanatory
- [ ] Assessment questions avoid jargon or define terms clearly
- [ ] Results messaging is confident but not arrogant
- [ ] Terminology aligns with Dialpad's approved terms (e.g., "contact center platform" not "call center platform")

---

## 15. Success Criteria

Design will be considered successful when:

✓ All UI components use Dialtone DT9 library  
✓ Color palette matches Dialpad brand (no custom colors)  
✓ Typography and spacing follow DT9 tokens  
✓ Assessment completion rate meets or exceeds 75%  
✓ WCAG 2.1 AA accessibility standards met  
✓ Users perceive tool as official, trustworthy Dialpad offering (brand perception survey)  
✓ Response-time targets maintained (load, transition smoothness)  

---

> **Next Steps:**
> 
> 1. **For PM:** Confirm business priorities, timeline, and success metrics. Answer product questions (P-1, P-2, P-3).
> 2. **For Design:** Review brief, conduct Dialtone component audit, propose phased implementation approach.
> 3. **For Engineering:** Assess feasibility of Dialtone integration into existing React codebase. Provide technical constraints or recommendations.
> 4. **Kickoff Meeting:** Design + PM + Engineering to align on Phase 1 scope and timeline.

---

**Document Status:** Ready for Design Review  
**Last Updated:** 2026-04-10  
**Owner:** Design Team  
