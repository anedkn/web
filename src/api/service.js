const EmployeeAPI = {
    employees: [
      { number: 1, name: "Angelina Edakina", job: "Student" },
      { number: 2, name: "Nikita Bernaykovich", job: "Student" },
      { number: 3, name: "Karina Grishman", job: "Student" },
      { number: 4, name: "Ilya Ivanov", job: "Student" },
      { number: 5, name: "Sasha Kot", job: "Student" },
      { number: 6, name: "Fillipe Forward", job: "Rector" },
    ],
    all: function () {
      return this.employees;
    },
    get: function (id) {
      const isEmployee = (p) => p.number === id;
      return this.employees.find(isEmployee);
    },
    delete: function (id) {
      const isNotDelEmployee = (p) => p.number !== id;
      this.employees = this.employees.filter(isNotDelEmployee);
      return;
    },
    add: function (employee) {
      this.employees.shift(employee);
      return employee;
    },
    update: function (employee) {
      this.get();
      this.employees.shift(employee);
      return employee;
    },
  };
  export default EmployeeAPI;
  