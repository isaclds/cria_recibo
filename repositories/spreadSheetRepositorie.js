import google from "googleapis";

async function getData(idSheet) {
  try {
    const auth = new google.Auth.GoogleAuth({
      keyFile: process.env.SERVICE_ACCOUNT_FILE,
      scopes: process.env.SCOPE,
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
      throw new Error("Erro ao acessar a planilha: " + response);
    }

    return response.data.values;
  } catch (error) {
    throw new Error("Erro ao acessar a planilha:", error);
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

export { getData, getValuesByFunction, getEmployeesByFunction };
