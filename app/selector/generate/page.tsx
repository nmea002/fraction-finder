'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function GeneratePage() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [csvUrl, setCsvUrl] = useState<string | null>(null);

  function parseFilters() {
    const obj: any = {};

    searchParams.forEach((value, key) => {
      if (value === "") return;

      if (value.includes(",")) {
        obj[key] = value.split(",").filter(v => v !== "");
      } else if (value === "true" || value === "false") {
        obj[key] = value === "true";
      } else if (!isNaN(Number(value)) && value.trim() !== "") {
        obj[key] = Number(value);
      } else {
        obj[key] = value;
      }
    });

    return obj;
  }

  async function runQuery() {
    setLoading(true);

    const filters = parseFilters();
    let query = supabase.from("stimuli").select("*");

    if (filters.compatibility) {
      query = query.in("compatibility", filters.compatibility);
    }

    if (filters.num_distance !== undefined && filters.num_distance !== "") {
      const op = filters.num_operator || "=";
      query = query.filter("num_distance", op, filters.num_distance);
    }

    if (filters.den_distance !== undefined && filters.den_distance !== "") {
      const op = filters.den_operator || "=";
      query = query.filter("den_distance", op, filters.den_distance);
    }

    if (filters.decimal_distance !== undefined && filters.decimal_distance !== "") {
      query = query.eq("decimal_distance", filters.decimal_distance);
    }

    if (filters.author) {
      query = query.ilike("author", `%${filters.author}%`);
    }

    if (filters.f1_num_digits) {
      query = query.eq("f1_num_digits", filters.f1_num_digits);
    }

    if (filters.f1_den_digits) {
      query = query.eq("f1_den_digits", filters.f1_den_digits);
    }

    if (filters.f1_is_unit === true) {
      query = query.eq("f1_is_unit", true);
    }

    if (filters.f1_is_irreducible === true) {
      query = query.eq("f1_is_irreducible", true);
    }

    if (filters.f1_is_benchmark === true) {
      query = query.eq("f1_is_benchmark", true);
    }

    if (filters.f2_num_digits) {
      query = query.eq("f2_num_digits", filters.f2_num_digits);
    }

    if (filters.f2_den_digits) {
      query = query.eq("f2_den_digits", filters.f2_den_digits);
    }

    if (filters.f2_is_unit === true) {
      query = query.eq("f2_is_unit", true);
    }

    if (filters.f2_is_irreducible === true) {
      query = query.eq("f2_is_irreducible", true);
    }

    if (filters.f2_is_benchmark === true) {
      query = query.eq("f2_is_benchmark", true);
    }

    const { data, error } = await query;

    if (error) {
      console.error("SUPABASE ERROR:", JSON.stringify(error, null, 2));
      setResults([]);
    } else {
      setResults(data || []);
      generateCSV(data || []);
    }

    setLoading(false);
  }

  function generateCSV(rows: any[]) {
    if (rows.length === 0) {
      setCsvUrl(null);
      return;
    }

    const header = Object.keys(rows[0]).join(",");
    const body = rows
      .map(row =>
        Object.values(row)
          .map(v => `"${String(v).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const csv = header + "\n" + body;
    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);
    setCsvUrl(url);
  }

  useEffect(() => {
    runQuery();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-2xl mb-4">Generated Stimuli</h1>

      {loading && <p>Loading...</p>}
      {!loading && results.length === 0 && <p>No results found.</p>}

      {!loading && results.length > 0 && (
        <>
          <button
            onClick={() => {
              if (csvUrl) {
                const a = document.createElement("a");
                a.href = csvUrl;
                a.download = "stimuli.csv";
                a.click();
              }
            }}
            style={{
              padding: "10px 16px",
              backgroundColor: "white",
              color: "black",
              border: "1px solid #ccc",
              borderRadius: "6px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Download CSV
          </button>

          <br />

          <a href="/" style={{ color: "white"}}>
            Back to Home
          </a>
        </>
      )}
    </div>
  );


}
