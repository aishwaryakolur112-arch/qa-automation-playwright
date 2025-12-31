import { test, expect } from '@playwright/test';

test('Reqres API - Mocked Flow (Create, Get, Update)', async ({ request }) => {

 
  const createUserResponse = {
    id: '101', 
    name: 'Aishwarya',
    job: 'QA Engineer',
    createdAt: new Date().toISOString()
  };

  const createResponse = {
    status: 201,
    json: async () => createUserResponse
  };

  expect(createResponse.status).toBe(201);
  const createBody = await createResponse.json();
  const userId = createBody.id;
  expect(userId).toBeDefined();
  console.log('User created:', createBody);


  const getUserResponse = {
    status: 200,
    json: async () => createUserResponse
  };

  expect(getUserResponse.status).toBe(200);
  const getBody = await getUserResponse.json();
  expect(getBody.id).toBe(userId);
  expect(getBody.name).toBe('Aishwarya');
  console.log('User fetched:', getBody);


  const updateUserResponse = {
    status: 200,
    json: async () => ({
      id: userId,
      name: 'Aishwarya Updated',
      job: 'Senior QA Engineer',
      updatedAt: new Date().toISOString()
    })
  };

  expect(updateUserResponse.status).toBe(200);
  const updateBody = await updateUserResponse.json();
  expect(updateBody.name).toBe('Aishwarya Updated');
  expect(updateBody.job).toBe('Senior QA Engineer');
  console.log('User updated:', updateBody);

});


// import { test, expect } from '@playwright/test';

// test('Reqres API – Mocked End-to-End Flow', async () => {


//   const registerResponse = {
//     status: 200,
//     json: async () => ({
//       id: 4,
//       token: 'QpwL5tke4Pnpja7X4'
//     })
//   };

//   expect(registerResponse.status).toBe(200);
//   const registerBody = await registerResponse.json();
//   expect(registerBody.token).toBeDefined();


//   const loginResponse = {
//     status: 200,
//     json: async () => ({
//       token: 'QpwL5tke4Pnpja7X4'
//     })
//   };

//   expect(loginResponse.status).toBe(200);
//   const loginBody = await loginResponse.json();
//   expect(loginBody.token).toBe(registerBody.token);

 
//   const fetchResponse = {
//     status: 200,
//     json: async () => ({
//       page: 2,
//       per_page: 6,
//       total: 12,
//       data: [
//         {
//           id: 7,
//           email: 'michael.lawson@reqres.in',
//           first_name: 'Michael',
//           last_name: 'Lawson'
//         }
//       ]
//     })
//   };

//   expect(fetchResponse.status).toBe(200);
//   const fetchBody = await fetchResponse.json();
//   expect(fetchBody.data.length).toBeGreaterThan(0);

  
//   const createResponse = {
//     status: 201,
//     json: async () => ({
//       name: 'morpheus',
//       job: 'leader',
//       id: '496',
//       createdAt: '2024-07-01T10:00:00.000Z'
//     })
//   };

//   expect(createResponse.status).toBe(201);
//   const createBody = await createResponse.json();
//   expect(createBody.name).toBe('morpheus');
//   expect(createBody.job).toBe('leader');

// });
