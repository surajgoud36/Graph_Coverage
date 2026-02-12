// a function that applies specific styles to the first and last rows of the input fields, 
// and also includes a delete button for the middle rows. The first row is designated for the start node, 
// while the last row is for the end node. The middle rows can be used for intermediate nodes or edges, 
// and they have a delete button to remove them if needed.
export function RowInput({ rows, handleInputChange, handleDeleteRow }) {
  return rows.map((row, index) => (
    <div key={index} style={{ display: "flex", marginBottom: "20px" }}>
      {/* Column 1 text field */}

      {index === 0 && (
        <input
          type="text"
          value={row.column1}
          maxLength={1}
          onChange={(e) => handleInputChange(index, "column1", e.target.value)}
          placeholder="Start Node: "
          style={{
            marginRight: "50px",
            borderRadius: "5px",
            padding: "5px",
          }}
        />
      )}
      {index === 0 && (
        <input
          type="text"
          value={row.column2}
          onChange={(e) => handleInputChange(index, "column2", e.target.value)}
          placeholder="eg: B,C"
          style={{
            marginRight: "30px",
            borderRadius: "5px",
            padding: "5px",
          }}
        />
      )}
      {index !== 0 && index !== rows.length - 1 && (
        <input
          type="text"
          value={row.column1}
          maxLength={1}
          onChange={(e) => handleInputChange(index, "column1", e.target.value)}
          placeholder=""
          style={{
            marginRight: "50px",
            borderRadius: "5px",
            padding: "5px",
          }}
        />
      )}
      {index !== 0 && index !== rows.length - 1 && (
        <input
          type="text"
          value={row.column2}
          onChange={(e) => handleInputChange(index, "column2", e.target.value)}
          placeholder=""
          style={{
            marginRight: "30px",
            borderRadius: "5px",
            padding: "5px",
          }}
        />
      )}
      {index === rows.length - 1 && (
        <input
          type="text"
          value={row.column1}
          maxLength={1}
          onChange={(e) => handleInputChange(index, "column1", e.target.value)}
          placeholder="End Node"
          style={{
            marginRight: "50px",
            borderRadius: "5px",
            padding: "5px",
          }}
        />
      )}
      {index === rows.length - 1 && (
        <input
          type="text"
          value={row.column2}
          onChange={(e) => handleInputChange(index, "column2", e.target.value)}
          disabled={true}
          style={{
            marginRight: "30px",
            borderRadius: "5px",
            padding: "5px",
          }}
        />
      )}
      {/* Column 2 text field */}
      {index !== 0 && index !== rows.length - 1 ? (
        <button
          onClick={() => handleDeleteRow(index)}
          className="btn btn-outline-danger"
        >
          <i className="fas fa-trash"></i> Delete
        </button>
      ) : (
        <div style={{ width: "72px", height: "36px" }}></div>
      )}
    </div>
  ));
}
