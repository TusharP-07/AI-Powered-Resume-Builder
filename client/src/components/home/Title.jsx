import React from "react";
const Title = ({title , description}) => {
  return (
    <div className="text-center mt-6 text-slate-700">
      <h2 className="text-3xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-500 max-w-xl mx-auto">{description}</p>
      
    </div>
  );
}
export default Title;