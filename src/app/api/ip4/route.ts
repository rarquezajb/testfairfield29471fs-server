import { NextRequest, NextResponse } from 'next/server';
import os from 'os';

export async function GET(req: NextRequest) {
  // Attempt to retrieve the IP address from the 'x-forwarded-for' header
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';

  // Retrieve the server's IP address
  const networkInterfaces = os.networkInterfaces();
  let serverIp = '127.0.0.1'; // Default to localhost

  for (const interfaceName in networkInterfaces) {
    const addresses = networkInterfaces[interfaceName];
    if (addresses) {
      for (const address of addresses) {
        if (address.family === 'IPv4' && !address.internal) {
          serverIp = address.address;
          break;
        }
      }
    }
  }

  return NextResponse.json({ serverIp });
}
