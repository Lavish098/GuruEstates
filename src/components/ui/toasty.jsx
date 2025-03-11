import React from "react";

export const Toast = ({ children, className, ...props }) => {
  return (
    <div
      className={`flex items-center p-4 mb-4 text-sm rounded-lg ${className}`}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
};
