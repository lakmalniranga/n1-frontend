import Link from "next/link";

import Layout from "../../components/layout/main";

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${process.env.BASE_URL}/blockchain/${params.hash}?withTrx=false`
  );
  const block = await res.json();
  return { props: { block } };
}

export default function Block({ block }) {
  const data = mapApiResponse(block);

  return (
    <Layout>
      <div className="flex justify-between">
        <Link href="/">
          <a className="text-sm font-semibold text-blue-500 uppercase">
            Back To Home
          </a>
        </Link>
        <a className="text-sm font-semibold text-gray-500 uppercase cursor-not-allowed">
          Block Transactions
        </a>
      </div>

      <div className="bg-white shadow-md rounded my-6">
        <div className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal py-3 px-2 font-semibold">
          Block Information
        </div>
        <div className="text-gray-600 text-sm divide-y divide-gray-100">
          {data.map(({ label, value }) => item({ label, value }))}
        </div>
      </div>
    </Layout>
  );
}

function item({ label, value }) {
  return (
    <div key={label} className="grid grid-cols-4 py-3 px-2">
      <div>{label}</div>
      <div className="col-span-2">{value}</div>
    </div>
  );
}

function mapApiResponse(data) {
  const { hash, block_index, prev_block, mrkl_root, bits, n_tx, time } = data;
  return [
    {
      label: "Hash",
      value: hash,
    },
    {
      label: "Block Index",
      value: block_index,
    },
    {
      label: "Previous Block",
      value: prev_block,
    },
    {
      label: "Merkle Root",
      value: mrkl_root,
    },
    {
      label: "Size",
      value: bits,
    },
    {
      label: "Number of Transactions",
      value: n_tx,
    },
    {
      label: "Time",
      value: time,
    },
  ];
}
