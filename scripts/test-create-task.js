(async () => {
  try {
    const loginRes = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'owner@example.com', password: 'password123' }),
    });
    const loginJson = await loginRes.json();
    console.log('LOGIN_STATUS', loginRes.status);
    console.log('LOGIN_BODY', loginJson);

    if (!loginRes.ok) process.exit(1);

    const token = loginJson.access_token;

    const taskRes = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title: 'API Test Task', description: 'Created by automated test', category: 'General' }),
    });

    const taskJson = await taskRes.json();
    console.log('TASK_STATUS', taskRes.status);
    console.log('TASK_BODY', taskJson);
  } catch (err) {
    console.error('ERR', err);
    process.exit(1);
  }
})();
