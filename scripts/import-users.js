const fs = require('fs');
const path = require('path');

// Read environment variables
require('dotenv').config({ path: '.env.local' });

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
const CSV_PATH = 'c:/Users/Aman/Downloads/ins_35b6E6B7pFxiasVPBSLzTTR5QYw.csv';

if (!CLERK_SECRET_KEY) {
  console.error('❌ CLERK_SECRET_KEY not found in .env.local');
  process.exit(1);
}

async function importUsers() {
  console.log('📋 Reading user data from CSV...');

  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  const lines = csvContent.split('\n').filter(line => line.trim());

  // Skip header
  const users = lines.slice(1).map(line => {
    const [id, firstName, lastName, username, primaryEmail] = line.split(',');
    return {
      id: id?.trim(),
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      email: primaryEmail?.trim(),
    };
  }).filter(user => user.email); // Only users with email

  console.log(`📊 Found ${users.length} users to import`);
  console.log('\n🚀 Starting import...\n');

  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  for (const user of users) {
    try {
      const response = await fetch('https://api.clerk.com/v1/users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: [user.email],
          first_name: user.firstName,
          last_name: user.lastName,
          skip_password_checks: true,
          skip_password_requirement: true,
          created_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Imported: ${user.firstName} ${user.lastName} (${user.email})`);
        successCount++;
      } else {
        const errorData = await response.json();

        // Check if user already exists
        if (errorData.errors?.[0]?.code === 'form_identifier_exists') {
          console.log(`⚠️  Already exists: ${user.email}`);
          successCount++; // Count as success since user exists
        } else {
          console.error(`❌ Failed: ${user.email} - ${errorData.errors?.[0]?.message || 'Unknown error'}`);
          errors.push({ user, error: errorData });
          errorCount++;
        }
      }

      // Rate limiting: wait 100ms between requests
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error(`❌ Error importing ${user.email}:`, error.message);
      errors.push({ user, error: error.message });
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`\n📊 Import Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`   📋 Total: ${users.length}`);

  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(({ user, error }) => {
      console.log(`   - ${user.email}: ${error.errors?.[0]?.message || error}`);
    });
  }

  console.log('\n' + '='.repeat(50));
  console.log('\n⚠️  IMPORTANT: Users will need to use "Forgot Password" to set a new password on first login.');
}

importUsers().catch(console.error);
