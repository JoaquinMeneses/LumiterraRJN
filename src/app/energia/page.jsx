"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, CircularProgress } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";

const Energia = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData(url) {
    try {
      const res = await axios.get(url);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  }

  useEffect(() => {
    fetchData(`${window.location.origin}/api/energia`);
  }, []);

  if (loading)
    return (
      <div className="grid w-full place-content-center">
        <CircularProgress />
      </div>
    );

  return (
    <main className="flex flex-col max-w-full">
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Energia</th>
            <th>Precio</th>
            <th>Costo por energia</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(
            (
              {
                name,
                cdnImage,
                restoreEnergy,
                minPrice,
                costPerEnergy,
                tokenId,
              },
              index
            ) => {
              return (
                <tr key={index}>
                  <td>
                    <Link
                      href={`https://marketplace.skymavis.com/collections/lumiterra/${tokenId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex"
                    >
                      <Image src={cdnImage} alt={name} width={32} height={32} />
                      {name}
                    </Link>
                  </td>
                  <td>{restoreEnergy}</td>
                  <td>{minPrice}usd</td>
                  <td>{costPerEnergy}usd</td>
                </tr>
              );
            }
          )}
        </tbody>
      </Table>
    </main>
  );
};

export default Energia;
