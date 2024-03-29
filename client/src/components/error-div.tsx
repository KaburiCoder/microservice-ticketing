import React from "react";

export default function ErrorDiv({ errors }: { errors: any[] }) {
  const errorComponent =
    errors.length > 0 ? (
      <div className="text-red-500 bg-red-100 flex flex-col">
        <h4 className="text-lg">Ooops...</h4>
        <ul>
          {errors.map((error: any) => (
            <li key={error.message}>{error.message}</li>
          ))}
        </ul>
      </div>
    ) : undefined;

  return errorComponent;
}
