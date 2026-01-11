# Implementation Tasks

## Phase 1: Data & State Management

### Task 1.1: Create Design Data Store
- [ ] Create `client/src/data/designs.ts`
- [ ] Define `DesignPrototype` interface
- [ ] Add 4 sample designs for each category (20 total)
- [ ] Use real Unsplash images for design thumbnails
- [ ] Export helper function `getDesignsByCategory()`

### Task 1.2: Create Design Selection Context
- [ ] Create `client/src/contexts/DesignSelectionContext.tsx`
- [ ] Define `SelectedDesign` interface
- [ ] Implement context with localStorage persistence
- [ ] Create `useDesignSelection` hook
- [ ] Add methods: `selectDesign()`, `clearSelection()`

### Task 1.3: Add Context Provider
- [ ] Update `client/src/App.tsx`
- [ ] Wrap app with `DesignSelectionProvider`
- [ ] Test context availability in components

## Phase 2: Stack Component Enhancement

### Task 2.1: Update Stack Component Props
- [ ] Add `designs` prop (array of DesignPrototype)
- [ ] Add `onDesignSelect` callback prop
- [ ] Update TypeScript interfaces

### Task 2.2: Add Selection Visual Feedback
- [ ] Create selection overlay component
- [ ] Add checkmark icon on selection
- [ ] Add hover tooltip "Select this design"
- [ ] Implement 1-second delay before navigation

### Task 2.3: Update Category Pages
- [ ] Update `client/src/pages/professional.tsx`
- [ ] Update `client/src/pages/gaming.tsx`
- [ ] Update `client/src/pages/startups.tsx`
- [ ] Update `client/src/pages/api-backends.tsx`
- [ ] Update `client/src/pages/stackweb-projects.tsx`
- [ ] Pass design data to Stack component
- [ ] Implement selection handler with navigation

## Phase 3: Form Integration

### Task 3.1: Update Form to Display Selected Design
- [ ] Update `client/src/pages/start-project.tsx`
- [ ] Use `useDesignSelection` hook
- [ ] Create selected design display card
- [ ] Add "Clear Selection" button
- [ ] Position design card prominently

### Task 3.2: Include Design in Form Submission
- [ ] Update form state to include design fields
- [ ] Add design data to submission payload
- [ ] Clear selection after successful submission
- [ ] Handle null design gracefully

## Phase 4: Database & Backend

### Task 4.1: Update Database Schema
- [ ] Update `supabase-schema.sql`
- [ ] Add `selected_design_id` column
- [ ] Add `selected_design_title` column
- [ ] Add `selected_design_category` column
- [ ] Add `selected_design_image_url` column
- [ ] Run migration on Supabase

### Task 4.2: Update TypeScript Types
- [ ] Update `shared/schema.ts`
- [ ] Add design fields to `projects` table schema
- [ ] Update `insertProjectSchema` validation
- [ ] Update `InsertProject` type
- [ ] Update `Project` type

### Task 4.3: Update Storage Methods
- [ ] Update `server/storage.ts`
- [ ] Update `insertProject()` to handle design fields
- [ ] Update `getAllProjects()` to return design fields
- [ ] Handle snake_case to camelCase conversion

### Task 4.4: Update API Routes
- [ ] Update `server/routes.ts`
- [ ] Ensure POST /api/projects accepts design fields
- [ ] Ensure GET /api/admin/verify returns design fields
- [ ] Test API with design data

## Phase 5: Admin Panel

### Task 5.1: Update Admin Panel UI
- [ ] Update `client/src/pages/admin.tsx`
- [ ] Add design section to project cards
- [ ] Display design thumbnail image
- [ ] Display design title and category
- [ ] Style design section consistently

### Task 5.2: Handle Null Design State
- [ ] Show "No design selected" when design is null
- [ ] Ensure layout doesn't break without design
- [ ] Test with mixed data (some with/without designs)

## Phase 6: Testing & Polish

### Task 6.1: End-to-End Testing
- [ ] Test full flow: browse → select → form → submit → admin
- [ ] Test without design selection
- [ ] Test localStorage persistence
- [ ] Test page refresh during form
- [ ] Test back button navigation

### Task 6.2: Mobile Testing
- [ ] Test on mobile viewport
- [ ] Test touch interactions
- [ ] Test responsive design display
- [ ] Test mobile form layout

### Task 6.3: Error Handling
- [ ] Test localStorage quota exceeded
- [ ] Test invalid JSON in localStorage
- [ ] Test missing design data
- [ ] Test network errors during submission

### Task 6.4: Visual Polish
- [ ] Add smooth animations
- [ ] Ensure consistent spacing
- [ ] Verify color scheme matches brand
- [ ] Test dark mode (if applicable)

## Phase 7: Documentation & Deployment

### Task 7.1: Update Documentation
- [ ] Document design selection feature
- [ ] Update README if needed
- [ ] Add comments to complex code sections

### Task 7.2: Git Commit & Push
- [ ] Commit all changes
- [ ] Push to GitHub
- [ ] Verify deployment

## Estimated Timeline

- Phase 1: 30 minutes
- Phase 2: 45 minutes
- Phase 3: 30 minutes
- Phase 4: 45 minutes
- Phase 5: 20 minutes
- Phase 6: 30 minutes
- Phase 7: 10 minutes

**Total: ~3.5 hours**

## Priority Order

1. **High Priority** (Core Functionality)
   - Phase 1: Data & State Management
   - Phase 2: Stack Component Enhancement
   - Phase 3: Form Integration
   - Phase 4: Database & Backend

2. **Medium Priority** (User Experience)
   - Phase 5: Admin Panel
   - Task 6.1: End-to-End Testing

3. **Low Priority** (Polish)
   - Task 6.2-6.4: Additional testing and polish
   - Phase 7: Documentation

## Notes

- Start with Phase 1 to establish foundation
- Test each phase before moving to next
- Keep commits atomic and descriptive
- Ensure backward compatibility (forms without design should still work)
