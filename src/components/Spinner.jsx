import React from 'react';
import { MutatingDots } from 'react-loader-spinner';

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <MutatingDots
        color="#f95801"
        secondaryColor='#000000'
        height={100}
        width={100}
        className="m-9 p-9"
      />

      <p className="text-lg text-center px-2 py-4">{message}</p>
    </div>
  );
}

export default Spinner;