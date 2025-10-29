const EmployeeService = {
  employees: [
    { id: 1, name: "Angelina", age: 20 },
    { id: 2, name: "Nikita", age: 21 },
    { id: 3, name: "Karina", age: 22 },
  ],

  all() {
    return [...this.employees];
  },

  add(person) {
    this.employees.push(person);
    return this.all();
  },

  delete(id) {
    this.employees = this.employees.filter(p => p.id !== id);
    return this.all();
  },

  login({ username, password }) {
    const users = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "user1", password: "user123", role: "user" },
      { username: "user2", password: "user456", role: "user" }
    ];

    const found = users.find(u => u.username === username && u.password === password);

    if (found) {
      return {
        token: "fake-token-" + Date.now(),
        user: { username: found.username, role: found.role }
      };
    } else {
      return { error: "Неверный логин или пароль" };
    }
  }
};

export default EmployeeService;
