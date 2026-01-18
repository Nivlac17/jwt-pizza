# Learning notes

## JWT Pizza code study and debugging

As part of `Deliverable ⓵ Development deployment: JWT Pizza`, start up the application and debug through the code until you understand how it works. During the learning process fill out the following required pieces of information in order to demonstrate that you have successfully completed the deliverable.

| User activity                                       | Frontend component | Backend endpoints | Database SQL |
| --------------------------------------------------- | ------------------ | ----------------- | ------------ |
| View home page                                      |   home.tsx         |    none           |  none        |
| Register new user<br/>(t@jwt.com, pw: test)         |    register.tsx    | [POST] /api/auth  |   'INSERT INTO user (name, email, password) VALUES (?, ?, ?) '      ' INSERT INTO userRole (userId, role, objectId) VALUES (?, ?, ?)' |
| Login new user<br/>(t@jwt.com, pw: test)            |    login.tsx       | [PUT] /api/auth   | `INSERT INTO auth (token, userId) VALUES (?, ?) ON DUPLICATE KEY UPDATE token=token`         |
| Order pizza                                         |   menu.tsx         | [POST] /api/auth  | `INSERT INTO dinerOrder (dinerId, franchiseId, storeId, date) VALUES (?, ?, ?, now())` |
| Verify pizza                                        |  deliver.tsx       |[POST] /api/order/verify|    None     |
| View profile page                                   | dinerDashboard.tsx | [GET] /api/order |'SELECT id, franchiseId,storeId, date FROM dinerOrder WHERE dinerId=? LIMIT ${offset},${config.db.listPerPage}`|
| View franchise<br/>(as diner)                       |     menu.tsx       |[GET] /api/franchise|   `SELECT id, name FROM franchise WHERE name LIKE ? LIMIT ${limit + 1} OFFSET ${offset}`    |
| Logout                                              |   logout.tsx       |  [PUT] /api/auth  | `DELETE FROM auth WHERE token=?`    |
| View About page                                     |   about.tsx        |     none          |    none      |
| View History page                                   |  history.tsx       |     none          |     none     |
| Login as franchisee<br/>(f@jwt.com, pw: franchisee) |login.tsx           | [PUT] /api/auth   |  `INSERT INTO auth (token, userId) VALUES (?, ?) ON DUPLICATE KEY UPDATE token=token`  |
| View franchise<br/>(as franchisee)                  |franchiseDashboard.tsx |[Get] /api/franchise| `SELECT id, name FROM franchise WHERE name LIKE ? LIMIT ${limit + 1} OFFSET ${offset}` |
| Create a store                                      |  createStore.tsx   | [POST] /api/franchise/${franchise.id}/store`|  `INSERT INTO store (franchiseId, name) VALUES (?, ?)`     |
| Close a store                                       |    closeStore.tsx  | [DELETE] /api/franchise/${franchise.id}/store/${store.id}`  | `DELETE FROM store WHERE franchiseId=? AND id=?` |
| Login as admin<br/>(a@jwt.com, pw: admin)           |   login.tsx        | [PUT] /api/auth   |  `INSERT INTO auth (token, userId) VALUES (?, ?) ON DUPLICATE KEY UPDATE token=token`    |
| View Admin page                                     | adminDashboard.tsx | `/api/franchise?page=${page}&limit=${limit}&name=${nameFilter}`  |  `SELECT objectId FROM userRole WHERE role='franchisee' AND userId=?`   |
| Create a franchise for t@jwt.com                    | createFranchise.tsx| [POST] /api/franchise| `SELECT id, name FROM user WHERE email=?`  |
| Close the franchise for t@jwt.com                   |  closeFranchise.tsx|  [DELETE] `/api/franchise/${franchise.id}`  |  `DELETE FROM store WHERE franchiseId=?`  `DELETE FROM userRole WHERE objectId=?`   `DELETE FROM franchise WHERE id=?`         |
