-- ============================================
-- DIAGNOSTIC CHECK - RUN THIS FIRST
-- This will tell you exactly what's wrong
-- ============================================

-- Check 1: Do tables exist?
SELECT 
    'Table Existence Check' as check_type,
    CASE 
        WHEN EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'projects') 
        THEN '✅ projects table exists'
        ELSE '❌ projects table MISSING'
    END as projects_status,
    CASE 
        WHEN EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users') 
        THEN '✅ users table exists'
        ELSE '❌ users table MISSING'
    END as users_status;

-- Check 2: Do all required columns exist?
SELECT 
    'Column Check' as check_type,
    column_name,
    data_type,
    is_nullable,
    CASE 
        WHEN column_name IN (
            'id', 'website_type', 'project_name', 'project_description', 
            'communication_methods', 'budget', 'domain', 'name', 'email', 
            'phone', 'company', 'selected_design_id', 'selected_design_title', 
            'selected_design_category', 'selected_design_image_url', 'created_at'
        ) THEN '✅ Required'
        ELSE '⚠️ Extra'
    END as status
FROM information_schema.columns 
WHERE table_name = 'projects'
ORDER BY ordinal_position;

-- Check 3: Missing required columns
WITH required_columns AS (
    SELECT unnest(ARRAY[
        'id', 'website_type', 'project_name', 'project_description', 
        'communication_methods', 'budget', 'domain', 'name', 'email', 
        'phone', 'company', 'selected_design_id', 'selected_design_title', 
        'selected_design_category', 'selected_design_image_url', 'created_at'
    ]) as required_column
),
existing_columns AS (
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'projects'
)
SELECT 
    'Missing Columns Check' as check_type,
    required_column as missing_column,
    '❌ MISSING - This will cause API errors!' as status
FROM required_columns 
WHERE required_column NOT IN (SELECT column_name FROM existing_columns);

-- Check 4: RLS Status
SELECT 
    'RLS Status Check' as check_type,
    schemaname,
    tablename,
    CASE 
        WHEN rowsecurity = true THEN '⚠️ RLS ENABLED - May block API calls'
        ELSE '✅ RLS DISABLED - API calls should work'
    END as rls_status
FROM pg_tables 
WHERE tablename IN ('projects', 'users');

-- Check 5: Permissions for anon role
SELECT 
    'Permissions Check' as check_type,
    table_name,
    grantee,
    privilege_type,
    CASE 
        WHEN grantee = 'anon' AND privilege_type IN ('INSERT', 'SELECT', 'UPDATE', 'DELETE') 
        THEN '✅ Required permission'
        ELSE '⚠️ Check needed'
    END as status
FROM information_schema.role_table_grants 
WHERE table_name IN ('projects', 'users')
AND grantee IN ('anon', 'authenticated')
ORDER BY table_name, grantee, privilege_type;

-- Check 6: Active Policies
SELECT 
    'Policies Check' as check_type,
    tablename,
    policyname,
    permissive,
    cmd,
    CASE 
        WHEN permissive = 'PERMISSIVE' AND cmd = 'ALL' 
        THEN '✅ Permissive policy'
        ELSE '⚠️ May block API calls'
    END as status
FROM pg_policies 
WHERE tablename IN ('projects', 'users');

-- Check 7: Test basic operations
DO $$
DECLARE
    test_result TEXT;
BEGIN
    -- Test INSERT
    BEGIN
        INSERT INTO projects (
            website_type, project_name, project_description, 
            communication_methods, budget, domain, name, email
        ) VALUES (
            'diagnostic', 'Diagnostic Test', 'Testing insert capability', 
            'email', '500', 'own', 'Diagnostic', 'diagnostic@test.com'
        );
        test_result := '✅ INSERT works';
    EXCEPTION WHEN OTHERS THEN
        test_result := '❌ INSERT failed: ' || SQLERRM;
    END;
    
    RAISE NOTICE 'INSERT Test: %', test_result;
    
    -- Test SELECT
    BEGIN
        IF EXISTS (SELECT 1 FROM projects WHERE email = 'diagnostic@test.com') THEN
            test_result := '✅ SELECT works';
        ELSE
            test_result := '❌ SELECT failed: No data found';
        END IF;
    EXCEPTION WHEN OTHERS THEN
        test_result := '❌ SELECT failed: ' || SQLERRM;
    END;
    
    RAISE NOTICE 'SELECT Test: %', test_result;
    
    -- Test DELETE
    BEGIN
        DELETE FROM projects WHERE email = 'diagnostic@test.com';
        test_result := '✅ DELETE works';
    EXCEPTION WHEN OTHERS THEN
        test_result := '❌ DELETE failed: ' || SQLERRM;
    END;
    
    RAISE NOTICE 'DELETE Test: %', test_result;
    
END $$;

-- Check 8: Connection and environment
SELECT 
    'Connection Check' as check_type,
    current_database() as database_name,
    current_user as current_user,
    session_user as session_user,
    current_setting('server_version') as postgres_version;

-- Summary
SELECT 
    '============================================' as summary;
SELECT 
    'DIAGNOSTIC COMPLETE - Check results above' as summary;
SELECT 
    'Look for ❌ symbols to identify problems' as summary;
SELECT 
    'Run ULTIMATE-DATABASE-FIX.sql to fix all issues' as summary;
SELECT 
    '============================================' as summary;