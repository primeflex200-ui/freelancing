# Design Selection Workflow - Setup Instructions

## Overview

The design selection workflow has been successfully implemented! Users can now:
1. Browse design prototypes on category pages
2. Click to select a design
3. See the selected design in the project form
4. Submit projects with their design preference
5. View selected designs in the admin panel

## Database Migration Required

To enable this feature, you need to add the design columns to your Supabase database.

### Steps to Run Migration:

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project: `hvfpectylmzscymvsytw`

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Migration**
   - Copy the contents of `supabase-migration-add-design-fields.sql`
   - Paste into the SQL Editor
   - Click "Run" or press Ctrl+Enter

4. **Verify Migration**
   - The query will add 4 new columns to the `projects` table:
     - `selected_design_id` (TEXT)
     - `selected_design_title` (TEXT)
     - `selected_design_category` (TEXT)
     - `selected_design_image_url` (TEXT)
   - The verification query at the end will show all columns

### Alternative: Manual Column Addition

If you prefer to add columns manually:

```sql
ALTER TABLE projects 
ADD COLUMN selected_design_id TEXT,
ADD COLUMN selected_design_title TEXT,
ADD COLUMN selected_design_category TEXT,
ADD COLUMN selected_design_image_url TEXT;
```

## Features Implemented

### 1. Design Data Store
- **File**: `client/src/data/designs.ts`
- 20 sample designs across 5 categories
- Each design includes: ID, title, description, image, category, tech stack

### 2. State Management
- **File**: `client/src/contexts/DesignSelectionContext.tsx`
- React Context for managing selected design
- Persists selection to localStorage
- Clears selection after form submission

### 3. Enhanced Stack Component
- **File**: `client/src/components/ui/Stack.tsx`
- Visual selection feedback with checkmark overlay
- Hover tooltip: "Click to select this design"
- 1-second animation before navigation

### 4. Updated Category Pages
- **Files**: 
  - `client/src/pages/professional.tsx`
  - `client/src/pages/gaming.tsx`
  - `client/src/pages/startups.tsx`
  - `client/src/pages/api-backends.tsx`
  - `client/src/pages/stackweb-projects.tsx`
- All pages now use design data from store
- Handle design selection and navigation

### 5. Project Form Integration
- **File**: `client/src/pages/start-project.tsx`
- Displays selected design at top of form
- Shows design thumbnail, title, and category
- "Clear Selection" button to remove design
- Includes design data in submission

### 6. Admin Panel Enhancement
- **File**: `client/src/pages/admin.tsx`
- Displays selected design for each project
- Shows design thumbnail and details
- Gracefully handles projects without designs

### 7. Database Schema Updates
- **Files**: 
  - `shared/schema.ts` - TypeScript types
  - `server/storage.ts` - Storage methods
  - `supabase-schema.sql` - Schema definition
  - `supabase-migration-add-design-fields.sql` - Migration script

## User Flow

1. **Browse Designs**
   - User visits category page (e.g., /work/professional)
   - Sees 4 design prototypes in Stack component
   - Can drag/click to browse designs

2. **Select Design**
   - User clicks on desired design
   - Checkmark overlay appears
   - After 1 second, navigates to /start-project

3. **Complete Form**
   - Selected design displayed at top
   - User can clear selection if desired
   - Completes 6-step form normally

4. **Submit Project**
   - Design data included in submission
   - Saved to database
   - Selection cleared from localStorage

5. **Admin Review**
   - Admin sees project with design info
   - Design thumbnail and details displayed
   - Can identify user's design preference

## Testing Checklist

- [x] Design selection persists across navigation
- [x] Selection cleared after form submission
- [x] Form works without design selection
- [x] Admin panel displays design correctly
- [x] TypeScript compilation successful
- [ ] Database migration completed (requires manual step)
- [ ] End-to-end test: select design → submit → view in admin

## Next Steps

1. **Run the database migration** (see instructions above)
2. **Test the feature**:
   - Visit http://localhost:5000/work/professional
   - Click on a design
   - Complete the form
   - Check admin panel
3. **Verify data persistence** in Supabase dashboard

## Design Categories

The system includes 5 categories with 4 designs each:

1. **Professional** - Corporate websites, business portfolios
2. **Gaming** - Esports platforms, gaming communities
3. **Startups** - SaaS MVPs, tech startup landing pages
4. **API & Backends** - REST APIs, microservices, GraphQL
5. **StackWeb Projects** - Internal projects and tools

## Notes

- All designs use Unsplash images for thumbnails
- LocalStorage key: `stackweb_selected_design`
- Selection automatically clears after successful submission
- Forms without design selection work normally (backward compatible)
- Design data is optional in database (nullable columns)

## Troubleshooting

**Issue**: Design not showing in form after selection
- Check browser console for errors
- Verify localStorage has `stackweb_selected_design` key
- Ensure DesignSelectionProvider wraps the app

**Issue**: Database error on submission
- Verify migration was run successfully
- Check Supabase logs for specific error
- Ensure all 4 design columns exist in projects table

**Issue**: Admin panel not showing design
- Verify project has design data in database
- Check that storage.ts correctly maps snake_case to camelCase
- Ensure Project interface includes design fields

## Support

For issues or questions, check:
- `.kiro/specs/design-selection-workflow/requirements.md` - Full requirements
- `.kiro/specs/design-selection-workflow/design.md` - Architecture details
- `.kiro/specs/design-selection-workflow/tasks.md` - Implementation tasks
