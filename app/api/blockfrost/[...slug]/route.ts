async function handleBlockfrostRequest(
  request: Request,
  context: { params: { slug: string[] } },
) {
  try {
    const { params } = context;
    const slug = params.slug || [];
    const network = slug[0];

    // Network configuration
    const networkConfig = getNetworkConfig(network);
    if (!networkConfig.key) {
      return new Response(
        JSON.stringify({ error: `Missing Blockfrost API key for network: ${network}` }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Construct endpoint
    const endpointPath = slug.slice(1).join("/") || "";
    const queryString = getQueryString(request.url);
    const endpoint = endpointPath + queryString;

    // Set headers
    const headers: Record<string, string> = {
      project_id: networkConfig.key,
    };

    if (endpointPath === "tx/submit" || endpointPath === "utils/txs/evaluate") {
      headers["Content-Type"] = "application/cbor";
    } else {
      headers["Content-Type"] = "application/json";
    }

    // Forward request to Blockfrost
    const url = `${networkConfig.baseUrl}/${endpoint}`;
    const blockfrostResponse = await fetch(url, {
      method: request.method,
      headers,
      body: request.method !== "GET" ? request.body : undefined,
    });

    // Handle 404 for UTXOs as empty wallet
    if (blockfrostResponse.status === 404 && endpointPath.includes("/utxos")) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Handle errors
    if (!blockfrostResponse.ok) {
      const errorBody = await blockfrostResponse.text();
      return new Response(
        JSON.stringify({
          error: `Blockfrost API error: ${blockfrostResponse.status} ${blockfrostResponse.statusText}`,
          details: errorBody,
        }),
        {
          status: blockfrostResponse.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Handle CBOR endpoints
    if (endpointPath === "utils/txs/evaluate" || endpointPath === "tx/submit") {
      const responseData = await blockfrostResponse.text();
      return new Response(responseData, {
        status: blockfrostResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Handle JSON responses
    const responseData = await blockfrostResponse.json();
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Blockfrost API route error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);

    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Helper functions
function getQueryString(url: string) {
  const qIndex = url.indexOf("?");
  return qIndex !== -1 ? url.substring(qIndex) : "";
}

function getNetworkConfig(network: string) {
  switch (network) {
    case "mainnet":
      return {
        key: process.env.BLOCKFROST_API_KEY_MAINNET,
        baseUrl: "https://cardano-mainnet.blockfrost.io/api/v0",
      };
    // add different networks
    default: // preprod
      return {
        key: process.env.BLOCKFROST_API_KEY_PREPROD,
        baseUrl: "https://cardano-preprod.blockfrost.io/api/v0",
      };
  }
}

// Next.js App router specific exports
export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  return handleBlockfrostRequest(request, { params });
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  return handleBlockfrostRequest(request, { params });
}
