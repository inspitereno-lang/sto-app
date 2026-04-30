const http = require('http');

const CONCURRENT_USERS = 100;
const URL = 'http://localhost:5001/api/products';

async function runLoadTest() {
  console.log(`🚀 Starting load test: ${CONCURRENT_USERS} concurrent requests to ${URL}...`);
  
  const startTime = Date.now();
  const requests = [];

  for (let i = 0; i < CONCURRENT_USERS; i++) {
    requests.push(new Promise((resolve) => {
      const start = Date.now();
      http.get(URL, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          const latency = Date.now() - start;
          resolve({ success: res.statusCode === 200, latency });
        });
      }).on('error', (err) => {
        resolve({ success: false, latency: Date.now() - start, error: err.message });
      });
    }));
  }

  const results = await Promise.all(requests);
  const totalTime = Date.now() - startTime;
  
  const successful = results.filter(r => r.success);
  const latencies = successful.map(r => r.latency);
  const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
  const maxLatency = Math.max(...latencies);
  const minLatency = Math.min(...latencies);

  console.log('\n--- Load Test Results ---');
  console.log(`Total Requests: ${CONCURRENT_USERS}`);
  console.log(`Successful: ${successful.length}`);
  console.log(`Failed: ${CONCURRENT_USERS - successful.length}`);
  console.log(`Total Duration: ${totalTime}ms`);
  console.log(`Average Latency: ${avgLatency.toFixed(2)}ms`);
  console.log(`Max Latency: ${maxLatency}ms`);
  console.log(`Min Latency: ${minLatency}ms`);
  
  // Scoring
  let score = 10;
  if (avgLatency > 100) score -= 1;
  if (avgLatency > 300) score -= 2;
  if (avgLatency > 500) score -= 2;
  if (successful.length < CONCURRENT_USERS) score -= (CONCURRENT_USERS - successful.length);
  
  console.log(`\nPerformance Score: ${Math.max(0, score)}/10`);
}

runLoadTest().catch(console.error);
