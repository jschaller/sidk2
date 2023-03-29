import dns from 'dns';
import ip from 'ip';
import { Ping } from 'net-ping';

export default async function handler(req, res) {
  const { subnet } = req.query;
  const { Resolver } = require('dns')
  const resolver = new Resolver()
  let addresses = [];

  if (ip.isV4Format(subnet)) {
    // subnet is an IP address and subnet mask
    const subnetArr = subnet.split('/');
    if (subnetArr.length !== 2) {
      res.status(400).json({ error: 'Invalid subnet' });
      return;
    }
    const networkAddress = ip.mask(subnetArr[0], subnetArr[1]);
    const broadcastAddress = ip.not(networkAddress);
    for (let i = ip.toLong(networkAddress) + 1; i < ip.toLong(broadcastAddress); i++) {
      const address = ip.fromLong(i);
      addresses.push(address);
    }
  } else if (ip.cidr(subnet)) {
    // subnet is in CIDR notation
    const networkAddress = ip.cidrSubnet(subnet).networkAddress;
    const broadcastAddress = ip.cidrSubnet(subnet).broadcastAddress;
    for (let i = ip.toLong(networkAddress) + 1; i < ip.toLong(broadcastAddress); i++) {
      const address = ip.fromLong(i);
      addresses.push(address);
    }
  } else {
    res.status(400).json({ error: 'Invalid subnet' });
    return;
  }

  console.log(`Pinging ${addresses.length} addresses...`);

  const results = [];
  const ping = require ("net-ping");
  const session = ping.createSession();

  let completedCount = 0; // count of completed ping requests

  const startTime = Date.now();
  for (const address of addresses) {
    const pingStart = Date.now();
    session.pingHost(address, async (err, target) => {
      const pingEnd = Date.now();
      if (err) {
        results.push({ address: target, alive: false, time: null });
      } else {
        const reverseLookup = await new Promise((resolve, reject) => {
          dns.reverse(address, (err, hostnames) => {
            if (err || hostnames.length === 0) {
              resolve(null);
            } else {
              resolve(hostnames[0]);
            }
          });
        });
        results.push({ address: target, alive: true, time: (pingEnd - pingStart), hostname: reverseLookup });
      }
      completedCount++;
      if (completedCount === addresses.length) { // check if all requests have completed
        session.close();
        const endTime = Date.now();
        console.log(`Pinged ${addresses.length} addresses in ${endTime - startTime} ms`);
        res.json(results);
      }
    });
  }
}
