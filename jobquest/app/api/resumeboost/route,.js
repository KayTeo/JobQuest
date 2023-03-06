export async function GET(request) {
    return new Response(JSON.stringify({ test: "Hello World", hi: "test" }));
}

export async function POST(request) {}
