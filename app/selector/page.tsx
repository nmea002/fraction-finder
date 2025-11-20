'use client';
import { useState } from "react";

export default function Page() {
  const [filters, setFilters] = useState({
    //Filters for Both Fractions
    compatibility: ["compatible", "misleading", ""],
    num_operator: ">",
    den_operator: ">",
    num_distance: "",
    den_distance: "",
    decimal_distance: "",
    author: "",

    //Fraction 1 Filters
    f1_num_digits: "",
    f1_den_digits: "",
    f1_is_unit: false,
    f1_is_irreducible: false,
    f1_is_benchmark: false,

    //Fraction 2 Filters
    f2_num_digits: "",
    f2_den_digits: "",
    f2_is_unit: false,
    f2_is_irreducible: false,
    f2_is_benchmark: false
  });

  function toggleCompatibility(value: string) {
    setFilters(prev => {
      const exists = prev.compatibility.includes(value);
      return {
        ...prev,
        compatibility: exists
          ? prev.compatibility.filter(v => v !== value)
          : [...prev.compatibility, value]
      };
    });
  }

  function toggle(key: keyof typeof filters) {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function updateField(key: keyof typeof filters, value: string) {
    setFilters(prev => ({ ...prev, [key]: value }));
  }

  const inputStyle = {
    backgroundColor: "white",
    color: "black",
    border: "1px solid #ccc",
    padding: "4px",
    borderRadius: "4px",
    marginLeft: "10px"
  };

  return (
    <div>
      <h1 className='text-2xl mb-4'>Filters for Both Fractions</h1>

      <fieldset>
        <legend>Compatibility Labels</legend>

        <div>
          <input
            type="checkbox"
            id="compatible"
            checked={filters.compatibility.includes("compatible")}
            onChange={() => toggleCompatibility("compatible")}
          />
          <label htmlFor="compatible"> Compatible</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="misleading"
            checked={filters.compatibility.includes("misleading")}
            onChange={() => toggleCompatibility("misleading")}
          />
          <label htmlFor="misleading"> Misleading</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="neutral"
            checked={filters.compatibility.includes("")}
            onChange={() => toggleCompatibility("")}
          />
          <label htmlFor="neutral"> Neutral</label>
        </div>
      </fieldset>

      <div style={{ marginTop: "20px" }}>

        <label>
          Numerator Distance:
          <select
            value={filters.num_operator}
            onChange={(e) => updateField("num_operator", e.target.value)}
            style={inputStyle}
          >
            <option value=">">Greater Than</option>
            <option value="<">Less Than</option>
            <option value="=">Equal To</option>
          </select>

          <input
            type="number"
            placeholder="e.g. 3"
            value={filters.num_distance}
            onChange={(e) => updateField("num_distance", e.target.value)}
            style={inputStyle}
          />
        </label>

        <br /><br />

        <label>
          Denominator Distance:
          <select
            value={filters.den_operator}
            onChange={(e) => updateField("den_operator", e.target.value)}
            style={inputStyle}
          >
            <option value=">">Greater Than</option>
            <option value="<">Less Than</option>
            <option value="=">Equal To</option>
          </select>

          <input
            type="number"
            placeholder="e.g. 3"
            value={filters.den_distance}
            onChange={(e) => updateField("den_distance", e.target.value)}
            style={inputStyle}
          />
        </label>

        <br /><br />

        <label>
          Decimal Distance:
          <input
            type="number"
            step="0.0001"
            value={filters.decimal_distance}
            onChange={(e) => updateField("decimal_distance", e.target.value)}
            style={inputStyle}
          />
        </label>

        <br /><br />

        <label>
          Author:
          <input
            type="text"
            value={filters.author}
            onChange={(e) => updateField("author", e.target.value)}
            style={inputStyle}
          />
        </label>

        <br /><br />

        <h2 className="text-2xl mt-6">Fraction 1 Filters</h2>

        <label>
          f1_num_digits:
          <input
            type="number"
            min={1}
            value={filters.f1_num_digits}
            onChange={(e) =>
              updateField("f1_num_digits", Math.max(1, Number(e.target.value)).toString())
            }
            style={inputStyle}
          />
        </label>

        <br /><br />

        <label>
          f1_den_digits:
          <input
            type="number"
            min={1}
            value={filters.f1_den_digits}
            onChange={(e) =>
              updateField("f1_den_digits", Math.max(1, Number(e.target.value)).toString())
            }
            style={inputStyle}
          />
        </label>

        <br /><br />

        <div>
          <input
            type="checkbox"
            id="f1_is_unit"
            checked={filters.f1_is_unit}
            onChange={() => toggle("f1_is_unit")}
          />
          <label htmlFor="f1_is_unit"> f1_is_unit</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="f1_is_irreducible"
            checked={filters.f1_is_irreducible}
            onChange={() => toggle("f1_is_irreducible")}
          />
          <label htmlFor="f1_is_irreducible"> f1_is_irreducible</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="f1_is_benchmark"
            checked={filters.f1_is_benchmark}
            onChange={() => toggle("f1_is_benchmark")}
          />
          <label htmlFor="f1_is_benchmark"> f1_is_benchmark</label>
        </div>

        <br /><br />

        <h2 className="text-2xl mt-6">Fraction 2 Filters</h2>

        <label>
          f2_num_digits:
          <input
            type="number"
            min={1}
            value={filters.f2_num_digits}
            onChange={(e) =>
              updateField("f2_num_digits", Math.max(1, Number(e.target.value)).toString())
            }
            style={inputStyle}
          />
        </label>

        <br /><br />

        <label>
          f2_den_digits:
          <input
            type="number"
            min={1}
            value={filters.f2_den_digits}
            onChange={(e) =>
              updateField("f2_den_digits", Math.max(1, Number(e.target.value)).toString())
            }
            style={inputStyle}
          />
        </label>

        <br /><br />

        <div>
          <input
            type="checkbox"
            id="f2_is_unit"
            checked={filters.f2_is_unit}
            onChange={() => toggle("f2_is_unit")}
          />
          <label htmlFor="f2_is_unit"> f2_is_unit</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="f2_is_irreducible"
            checked={filters.f2_is_irreducible}
            onChange={() => toggle("f2_is_irreducible")}
          />
          <label htmlFor="f2_is_irreducible"> f2_is_irreducible</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="f2_is_benchmark"
            checked={filters.f2_is_benchmark}
            onChange={() => toggle("f2_is_benchmark")}
          />
          <label htmlFor="f2_is_benchmark"> f2_is_benchmark</label>
        </div>

      </div>

      <br />

      <button
        onClick={() => {
          const params = new URLSearchParams();

          Object.entries(filters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              params.append(key, value.join(","));
            } else {
              params.append(key, String(value));
            }
          });

          window.location.href = `/selector/generate?${params.toString()}`;
        }}
        style={{
          backgroundColor: "white",
          color: "black",
          padding: "10px 18px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          cursor: "pointer"
        }}
      >
        Submit
      </button>


      {/* <pre className="mt-6">{JSON.stringify(filters, null, 2)}</pre> */}
    </div>
  );
}
