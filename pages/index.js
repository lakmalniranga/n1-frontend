import React from "react";
import { DateTime, Interval } from "luxon";
import humanizeDuration from "humanize-duration";

import Layout from "../components/layout/main";
import Table from "../components/table";

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BASE_URL}/blockchain?cache=enable`);
  const { blocks } = (await res.json()) || [];
  return { props: { blocks } };
}

export default function Home({ blocks }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Hash",
        accessor: "hash",
      },
      {
        Header: "Time",
        accessor: ({ time }) => {
          const duration = Interval.fromDateTimes(
            DateTime.fromMillis(time * 1000), // convert unix-timstamp to miliseconds
            DateTime.now()
          )
            .toDuration()
            .valueOf();
          return humanizeDuration(duration, { delimiter: " and ", largest: 2 });
        },
      },
      {
        Header: "Height",
        accessor: "height",
      },
      {
        Header: "Block Index",
        accessor: "block_index",
      },
    ],
    []
  );

  return (
    <Layout>
      <h1 className="text-center font-bold">Latest Blocks</h1>
      <h3 className="text-center font-light">The most recently mined blocks</h3>

      <div className="bg-white shadow-md rounded my-6">
        <Table columns={columns} data={blocks} />
      </div>
    </Layout>
  );
}
