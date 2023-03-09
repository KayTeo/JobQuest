export async function GET(request) {
    return new Response(JSON.stringify({ test: "Hello World", hi: "test" }));
}

export async function POST(request) {}

//Function template, not runnable
export async function getDataFromPythonFunction() {
  const response = await fetch('/api/get_data_from_python');
  const data = await response.json();
  return data;
}