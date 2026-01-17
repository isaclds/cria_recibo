import {
  getData,
  getValuesByFunction,
  getEmployeesByFunction,
} from "../repositories/spreadSheetRepositorie.js";
import extenso from "extenso";

async function employeesObject(idSheet) {
  const data = await getData(idSheet);
  const employeesByFunction = getEmployeesByFunction(data);
  const valuesByFunction = getValuesByFunction(data);

  const employees = [];

  for (const role in employeesByFunction) {
    employeesByFunction[role].forEach((employee) => {
      const value = valuesByFunction[role] || 0;

      employees.push({
        nome: employee,
        valor: value,
        valor_escrito: extenso(value, { mode: "currency" }),
      });
    });
  }

  console.log(employees);
}

export default employeesObject;
//   const dateInfo = getDateInfo(data);
// const day = dateInfo.day;
// const month = dateInfo.month;
// const year = dateInfo.year;
// data: `${day}/${month}/${year}`,
// data_dia: day,
// data_mes_escrito: dateInfo.writtingMonth,
// data_ano: year,
