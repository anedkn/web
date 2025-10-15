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
  }
};

export default EmployeeService;
