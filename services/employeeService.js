import {
  getData,
  getValuesByFunction,
  getEmployeesByFunction,
} from "../repositories/spreadSheetRepositorie.js";

async function init() {
  const data = await getData(process.env.ID_SHEET_2); // Trocar para uma ID que será passada pelo usuário

  const valuesByFunction = getValuesByFunction(data);

  const employeesByFunction = getEmployeesByFunction(data);

  console.log("Values by Function:", valuesByFunction);
  console.log("Employees by Function:", employeesByFunction);
}

export default init;
