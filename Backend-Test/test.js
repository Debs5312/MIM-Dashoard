const request = require('supertest');
const app = require('../BackEnd/index.js');

// Simple test runner
async function runTests() {
  console.log('🧪 Running Incident Management API Tests...\n');
  
  let passed = 0;
  let failed = 0;
  
  const tests = [
    {
      name: 'GET /incident/ - should respond with all incidents',
      test: async () => {
        const response = await request(app).get('/incident/');
        if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
        if (!Array.isArray(response.body)) throw new Error('Response is not an array');
        console.log(`✅ Found ${response.body.length} incidents`);
      }
    },
    {
      name: 'GET /incident/p2/list - should respond with filtered priority 2 incidents list',
      test: async () => {
        const response = await request(app).get('/incident/p2/list');
        if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
        if (!Array.isArray(response.body)) throw new Error('Response is not an array');
        
        response.body.forEach(incident => {
          if (!incident.incident_no || !incident.description || !incident.created_on || !incident.created_by) {
            throw new Error('Missing required fields in incident');
          }
          if (incident.priority !== 'P2') {
            throw new Error('Priority field should be P2 for priority 2 incidents');
          }
        });
        console.log(`✅ Found ${response.body.length} P2 incidents with required fields`);
      }
    },
    {
      name: 'GET /incident/p1/list - should respond with filtered priority 1 incidents list',
      test: async () => {
        const response = await request(app).get('/incident/p1/list');
        if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
        if (!Array.isArray(response.body)) throw new Error('Response is not an array');
        
        response.body.forEach(incident => {
          if (!incident.incident_no || !incident.description || !incident.created_on || !incident.created_by) {
            throw new Error('Missing required fields in incident');
          }
          if (incident.priority !== 'P1') {
            throw new Error('Priority field should be P1 for priority 1 incidents');
          }
        });
        console.log(`✅ Found ${response.body.length} P1 incidents with required fields`);
      }
    }
  ];
  
  for (const testCase of tests) {
    try {
      console.log(`🔄 ${testCase.name}`);
      await testCase.test();
      passed++;
    } catch (error) {
      console.log(`❌ ${testCase.name}`);
      console.log(`   Error: ${error.message}`);
      failed++;
    }
    console.log('');
  }
  
  console.log(`\n📊 Test Results:`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Total: ${passed + failed}`);
  
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 All tests passed!');
    process.exit(0);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };
