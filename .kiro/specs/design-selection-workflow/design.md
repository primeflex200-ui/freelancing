# Design Document

## Architecture Overview

The Design Selection Workflow will integrate with existing components using a state management approach that persists across navigation. The architecture follows these key principles:

1. **Centralized Design Data**: All design prototypes stored in a structured format
2. **State Persistence**: Use localStorage to maintain selection across page navigation
3. **Component Integration**: Minimal changes to existing Stack, Form, and Admin components
4. **Type Safety**: Full TypeScript support with proper interfaces

## Data Model

### Design Prototype Interface

```typescript
interface DesignPrototype {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'professional' | 'gaming' | 'startups' | 'api-backend' | 'stackweb-projects';
  techStack: string[];
}
```

### Selected Design State

```typescript
interface SelectedDesign {
  designId: string;
  designTitle: string;
  designCategory: string;
  designImageUrl: string;
  selectedAt: number; // timestamp
}
```

### Database Schema Addition

Add to projects table:
- `selected_design_id` (text, nullable)
- `selected_design_title` (text, nullable)
- `selected_design_category` (text, nullable)
- `selected_design_image_url` (text, nullable)

## Component Architecture

### 1. Design Data Store (`client/src/data/designs.ts`)

Central repository for all design prototypes organized by category.

**Responsibilities:**
- Store design prototype data
- Provide helper functions to get designs by category
- Export TypeScript interfaces

### 2. Design Selection Context (`client/src/contexts/DesignSelectionContext.tsx`)

React Context for managing selected design state.

**Responsibilities:**
- Manage selected design state
- Persist to localStorage
- Provide hooks for components to access/update selection
- Clear selection after form submission

**API:**
```typescript
interface DesignSelectionContextType {
  selectedDesign: SelectedDesign | null;
  selectDesign: (design: DesignPrototype) => void;
  clearSelection: () => void;
}
```

### 3. Enhanced Stack Component

Update Stack component to handle design selection.

**Changes:**
- Accept `onDesignSelect` callback prop
- Add visual selection indicator on click
- Show "Select this design" tooltip on hover
- Trigger navigation after selection animation

### 4. Enhanced Project Form

Update start-project form to display selected design.

**Changes:**
- Display selected design card at top of form (if present)
- Include design data in form submission
- Show "No design selected" state
- Allow users to clear selection

### 5. Enhanced Admin Panel

Update admin panel to display selected design.

**Changes:**
- Add design information section to project cards
- Display design thumbnail, title, and category
- Handle null/empty design gracefully

### 6. Database Schema Update

Update Supabase schema and TypeScript types.

**Changes:**
- Add design columns to projects table
- Update `insertProjectSchema` in shared/schema.ts
- Update storage methods to handle design fields

## User Flow

1. **Browse Designs**
   - User navigates to category page (e.g., /professional)
   - Stack component displays 4+ design prototypes
   - User can drag/click to browse designs

2. **Select Design**
   - User clicks on desired design card
   - Visual feedback: checkmark overlay appears
   - Design data saved to localStorage
   - After 1 second, navigate to /start-project

3. **Complete Form**
   - Form displays selected design at top
   - User completes 6-step form
   - Design data included in submission payload

4. **Submit Project**
   - Project saved to database with design info
   - Selection cleared from localStorage
   - User redirected to confirmation page

5. **Admin Review**
   - Admin views project in admin panel
   - Design thumbnail and details displayed
   - Admin can see user's design preference

## Implementation Strategy

### Phase 1: Data & State Management
1. Create design data store with sample designs
2. Implement DesignSelectionContext
3. Add context provider to App.tsx

### Phase 2: Stack Component Enhancement
1. Update Stack to accept design data
2. Add selection handler and visual feedback
3. Implement navigation after selection

### Phase 3: Form Integration
1. Update form to consume selected design
2. Display selected design card
3. Include design in submission payload

### Phase 4: Database & Backend
1. Update Supabase schema
2. Update TypeScript types
3. Update storage methods
4. Update API routes

### Phase 5: Admin Panel
1. Update admin panel UI
2. Display design information
3. Handle null design state

## Technical Considerations

### LocalStorage Key
- Key: `stackweb_selected_design`
- Value: JSON stringified SelectedDesign object
- Clear on successful form submission

### Navigation Timing
- Show selection feedback for 1 second
- Use setTimeout for navigation delay
- Cleanup timeout on component unmount

### Error Handling
- Handle localStorage quota exceeded
- Handle JSON parse errors
- Graceful degradation if design data missing

### Mobile Responsiveness
- Design cards responsive on mobile
- Selection feedback visible on touch devices
- Form design display adapts to screen size

### Performance
- Lazy load design images
- Optimize image sizes
- Minimize re-renders with proper memoization

## Testing Checklist

- [ ] Design selection persists across navigation
- [ ] Selection cleared after form submission
- [ ] Form works without design selection
- [ ] Admin panel displays design correctly
- [ ] Mobile touch interactions work
- [ ] LocalStorage errors handled gracefully
- [ ] Multiple selections update correctly
- [ ] Back button preserves selection
- [ ] Page refresh preserves selection
- [ ] Design images load properly

## Future Enhancements

1. **Design Comparison**: Allow users to select multiple designs for comparison
2. **Design Filtering**: Filter designs by tech stack or features
3. **Design Analytics**: Track which designs are most popular
4. **Custom Design Upload**: Allow users to upload reference designs
5. **Design Variations**: Show multiple variations of same design
6. **Design Preview**: Full-screen preview modal for designs
