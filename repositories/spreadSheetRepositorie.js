import google from "googleapis";
import path from "path";

async function getData(idSheet) {
  try {
    const keyFilePath = path.resolve(process.env.SERVICE_ACCOUNT_FILE);

    const auth = new google.Auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: [process.env.SCOPE],
    });

    const sheets = google.google.sheets({
      version: "v4",
      auth: auth,
    });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: idSheet,
      range: "A1:F15",
    });

    if (!response.ok) {
      throw new Error("Erro ao acessar a planilha, na resposta: " + response);
    }

    return response.data.values;
  } catch (err) {
    throw new Error("Erro ao acessar a planilha:", err);
  }
}

function getValuesByFunction(data) {
  const valuesByFunction = {};

  data.forEach((line) => {
    const role = line[4];
    const value = parseFloat(line[5]) || 0;

    if (role === "" || role === "Cargo") return;

    valuesByFunction[role] = value;
  });

  return valuesByFunction;
}

function getEmployeesByFunction(data) {
  const employeesByFunction = {};

  data.forEach((line) => {
    const name = line[0];
    const role = line[1];

    if (name === "" || name === "Funcionario") return;

    if (!employeesByFunction[role]) {
      employeesByFunction[role] = [];
    }

    employeesByFunction[role].push(name);
  });

  return employeesByFunction;
}

function getDateInfo(data) {
  const date = new Date(data[1][2]);

  const day = date.getDate();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const writtingMonth = date.toLocaleString("pt-BR", { month: "long" });
  const year = date.getFullYear();

  return { day, writtingMonth, month, year };
}

export { getData, getValuesByFunction, getEmployeesByFunction, getDateInfo };
