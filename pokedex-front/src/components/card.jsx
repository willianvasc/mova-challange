// src/components/Card.jsx
import React from "react";

const Card = ({ name, type, image, color, abilities }) => {
  return (
    <div className="card shadow" style={{ backgroundColor: color }}>
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <div className="accordion " id={`accordion-${name}`}>
          <div className="accordion-item border-0" >
            <h2 className="accordion-header">
              <button
                className="accordion-button  bg-white rounded p-4"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${name}`}
                aria-expanded="false"
                aria-controls={`collapse${name}`}
                style={{ backgroundColor: 'white', borderBottom: '2px solid #f63d3d'}}
              >
                <h3 className="card-title text-dark">{name}</h3>
              </button>
            </h2>
            <div
              id={`collapse${name}`}
              className="accordion-collapse collapse"
              data-bs-parent={`#accordion-${name}`}
            >
              <div className="accordion-body">
                <p className="card-text text-start">Type: <b>{type}</b></p>
                 <ul className="text-start">
                    {abilities.map((ability, index) => (
                        <li key={index}>
                            <strong>{ability.name}:</strong> <p>{ability.description}</p>
                        </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
